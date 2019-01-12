#!/usr/bin/env node

import { db } from '../src/db';
import { ICamp } from '../src/models';

const camp: ICamp = {
    name: 'Frontend',
    squads: [
        {
            icon: 'playstation',
            members: [
                {
                    enabled: true,
                    name: 'Gurban',
                    photo: 'https://avatars.slack-edge.com/2018-06-01/374093410293_c7d1df136d5890df9fba_48.jpg',
                    surname: 'Gurbanov'
                },
                {
                    enabled: true,
                    name: 'Maksim',
                    photo: 'https://avatars.slack-edge.com/2018-08-01/408435003684_134c7b78965a623e3d22_48.jpg',
                    surname: 'Vasilyev',
                },
                {
                    enabled: false,
                    name: 'Lala',
                    photo: 'https://avatars.slack-edge.com/2018-12-17/507034165494_68e6dc72f5a106ab1857_48.jpg',
                    surname: 'Guliyeva'
                },
            ],
            name: 'Daily Banking'
        },
        {
            icon: 'ship',
            members: [
                {
                    enabled: true,
                    name: 'Vahab',
                    photo: 'https://avatars.slack-edge.com/2018-10-16/457567093653_07c9a96ebb3818794195_48.jpg',
                    surname: 'Valiyev'
                },
                {
                    enabled: true,
                    name: 'Fuad',
                    photo: 'https://avatars.slack-edge.com/2018-10-20/460634091522_19dba47dd5d2573ba31e_48.jpg',
                    surname: 'Huseynov'
                },
            ],
            name: 'Onboarding'
        },
        {
            icon: 'shipping fast',
            members: [
                {
                    enabled: true,
                    name: 'Niyazi',
                    photo: 'https://avatars.slack-edge.com/2018-07-05/392666667553_7002dc3b6cee14997dc5_48.jpg',
                    surname: 'Hummatov'
                },
                {
                    enabled: true,
                    name: 'Jamil',
                    photo: 'https://avatars.slack-edge.com/2018-08-28/424478790436_0d47862072655452f619_48.jpg',
                    surname: 'Alisgandarov'
                },
            ],
            name: 'Factoring'
        }
    ],
};

db.collection('camps').add(camp)
    .then(() => process.exit());
