// tslint:disable:object-literal-sort-keys

import * as inquirer from 'inquirer';

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
