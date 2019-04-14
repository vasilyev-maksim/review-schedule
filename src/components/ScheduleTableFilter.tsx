import * as React from 'react';
import { Label } from 'semantic-ui-react';

import { IMember } from '../models';
import { ThemeConsumer } from './ThemeContext';

interface IProps {
    memeber?: IMember | null;
    onClear?: () => void;
}

export const ScheduleTableFilter: React.SFC<IProps> = ({ memeber: member, onClear }) => {
    const _member: IMember = member || ({} as any);

    return (
        <ThemeConsumer>
            {({ darkTheme }) => (
                <Label
                    size="medium"
                    image
                    color={darkTheme ? 'black' : undefined}
                    onRemove={onClear}
                    removeIcon="delete"
                    style={{ visibility: member ? 'visible' : 'hidden' }}
                    content={(
                        <>
                            <img src={_member.photo} />
                            {_member.name} {_member.surname}
                        </>
                    )}
                />
            )}
        </ThemeConsumer>
    );
};
