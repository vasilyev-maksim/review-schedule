import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import { slack } from '../providers/slack';
import { AuthorsList } from './AuthorsList';

interface IState {
    error: boolean;
}

export class ErrorBoundary extends React.Component<{}, IState> {
    public state: IState = {
        error: false,
    };

    public static getDerivedStateFromError (): Partial<IState> {
        return { error: true };
    }

    public render (): JSX.Element {
        return this.state.error
            ? (
                <div style={{ textAlign: 'center' }}>
                    <Header
                        as="h1"
                        icon
                        textAlign="center"
                        color="red"
                    >
                        <Icon name="bug" />
                        Oooops... Shit happens!
                    </Header>
                    <br />
                    <Header>
                        Please contact <AuthorsList provider={slack} /> as soon as possible.
                    </Header>
                </div>
            )
            : <>{this.props.children}</>;
    }
}
