"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
class Walker extends Lint.RuleWalker {
    visitImportDeclaration(node) {
        const [maxLengthFor2Names = Rule.DEFAULT_MAX_LENGTH_FOR_2_NAMES, maxLengthForMoreThan2Names = Rule.DEFAULT_MAX_LENGTH_FOR_MORE_THAN_2_NAMES, maxNamesCountInSingleLineImport = Rule.DEFAULT_MAX_NAMES_COUNT_IN_SINGLE_LINE_IMPORT,] = this.getOptions();
        const importStatement = node.getText();
        const match = importStatement.match(/,/g);
        const importedNamesCount = (match && match.length || 0) + 1;
        if (importedNamesCount < 2) {
            return;
        }
        const lines = importStatement.split(/\r?\n/);
        const isSingleLineImport = lines.length === 1;
        const maxLength = importedNamesCount > 2
            ? maxLengthForMoreThan2Names
            : maxLengthFor2Names;
        const hasLongLine = lines.some((line) => line.length > maxLength);
        const ruleViolated = isSingleLineImport && importedNamesCount > maxNamesCountInSingleLineImport || hasLongLine;
        if (ruleViolated) {
            const importClause = node.importClause.getText();
            const module = node.moduleSpecifier.getText();
            const fixedImportClause = importClause
                .replace(/[\{\}]/g, '')
                .trim()
                .split(',')
                .filter(Boolean)
                .map((name) => `    ${name.trim()},`)
                .join('\n');
            const fixedImportStatement = `import {\n${fixedImportClause}\n} from ${module};`;
            const start = node.getStart();
            const width = node.getWidth();
            const fix = new Lint.Replacement(start, width, fixedImportStatement);
            this.addFailure(this.createFailure(start, width, hasLongLine
                ? Rule.MAX_LENGTH_FAILURE_STRING
                : Rule.MAX_NAMES_COUNT_IN_SINGLE_LINE_FAILURE_STRING, fix));
        }
    }
}
/**
 * Restricts very long `import` statements.
 * In case of multiline `import `statement, rule will be violated if some of the lines are too long.
 *
 * Syntax: "import-max-length": [true, 100, 70, 3].
 *
 * Accepts 4 parameters:
 *  - boolean: Defines whether rule is enabled.
 *  - [number = 120]: Maximum allowed line length for single line imports with 2 imported names.
 *  - [number = 80]: Maximum allowed line length for single line imports with more than 2 imported names.
 *  - [number = 3]: Maximum allowed count of imported names in a single line import. Should be > 2.
 */
// tslint:disable-next-line:max-classes-per-file
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}
Rule.MAX_LENGTH_FAILURE_STRING = 'Too long import';
Rule.MAX_NAMES_COUNT_IN_SINGLE_LINE_FAILURE_STRING = 'Too many imported names on a single line';
Rule.DEFAULT_MAX_LENGTH_FOR_2_NAMES = 120;
Rule.DEFAULT_MAX_LENGTH_FOR_MORE_THAN_2_NAMES = 80;
Rule.DEFAULT_MAX_NAMES_COUNT_IN_SINGLE_LINE_IMPORT = 3;
exports.Rule = Rule;
//# sourceMappingURL=importMaxLengthRule.js.map