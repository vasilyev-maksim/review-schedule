// tslint:disable:object-literal-sort-keys
import 'colors';
import * as dotenv from 'dotenv';
import * as inquirer from 'inquirer';

import { writeFileSync } from 'fs';

import { NodeEnv } from '../src/enums';

export async function readNodeEnv (): Promise<NodeEnv> {
    const { nodeEnv } = await inquirer.prompt(
        {
            type: 'list',
            name: 'nodeEnv',
            message: 'Select execution environment',
            choices: [
                NodeEnv.Development,
                NodeEnv.Staging,
                NodeEnv.Production,
            ],
        },
    );

    return nodeEnv;
}

export async function setupEnvironment (): Promise<void> {
    const nodeEnv = await readNodeEnv();
    dotenv.config({ path: `.env.${nodeEnv}` });
}

export function isSubstring (str?: string, substr?: string): boolean {
    return Boolean(
        str
        && substr
        && str.toLowerCase().indexOf(substr.toLowerCase()) > -1
    );
}

export function writeOutputJsonToFile (path: string, output: any): void {
    writeFileSync(path, JSON.stringify(output, null, 4));
    // tslint:disable-next-line: no-console
    console.log(`\nOutput saved to ${path.underline}`.yellow);
}
