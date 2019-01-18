import * as React from 'react';
import { SLACK_TEAM_ID } from '../config';

interface IProps {
    userId: string;
}

export const SlackDeepLink: React.SFC<IProps> = ({ userId, children }) => {
    return (
        <a href={`slack://user?team=${SLACK_TEAM_ID}&id=${userId}`}>
            {children}
        </a>
    );
};
