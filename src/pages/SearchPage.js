import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const Search = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Buscar juegos..."
                sx={{ width: '300px' }}
            />
            <Button variant="contained" color="primary">
                Buscar
            </Button>
        </Box>
    );
};

export default Search;
