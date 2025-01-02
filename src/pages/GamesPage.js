import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const GamesPage = () => {
    const games = ['Juego 1', 'Juego 2', 'Juego 3'];

    return (
        <Box
            sx={{
                mt: 4,
                mx: 'auto',
                maxWidth: '600px',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Lista de Juegos
            </Typography>
            <List
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {games.map((game, index) => (
                    <ListItem key={index} divider>
                        <ListItemText primary={game} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default GamesPage;
