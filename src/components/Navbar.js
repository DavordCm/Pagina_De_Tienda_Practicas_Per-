import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, IconButton, Badge, Box, Button,
    Avatar, Tooltip, Menu, MenuItem, Divider,
} from '@mui/material';
import {
    ShoppingCart, Brightness4, Brightness7,
    SportsEsports, AccountCircle, StorefrontOutlined,
} from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../context/CartContext';
import { ColorModeContext } from '../context/ColorModeContext';

function Navbar() {
    const { logout } = useAuth();
    const { getCount } = useCart();
    const navigate = useNavigate();
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
        setAnchorEl(null);
    };

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#7c4dff' : 'inherit',
        fontWeight: isActive ? 700 : 400,
    });

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ gap: 1, px: { xs: 2, md: 4 } }}>
                {/* Logo */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', mr: 2 }}
                    onClick={() => navigate('/home')}
                >
                    <SportsEsports sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                        Game<span style={{ color: '#7c4dff' }}>Store</span>
                    </Typography>
                </Box>

                {/* Nav links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                    <Button
                        component={NavLink}
                        to="/home"
                        style={navLinkStyle}
                        sx={{ borderRadius: 2, textTransform: 'none', fontSize: '0.95rem' }}
                    >
                        Inicio
                    </Button>
                    <Button
                        component={NavLink}
                        to="/catalog"
                        style={navLinkStyle}
                        sx={{ borderRadius: 2, textTransform: 'none', fontSize: '0.95rem' }}
                    >
                        Catálogo
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Dark mode toggle */}
                <Tooltip title={colorMode.mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                    <IconButton onClick={colorMode.toggleColorMode} size="small">
                        {colorMode.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Tooltip>

                {/* Cart */}
                <Tooltip title="Carrito de compras">
                    <IconButton size="small">
                        <Badge badgeContent={getCount()} color="secondary" max={99}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* User menu */}
                <Tooltip title="Mi cuenta">
                    <IconButton
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        size="small"
                        sx={{ ml: 0.5 }}
                    >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                            A
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{ sx: { mt: 1, minWidth: 160 } }}
                >
                    <MenuItem disabled sx={{ opacity: 1 }}>
                        <Typography variant="body2" fontWeight="bold">Admin</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { navigate('/home'); setAnchorEl(null); }}>
                        Inicio
                    </MenuItem>
                    <MenuItem onClick={() => { navigate('/catalog'); setAnchorEl(null); }}>
                        Catálogo
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        Cerrar sesión
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
