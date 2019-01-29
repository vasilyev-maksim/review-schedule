// tslint:disable:object-literal-sort-keys

import * as dotenv from 'dotenv';
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

export async function setupEnvironment (): Promise<void> {
    const nodeEnv = await readNodeEnv();
    dotenv.config({ path: `.env.${nodeEnv}` });
}
