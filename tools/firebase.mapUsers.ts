import { readFileSync } from 'fs';

import { ICamp } from '../src/models';
import { githubProvider } from './providers/githubProvider';
import { writeOutputJsonToFile } from './utils';

async function main (): Promise<any> {
    const camps: ICamp[] = JSON.parse(readFileSync('./tools/firebase.dump.json').toString());
    const githubUsers = await githubProvider.getAllUsers();

    const updatedCamps: ICamp[] = camps.map((camp) => {
        return {
            ...camp,
            squads: camp.squads.map((squad) => {
                return {
                    ...squad,
                    members: squad.members.map((member) => {
                        const githubUser = githubUsers.find((user) => {
                            const reviewer = githubProvider.convertToReviewer(user);

                            return Boolean(
                                user
                                && reviewer.githubId
                                && reviewer.githubId.toString() === member.githubId
                            );
                        });

                        return githubUser && githubUser.avatar_url
                            ? { ...member, photo: githubUser.avatar_url }
                            : member;
                    })
                };
            })
        };
    });

    writeOutputJsonToFile('./tools/firebase.dump.json', updatedCamps);
}

main();
