// tslint:disable:object-literal-sort-keys
// tslint:disable:no-console

import * as inquirer from 'inquirer';

import { main as addMember } from './addMember';
import { main as firebaseRead } from './firebase.read';
import { main as firebaseWrite } from './firebase.write';
import { setupEnvironment } from './utils';

enum Command {
    AddMember = 'Add member',
    FirebaseRead = 'Read from firebase',
    FirebaseWrite = 'Write to firebase',
}

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

async function main (): Promise<void> {

    const { command } = await inquirer.prompt(
        {
            type: 'list',
            name: 'command',
            message: 'Select a command',
            choices: [
                Command.AddMember,
                Command.FirebaseRead,
                Command.FirebaseWrite,
            ],
        },
    );

    switch (command) {
        case Command.AddMember:
            return addMember();
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
