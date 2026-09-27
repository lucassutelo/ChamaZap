import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import Home from './screens/Home';
import themes from './styles/themes';

export default function App() {
    const deviceTheme = useColorScheme();
    const theme = deviceTheme === 'light' ? themes.light : themes.dark;

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <StatusBar barStyle={theme.statusBar} />
                <Home />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
