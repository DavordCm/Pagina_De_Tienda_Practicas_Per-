import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Search from '../pages/SearchPage';
import GamesPage from '../pages/GamesPage';

const HomePage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Bienvenido al Home
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </Button>
            </Box>
            <Search />
            <GamesPage />
        </Box>
    );
};

export default HomePage;
