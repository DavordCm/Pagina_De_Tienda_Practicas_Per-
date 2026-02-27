import React, { useState, useMemo } from 'react';
import {
    Box, Grid, Card, CardContent, CardMedia, Typography, TextField,
    Chip, Rating, Button, FormControl, InputLabel, Select, MenuItem,
    Slider, Drawer, IconButton, Paper, Divider, InputAdornment,
} from '@mui/material';
import { Search, FilterList, ShoppingCart } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { games, platforms } from '../data/games';
import { useCart } from '../context/CartContext';

const GENRES = ['Todos', 'Acción', 'RPG', 'FPS', 'Estrategia', 'Aventura', 'MOBA', 'Battle Royale', 'Mundo Abierto', 'Soulslike', 'Cooperativo', 'Ciencia Ficción', 'Superhéroes'];
const SORT_OPTIONS = [
    { value: 'popular', label: 'Más populares' },
    { value: 'rating', label: 'Mejor valorados' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'name', label: 'Nombre A-Z' },
];

const CatalogPage = () => {
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Todos');
    const [selectedPlatform, setSelectedPlatform] = useState('Todas');
    const [priceRange, setPriceRange] = useState([0, 70]);
    const [sortBy, setSortBy] = useState('popular');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const filteredGames = useMemo(() => {
        let result = games.filter(game => {
            const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.developer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre === 'Todos' || game.genre.includes(selectedGenre);
            const matchesPlatform = selectedPlatform === 'Todas' || game.platform.includes(selectedPlatform);
            const matchesPrice = game.isFree || (game.price >= priceRange[0] && game.price <= priceRange[1]);
            return matchesSearch && matchesGenre && matchesPlatform && matchesPrice;
        });

        switch (sortBy) {
            case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
            case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
            case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
            case 'name': result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
            default: result = [...result].sort((a, b) => b.reviews - a.reviews);
        }

        return result;
    }, [searchTerm, selectedGenre, selectedPlatform, priceRange, sortBy]);

    const resetFilters = () => {
        setSelectedGenre('Todos');
        setSelectedPlatform('Todas');
        setPriceRange([0, 70]);
        setSearchTerm('');
    };

    const FilterPanel = () => (
        <Box sx={{ p: 2.5, minWidth: 240 }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>Filtros</Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" fontWeight={600} gutterBottom>Género</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 3 }}>
                {GENRES.map(genre => (
                    <Chip
                        key={genre}
                        label={genre}
                        size="small"
                        variant={selectedGenre === genre ? 'filled' : 'outlined'}
                        color={selectedGenre === genre ? 'primary' : 'default'}
                        onClick={() => setSelectedGenre(genre)}
                        sx={{ cursor: 'pointer', fontSize: '0.7rem' }}
                    />
                ))}
            </Box>

            <Typography variant="subtitle2" fontWeight={600} gutterBottom>Plataforma</Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <Select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                    {platforms.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
            </FormControl>

            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Precio: €{priceRange[0]} — €{priceRange[1]}
            </Typography>
            <Slider
                value={priceRange}
                onChange={(_, val) => setPriceRange(val)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `€${v}`}
                min={0} max={70} step={5}
                sx={{ mb: 3 }}
            />

            <Button variant="outlined" fullWidth size="small" onClick={resetFilters}>
                Limpiar filtros
            </Button>
        </Box>
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />

            <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>Catálogo de Juegos</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {filteredGames.length} juego{filteredGames.length !== 1 ? 's' : ''} encontrado{filteredGames.length !== 1 ? 's' : ''}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        sx={{ display: { md: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
                    >
                        <FilterList />
                    </IconButton>
                </Box>

                {/* Search + Sort bar */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Buscar por nombre o desarrollador..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flex: 1, minWidth: 220 }}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Ordenar por</InputLabel>
                        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Ordenar por">
                            {SORT_OPTIONS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={3}>
                    {/* Desktop filter sidebar */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid', borderColor: 'divider',
                                borderRadius: 2, position: 'sticky', top: 76,
                            }}
                        >
                            <FilterPanel />
                        </Paper>
                    </Grid>

                    {/* Games grid */}
                    <Grid item xs={12} md={9}>
                        {filteredGames.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 12 }}>
                                <Typography variant="h5" gutterBottom>No se encontraron juegos</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Prueba con otros filtros o términos de búsqueda
                                </Typography>
                                <Button variant="outlined" onClick={resetFilters}>Limpiar filtros</Button>
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {filteredGames.map(game => (
                                    <Grid item xs={12} sm={6} lg={4} key={game.id}>
                                        <GameCard game={game} addToCart={addToCart} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>

            {/* Mobile drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <FilterPanel />
            </Drawer>
        </Box>
    );
};

const GameCard = ({ game, addToCart }) => (
    <Card sx={{
        height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 10 },
    }}>
        <Box sx={{ position: 'relative' }}>
            <CardMedia
                component="img"
                height="165"
                image={game.image}
                alt={game.name}
                sx={{ objectFit: 'cover' }}
            />
            {game.discount > 0 && (
                <Chip label={`-${game.discount}%`} color="error" size="small"
                    sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700 }} />
            )}
            {game.isFree && (
                <Chip label="GRATIS" color="success" size="small"
                    sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700 }} />
            )}
            {game.isNew && (
                <Chip label="NUEVO" color="info" size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, fontWeight: 700 }} />
            )}
            {game.isBestSeller && !game.isNew && (
                <Chip label="TOP VENTAS" size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, fontWeight: 700, bgcolor: '#ff6d00', color: 'white' }} />
            )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} noWrap gutterBottom>
                {game.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
                {game.developer} · {game.releaseDate.substring(0, 4)}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, my: 0.8 }}>
                <Rating value={game.rating} precision={0.1} size="small" readOnly />
                <Typography variant="caption" color="text.secondary">
                    {game.rating} ({game.reviews.toLocaleString()})
                </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {game.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4, mb: 1 }}>
                {game.genre.slice(0, 2).map(g => (
                    <Chip key={g} label={g} size="small" variant="outlined" sx={{ fontSize: '0.62rem', height: 18 }} />
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4, mb: 1.5 }}>
                {game.platform.slice(0, 3).map(p => (
                    <Chip key={p} label={p} size="small" sx={{ fontSize: '0.62rem', height: 18, bgcolor: 'action.selected' }} />
                ))}
                {game.platform.length > 3 && (
                    <Chip label={`+${game.platform.length - 3}`} size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
                )}
            </Box>

            <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    {game.isFree ? (
                        <Typography fontWeight={800} color="success.main" variant="h6">Gratis</Typography>
                    ) : (
                        <>
                            <Typography fontWeight={800} color="primary.main" variant="h6">
                                €{game.price.toFixed(2)}
                            </Typography>
                            {game.discount > 0 && (
                                <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                                    €{game.originalPrice.toFixed(2)}
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart(game)}
                    color={game.isFree ? 'success' : 'primary'}
                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 1.5 }}
                >
                    {game.isFree ? 'Obtener Gratis' : 'Al Carrito'}
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default CatalogPage;
