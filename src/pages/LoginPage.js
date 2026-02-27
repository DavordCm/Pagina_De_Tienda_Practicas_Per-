import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
    Box, Typography, TextField, Button, IconButton,
    InputAdornment, Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, SportsEsports } from '@mui/icons-material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            login();
            navigate('/home');
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7c4dff' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7c4dff' },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#7c4dff' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0a18' }}>
            {/* Left panel - branding */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1a0533 0%, #0d0d1a 50%, #001633 100%)',
                    p: 6,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{
                    position: 'absolute', width: 500, height: 500, borderRadius: '50%',
                    bgcolor: 'rgba(124,77,255,0.08)', top: -150, left: -150,
                }} />
                <Box sx={{
                    position: 'absolute', width: 350, height: 350, borderRadius: '50%',
                    bgcolor: 'rgba(255,64,129,0.06)', bottom: -80, right: -80,
                }} />

                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                    <SportsEsports sx={{ fontSize: 72, color: '#7c4dff', mb: 2 }} />
                    <Typography variant="h2" fontWeight={900} color="white" sx={{ letterSpacing: '-1px', mb: 1 }}>
                        Game<span style={{ color: '#7c4dff' }}>Store</span>
                    </Typography>
                    <Typography variant="h6" color="rgba(255,255,255,0.5)" sx={{ mb: 5 }}>
                        Tu destino para los mejores juegos digitales
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                        {[
                            { value: '15+', label: 'Juegos' },
                            { value: '10K+', label: 'Usuarios' },
                            { value: '4.9★', label: 'Valoración' },
                        ].map(({ value, label }) => (
                            <Box key={label}>
                                <Typography variant="h4" fontWeight={800} color="#7c4dff">{value}</Typography>
                                <Typography variant="body2" color="rgba(255,255,255,0.4)">{label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Right panel - form */}
            <Box
                sx={{
                    flex: { xs: 1, md: '0 0 440px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#10102a',
                    p: 4,
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 380 }}>
                    {/* Mobile logo */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mb: 4, gap: 1 }}>
                        <SportsEsports sx={{ color: '#7c4dff', fontSize: 30 }} />
                        <Typography variant="h5" fontWeight={800} color="white">
                            Game<span style={{ color: '#7c4dff' }}>Store</span>
                        </Typography>
                    </Box>

                    <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                        Bienvenido
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.4)" sx={{ mb: 4 }}>
                        Inicia sesión para acceder a tu biblioteca de juegos
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(''); }}
                            sx={inputSx}
                        />
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            sx={inputSx}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: 'rgba(255,255,255,0.4)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 3, py: 1.5,
                                bgcolor: '#7c4dff',
                                '&:hover': { bgcolor: '#6c3de0' },
                                fontWeight: 700,
                                fontSize: '1rem',
                                borderRadius: 2,
                                textTransform: 'none',
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>

                    <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(124,77,255,0.08)', borderRadius: 2, border: '1px solid rgba(124,77,255,0.2)' }}>
                        <Typography variant="caption" color="rgba(255,255,255,0.4)" display="block" textAlign="center">
                            Demo — usuario: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>admin</strong>
                            {' / '}contraseña: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>admin</strong>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
