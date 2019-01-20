import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

import { ICamp } from '../src/models';

interface IGithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

async function main (): Promise<any> {
    const githubUsers = (await axios.get<IGithubUser[]>(
        'https://api.github.com/orgs/PB-Digital/members',
        { headers: { Authorization: 'token ecbbd561d0b52b95762492f29d64ad5e9447c238' } }
    )).data;

    const camps: ICamp[] = JSON.parse(readFileSync('./tools/firebase.dump.json').toString());
    const updatedCamps: ICamp[] = camps.map((camp) => {
        return {
            ...camp,
            squads: camp.squads.map((squad) => {
                return {
                    ...squad,
                    members: squad.members.map((member) => {
                        const githubUser = githubUsers.find(
                            (user) => user.id.toString() === member.githubId
                        );
                        return {
                            ...member,
                            githubUsername: githubUser!.login,
                        };
                    })
                };
            }),
        };
    });

    writeFileSync('./tools/firebase.dump.json', JSON.stringify(updatedCamps, null, 4));
}

main();
