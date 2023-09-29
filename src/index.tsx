import React from 'react';
import Home from './screens/Home';
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import { useColorScheme } from 'react-native';

export default function App() {
    const deviceTheme = useColorScheme();
    const theme = themes[deviceTheme] || themes.dark;

    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}
