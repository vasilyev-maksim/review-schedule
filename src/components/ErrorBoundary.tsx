import * as React from 'react';

import { ErrorMessage } from './ErrorMessage';

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
            ? <ErrorMessage />
            : <>{this.props.children}</>;
    }
}
