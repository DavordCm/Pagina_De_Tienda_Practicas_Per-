import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
import { ColorModeContext } from './context/ColorModeContext';

function App() {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
        mode,
    }), [mode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: '#7c4dff',
                dark: '#5c35cc',
            },
            secondary: {
                main: '#ff4081',
            },
            background: {
                default: mode === 'dark' ? '#0d0d1a' : '#f0f2f5',
                paper: mode === 'dark' ? '#16162a' : '#ffffff',
            },
            success: {
                main: '#00c853',
            },
        },
        typography: {
            fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
        },
        components: {
            MuiCard: {
                styleOverrides: { root: { backgroundImage: 'none' } },
            },
            MuiAppBar: {
                styleOverrides: { root: { backgroundImage: 'none' } },
            },
        },
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CartProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute>
                                        <HomePage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/catalog"
                                element={
                                    <PrivateRoute>
                                        <SearchPage />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Router>
                </CartProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
