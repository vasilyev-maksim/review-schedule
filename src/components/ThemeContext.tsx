import { noop } from 'lodash';
import React from 'react';

interface IThemeContext {
    darkTheme: boolean;
    toggleDarkTheme (): void;
}

export const { Consumer: ThemeConsumer, Provider: ThemeProvider } = React.createContext<IThemeContext>({
    darkTheme: false,
    toggleDarkTheme: noop,
});
