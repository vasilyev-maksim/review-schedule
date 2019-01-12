import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import { IReviewer } from '../models';

interface IProps {
    reviewer: IReviewer;
}

export const Reviewer: React.SFC<IProps> = ({ reviewer }) => (
    <Header as="h4" image>
        <Image src={reviewer.photo} rounded size="mini" />
        <Header.Content>
            {reviewer.name}
            <Header.Subheader>
                {reviewer.surname}
            </Header.Subheader>
        </Header.Content>
    </Header>
);
