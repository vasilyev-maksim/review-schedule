#!/usr/bin/env node

// tslint:disable:no-console

/**
 * Usage example:
 * npm run slack:find-users jamil niyazi vahab fuad gurban lala maksim
 */

import axios, { AxiosResponse } from 'axios';
import { writeFileSync } from 'fs';

import { IReviewer } from '../src/models';

const SLACK_TOKEN = 'xoxp-330924193331-522722404979-524993675889-1ba121bc802eb43e9f60f62724ffa6bd';
const url = `https://slack.com/api/users.list?token=${SLACK_TOKEN}&pretty=1`;
const [, , ..._namesToFindBy] = process.argv;
const namesToFindBy = _namesToFindBy.map((name) => name.toLowerCase());

axios.get(url).then(({ data }: AxiosResponse<IResponse>) => {
    if (data.ok) {
        const users: Partial<IReviewer>[] = data.members.filter(
            (member) => !member.is_bot && [
                member.name,
                member.real_name,
                member.profile.first_name,
                member.profile.first_name,
                member.profile.last_name,
                member.profile.real_name,
                member.profile.real_name_normalized,
                member.profile.display_name,
                member.profile.display_name_normalized,
            ].some(
                (name) => namesToFindBy.some(
                    (nameToFindBy) => Boolean(name && name.indexOf(nameToFindBy) > -1)
                )
            )
        ).map((user) => {
            const [name, surname] = user.profile.real_name.split(' ');
            return {
                enabled: true,
                name,
                photo: user.profile.image_48,
                slackId: user.id,
                surname,
            };
        });

        console.log(users);
        writeFileSync('./tools/slack.dump.json', JSON.stringify(users, null, 4));
    } else {
        if (data.error === 'token_revoked') {
            console.error(
                'Slack token revoked: Vasilyev Maksim\'s token was revoked because he has'
                + ' new account in Slack or his token somehow expired or he has even been fired :('
                + ' Please use this link'
                + '\n\nhttps://api.slack.com/custom-integrations/legacy-tokens#legacy-info\n\n'
                + 'to generate new token and replace the old one with it.'
            );
        } else {
            console.error(`Unknown error from Slack API: ${data.error}`);
        }
    }
});

/**
 * Following interfaces were generated by the extension for VS Code:
 * https://marketplace.visualstudio.com/items?itemName=mariusalchimavicius.json-to-ts
 */

interface IResponse {
    ok: boolean;
    members: IMember[];
    cache_ts: number;
    error: string;
}

interface IMember {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    profile: IProfile;
    is_bot: boolean;
    is_app_user: boolean;
    updated: number;
    color?: string;
    real_name?: string;
    tz?: string;
    tz_label?: string;
    tz_offset?: number;
    is_admin?: boolean;
    is_owner?: boolean;
    is_primary_owner?: boolean;
    is_restricted?: boolean;
    is_ultra_restricted?: boolean;
    has_2fa?: boolean;
}

interface IProfile {
    title: string;
    phone: string;
    skype: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    status_text: string;
    status_emoji: string;
    status_expiration: number;
    avatar_hash: string;
    email?: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    status_text_canonical: string;
    team: string;
    image_original?: string;
    first_name?: string;
    last_name?: string;
    image_1024?: string;
    is_custom_image?: boolean;
    bot_id?: string;
    api_app_id?: string;
    always_active?: boolean;
    fields?: any;
}
