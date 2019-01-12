#!/usr/bin/env node

/**
 * Usage example:
 * npm run slack:find-users jamil niyazi vahab fuad gurban lala maksim
 */

import axios, { AxiosResponse } from 'axios';
import { writeFileSync } from 'fs';

import { IReviewer } from '../src/models';

const url = 'https://slack.com/api/users.list?token=xoxp-330924193331-409675079479-520522886641-8b9d08f03360b2d2560644171fbd0a87&pretty=1';
const [, , ..._namesToFindBy] = process.argv;
const namesToFindBy = _namesToFindBy.map((name) => name.toLowerCase());

axios.get(url).then(({ data }: AxiosResponse<IResponse>) => {
    const users: IReviewer[] = data.members.filter(
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
                (nameToFindBy) => name && name.indexOf(nameToFindBy) > -1
            )
        )
    ).map((user) => {
        const [name, surname] = user.profile.real_name.split(' ');
        return {
            enabled: true,
            name,
            photo: user.profile.image_48,
            surname,
        };
    });

    // tslint:disable-next-line:no-console
    console.log(users);
    writeFileSync('./tools/slack.dump.json', JSON.stringify(users, null, 4));
});

interface IResponse {
    ok: boolean;
    members: IMember[];
    cache_ts: number;
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
