import * as React from 'react';
import { Label } from 'semantic-ui-react';

import { IReviewer } from '../models';

interface IProps {
    reviewer?: IReviewer;
    onClear?: () => void;
}

export const ReviewScheduleTableFilter: React.SFC<IProps> = ({ reviewer, onClear }) => {
    return (
        <Label
            size="medium"
            image
            onRemove={onClear}
            removeIcon="delete"
            style={{ visibility: reviewer ? 'visible' : 'hidden' }}
            content={(
                <>
                    <img src={reviewer && reviewer.photo} />
                    {reviewer && reviewer.name} {reviewer && reviewer.surname}
                </>
            )}
        />
    );
};
