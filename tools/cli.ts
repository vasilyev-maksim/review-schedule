// tslint:disable:object-literal-sort-keys
// tslint:disable:no-console

import * as inquirer from 'inquirer';

import { main as firebaseRead } from './firebase.read';
import { main as firebaseWrite } from './firebase.write';
import { main as getReviewer } from './getReviewer';
import { setupEnvironment } from './utils';

enum Command {
    GetReviewer = 'Get reviewer from providers by name',
    FirebaseRead = 'Read from firebase',
    FirebaseWrite = 'Write to firebase',
}

async function main (): Promise<void> {
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

    switch (command) {
        case Command.GetReviewer:
            return getReviewer();
        case Command.FirebaseRead:
            await setupEnvironment();
            return firebaseRead();
        case Command.FirebaseWrite:
            await setupEnvironment();
            return firebaseWrite();
        default:
            return;
    }
}

main();
