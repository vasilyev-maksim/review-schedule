// tslint:disable:object-literal-sort-keys
// tslint:disable:no-console

import * as dotenv from 'dotenv';
import * as inquirer from 'inquirer';

import { main as firebaseRead } from './firebase.read';
import { main as firebaseWrite } from './firebase.write';
import { main as getReviewer } from './getReviewer';

enum Command {
    GetReviewer = 'Get reviewer from providers by name',
    FirebaseRead = 'Read from firebase',
    FirebaseWrite = 'Write to firebase',
}

async function main (): Promise<any> {
    const { command } = await inquirer.prompt(
        {
            type: 'list',
            name: 'command',
            message: 'Select a command',
            choices: [
                Command.GetReviewer,
                Command.FirebaseRead,
                Command.FirebaseWrite,
            ],
        },
    );

    dotenv.config({ path: '.env.development' }); // temporary 'development'

    switch (command) {
        case Command.GetReviewer:
            return getReviewer();
        case Command.FirebaseRead:
            return firebaseRead();
        case Command.FirebaseWrite:
            return firebaseWrite();
        default:
            return;
    }
}

main();
