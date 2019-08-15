import { noop } from 'lodash';
import React from 'react';

interface IThemeContext {
    darkTheme: boolean;
    toggleDarkTheme (): void;
}

export const themeContext = React.createContext<IThemeContext>({
    darkTheme: false,
    toggleDarkTheme: noop,
});
export const { Consumer: ThemeConsumer, Provider: ThemeProvider } = themeContext;
