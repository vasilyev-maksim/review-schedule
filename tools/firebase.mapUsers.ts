import { readFileSync, writeFileSync } from 'fs';

import { ICamp } from '../src/models';
import { githubProvider } from './providers/githubProvider';

async function main (): Promise<any> {
    const camps: ICamp[] = JSON.parse(readFileSync('./tools/firebase.dump.json').toString());
    const githubUsers = await githubProvider.getAllReviewers();

    const updatedCamps: ICamp[] = camps.map((camp) => {
        return {
            ...camp,
            squads: camp.squads.map((squad) => {
                return {
                    ...squad,
                    members: squad.members.map((member) => {
                        const githubUser = githubUsers.find((user) => {
                            return Boolean(
                                user
                                && user.githubId
                                && user.githubId.toString() === member.githubId
                            );
                        });

                        return githubUser && githubUser.photo
                            ? { ...member, photo: githubUser.photo }
                            : member;
                    })
                };
            })
        };
    });

    writeFileSync('./tools/firebase.dump.json', JSON.stringify(updatedCamps, null, 4));
}

main();
