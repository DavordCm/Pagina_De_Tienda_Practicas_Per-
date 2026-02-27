import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Grid, Card, CardMedia,
    CardContent, Chip, Rating, IconButton,
} from '@mui/material';
import {
    ArrowForward, LocalOffer, TrendingUp, NewReleases, SportsEsports,
    ChevronLeft, ChevronRight,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { games } from '../data/games';
import { useCart } from '../context/CartContext';

const bannerGames = games.filter(g => g.isFeatured);
const bestSellers = games.filter(g => g.isBestSeller).slice(0, 4);
const onSale = games.filter(g => g.discount > 30).slice(0, 4);
const newGames = games.filter(g => g.isNew).slice(0, 4);

const HeroBanner = ({ addToCart, navigate }) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % bannerGames.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [paused]);

    const prev = () => setCurrent(p => (p - 1 + bannerGames.length) % bannerGames.length);
    const next = () => setCurrent(p => (p + 1) % bannerGames.length);

    return (
        <Box
            sx={{ position: 'relative', height: { xs: 280, sm: 380, md: 480 }, overflow: 'hidden' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slides strip */}
            <Box
                sx={{
                    display: 'flex',
                    width: `${bannerGames.length * 100}%`,
                    height: '100%',
                    transform: `translateX(-${(current * 100) / bannerGames.length}%)`,
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {bannerGames.map((game) => (
                    <Box
                        key={game.id}
                        sx={{
                            width: `${100 / bannerGames.length}%`,
                            flexShrink: 0,
                            height: '100%',
                            backgroundImage: `url(${game.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}
                    >
                        {/* Gradients */}
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.3) 65%, transparent 100%)',
                        }} />
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)',
                        }} />

                        {/* Content */}
                        <Box sx={{ position: 'relative', p: { xs: 3, md: 6 }, maxWidth: 560, pb: { xs: 5, md: 8 } }}>
                            <Chip
                                label="JUEGO DESTACADO"
                                size="small"
                                sx={{ mb: 1.5, bgcolor: '#7c4dff', color: 'white', fontWeight: 700, fontSize: '0.7rem' }}
                            />
                            <Typography
                                variant="h3" fontWeight={900} color="white"
                                sx={{ fontSize: { xs: '1.6rem', md: '2.8rem' }, lineHeight: 1.1, mb: 1 }}
                            >
                                {game.name}
                            </Typography>
                            <Typography
                                variant="body1" color="rgba(255,255,255,0.72)"
                                sx={{ mb: 2, display: { xs: 'none', md: 'block' }, lineHeight: 1.6 }}
                            >
                                {game.description}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <Rating value={game.rating} precision={0.1} readOnly size="small" />
                                <Typography variant="body2" color="rgba(255,255,255,0.55)">
                                    {game.rating} · {game.reviews.toLocaleString()} reseñas
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Typography variant="h4" fontWeight={800} color="white">
                                    {game.isFree ? 'Gratis' : `€${game.price.toFixed(2)}`}
                                </Typography>
                                {game.discount > 0 && (
                                    <>
                                        <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.35)' }}>
                                            €{game.originalPrice.toFixed(2)}
                                        </Typography>
                                        <Chip label={`-${game.discount}%`} size="small" color="error" sx={{ fontWeight: 700 }} />
                                    </>
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained" size="large"
                                    onClick={() => addToCart(game)}
                                    sx={{ fontWeight: 700, textTransform: 'none', borderRadius: 2, px: 3 }}
                                >
                                    {game.isFree ? 'Obtener Gratis' : 'Añadir al Carrito'}
                                </Button>
                                <Button
                                    variant="outlined" size="large"
                                    onClick={() => navigate('/catalog')}
                                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.35)', textTransform: 'none', borderRadius: 2 }}
                                >
                                    Ver Catálogo
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Arrow buttons */}
            <IconButton
                onClick={prev}
                sx={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)', color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                    zIndex: 2,
                }}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton
                onClick={next}
                sx={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)', color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                    zIndex: 2,
                }}
            >
                <ChevronRight />
            </IconButton>

            {/* Dot indicators */}
            <Box sx={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 1, zIndex: 2,
            }}>
                {bannerGames.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setCurrent(i)}
                        sx={{
                            width: i === current ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: i === current ? '#7c4dff' : 'rgba(255,255,255,0.45)',
                            cursor: 'pointer',
                            transition: 'width 0.3s ease, background-color 0.3s ease',
                        }}
                    />
                ))}
            </Box>

            {/* Progress bar */}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: 'rgba(255,255,255,0.1)', zIndex: 2 }}>
                <Box
                    key={current}
                    sx={{
                        height: '100%',
                        bgcolor: '#7c4dff',
                        animation: paused ? 'none' : 'progress 3s linear',
                        '@keyframes progress': {
                            from: { width: '0%' },
                            to: { width: '100%' },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />

            <HeroBanner addToCart={addToCart} navigate={navigate} />

            {/* Content sections */}
            <Box sx={{ maxWidth: 1300, mx: 'auto', px: { xs: 2, md: 4 }, py: 6 }}>

                {/* Promo banners */}
                <Grid container spacing={2} sx={{ mb: 6 }}>
                    {[
                        { icon: <LocalOffer />, title: 'Ofertas Semanales', sub: 'Hasta 75% de descuento', color: '#ff4081' },
                        { icon: <NewReleases />, title: 'Nuevos Lanzamientos', sub: 'Los últimos éxitos', color: '#7c4dff' },
                        { icon: <TrendingUp />, title: 'Más Vendidos', sub: 'Lo que todo el mundo juega', color: '#00c853' },
                        { icon: <SportsEsports />, title: 'Juegos Gratis', sub: 'Sin coste, diversión garantizada', color: '#ff6d00' },
                    ].map(({ icon, title, sub, color }) => (
                        <Grid item xs={6} md={3} key={title}>
                            <Card
                                onClick={() => navigate('/catalog')}
                                sx={{
                                    p: 2, cursor: 'pointer',
                                    border: `1px solid ${color}30`,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${color}30` },
                                }}
                            >
                                <Box sx={{ color, mb: 1 }}>{icon}</Box>
                                <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
                                <Typography variant="caption" color="text.secondary">{sub}</Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Best Sellers */}
                <SectionHeader title="Más Vendidos" icon={<TrendingUp />} onSeeAll={() => navigate('/catalog')} />
                <GameGrid games={bestSellers} addToCart={addToCart} />

                {/* On Sale */}
                <SectionHeader title="En Oferta" icon={<LocalOffer />} onSeeAll={() => navigate('/catalog')} />
                <GameGrid games={onSale} addToCart={addToCart} />

                {/* New Releases */}
                <SectionHeader title="Nuevos Lanzamientos" icon={<NewReleases />} onSeeAll={() => navigate('/catalog')} />
                <GameGrid games={newGames.length ? newGames : games.slice(10, 14)} addToCart={addToCart} />
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: 4, mt: 4 }}>
                <Box sx={{ maxWidth: 1300, mx: 'auto', px: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2025 GameStore · Todos los derechos reservados · Política de Privacidad · Términos de Uso
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const SectionHeader = ({ title, icon, onSeeAll }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, mt: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: 'primary.main' }}>{icon}</Box>
            <Typography variant="h5" fontWeight={800}>{title}</Typography>
        </Box>
        <Button endIcon={<ArrowForward />} onClick={onSeeAll} size="small" sx={{ textTransform: 'none' }}>
            Ver todos
        </Button>
    </Box>
);

const GameGrid = ({ games: gameList, addToCart }) => (
    <Grid container spacing={2.5}>
        {gameList.map(game => (
            <Grid item xs={12} sm={6} md={3} key={game.id}>
                <Card sx={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
                }}>
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia component="img" height="150" image={game.image} alt={game.name} />
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
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap gutterBottom>
                            {game.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                            <Rating value={game.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="caption" color="text.secondary">({game.reviews.toLocaleString()})</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                            {game.genre.slice(0, 2).map(g => (
                                <Chip key={g} label={g} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                            ))}
                        </Box>
                        <Box sx={{ mt: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                {game.isFree ? (
                                    <Typography fontWeight={700} color="success.main">Gratis</Typography>
                                ) : (
                                    <>
                                        <Typography fontWeight={800} color="primary.main">€{game.price.toFixed(2)}</Typography>
                                        {game.discount > 0 && (
                                            <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                                                €{game.originalPrice.toFixed(2)}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Button
                                variant="contained" size="small" fullWidth
                                onClick={() => addToCart(game)}
                                color={game.isFree ? 'success' : 'primary'}
                                sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 1.5 }}
                            >
                                {game.isFree ? 'Obtener Gratis' : 'Añadir al Carrito'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);

export default HomePage;
