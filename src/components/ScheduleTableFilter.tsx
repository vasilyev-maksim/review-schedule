import * as React from 'react';
import { Label } from 'semantic-ui-react';

import { IReviewer } from '../models';

interface IProps {
    reviewer?: IReviewer | null;
    onClear?: () => void;
}

export const ScheduleTableFilter: React.SFC<IProps> = ({ reviewer, onClear }) => {
    const _reviewer: IReviewer = reviewer || ({} as any);

    return (
        <Label
            size="medium"
            image
            onRemove={onClear}
            removeIcon="delete"
            style={{ visibility: reviewer ? 'visible' : 'hidden' }}
            content={(
                <>
                    <img src={_reviewer.photo} />
                    {_reviewer.name} {_reviewer.surname}
                </>
            )}
        />
    );
};
