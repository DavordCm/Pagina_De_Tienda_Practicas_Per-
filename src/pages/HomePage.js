import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Divider, IconButton, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Luna
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sol
import Search from '../pages/SearchPage';

const HomePage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Función para alternar entre modo oscuro y claro
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: darkMode ? '#121212' : '#f5f5f5', // Fondo oscuro o claro
                color: darkMode ? '#e0e0e0' : '#212121', // Texto claro u oscuro
                padding: 4,
                transition: 'background-color 0.3s ease, color 0.3s ease', // Transición suave
            }}
        >
            <IconButton
                onClick={handleLogout}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'secondary.dark' },
                }}
            >
                <LogoutIcon />
            </IconButton>

            {/* Botón de modo oscuro con ícono de sol o luna */}
            <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                <IconButton onClick={toggleDarkMode}>
                    {darkMode ? (
                        <Brightness7Icon sx={{ color: 'white' }} /> // Ícono de sol cuando está en modo oscuro
                    ) : (
                        <Brightness4Icon sx={{ color: 'white' }} /> // Ícono de luna cuando está en modo claro
                    )}
                </IconButton>
            </Box>

            <Paper
                elevation={6}
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    padding: 4,
                    borderRadius: 3,
                    bgcolor: darkMode ? '#333' : '#fff', // Fondo de la tarjeta en modo oscuro o claro
                    boxShadow: 4,
                    transition: 'background-color 0.3s ease', // Transición suave para el Paper
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                        Bienvenido al Home
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Explora nuestras funciones y diviértete
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Search />
                </Box>
            </Paper>
        </Box>
    );
};

export default HomePage;
