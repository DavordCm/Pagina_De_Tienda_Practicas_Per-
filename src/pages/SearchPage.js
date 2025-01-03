import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Box } from '@mui/material';

const games = [
    {
        name: 'Heroes of the Storm',
        image: 'https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blt03542249d3e68c2a/65bc49d6529b719b244a1436/game_features_1.webp',
        description: 'Un juego MOBA desarrollado por Blizzard Entertainment, donde los héroes de diferentes franquicias de Blizzard luchan en arenas estratégicas.',
    },
    {
        name: 'Counter-Strike 2 (CS2)',
        image: 'https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react//cs2/header_ctt.png',
        description: 'Un juego de disparos en primera persona donde los jugadores eligen entre ser terroristas o antiterroristas y completan misiones o eliminan a los oponentes.',
    },
    {
        name: 'Fortnite',
        image: 'https://i.blogs.es/a4641d/fortnite2021/1366_2000.webp',
        description: 'Un juego de supervivencia y construcción en un mundo abierto, donde los jugadores luchan para ser el último en pie.',
    },
    {
        name: 'Minecraft',
        image: 'https://store-images.s-microsoft.com/image/apps.59099.13774133678237924.af75ec7a-b37e-4ade-838e-957fc55ee7f8.155a0f16-8f3e-44e8-95a5-e91e29257dda?q=90&w=177&h=265',
        description: 'Un juego de sandbox donde los jugadores pueden explorar, construir y sobrevivir en un mundo generado por bloques.',
    },
    {
        name: 'Dota 2',
        image: 'https://i.pcmag.com/imagery/reviews/00XEmE7YBg1AOLEzZFQxhJV-3.fit_scale.size_1028x578.v1569475078.jpg',
        description: 'Un juego MOBA desarrollado por Valve, donde dos equipos de cinco jugadores luchan por destruir la base enemiga.',
    },
    {
        name: 'Overwatch 2',
        image: 'https://m.media-amazon.com/images/I/812HBc8O+UL._AC_SY741_.jpg',
        description: 'Un shooter en equipo desarrollado por Blizzard Entertainment, donde los jugadores eligen héroes con habilidades únicas.',
    },
    {
        name: 'Call of Duty: Warzone',
        image: 'https://sm.ign.com/t/ign_es/cover/c/call-of-du/call-of-duty-warzone_4dwc.300.jpg',
        description: 'Un juego de battle royale y disparos en primera persona que forma parte de la serie Call of Duty.',
    },
];

const GamesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        // Filtrar los juegos según el nombre
        const filtered = games.filter((game) =>
            game.name.toLowerCase().includes(query)
        );
        setFilteredGames(filtered);
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* Campo de búsqueda */}
            <TextField
                label="Buscar juegos"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginBottom: 3 }}
            />

            {/* Grid de juegos filtrados */}
            <Grid container spacing={4}>
                {filteredGames.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        No se encontraron juegos.
                    </Typography>
                ) : (
                    filteredGames.map((game, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={game.image}
                                    alt={game.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {game.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {game.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default GamesPage;
