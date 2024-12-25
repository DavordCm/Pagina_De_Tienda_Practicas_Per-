import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gamesData = [
    { id: 1, title: "Starfield", image: "https://via.placeholder.com/150" },
    { id: 2, title: "The Legend of Zelda: Tears of the Kingdom", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Cyberpunk 2077: Phantom Liberty", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Hogwarts Legacy", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Marvel's Spider-Man 2", image: "https://via.placeholder.com/150" },
];

function GamesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí podrías implementar la lógica para limpiar los datos de sesión (si corresponde)
        navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    };

    const filteredGames = gamesData.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Barra de navegación */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1>Video Games 2024</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Log Out
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            {/* Listado de juegos */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "20px",
                }}
            >
                {filteredGames.map((game) => (
                    <div
                        key={game.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "10px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={game.image}
                            alt={game.title}
                            style={{ width: "100%", borderRadius: "5px" }}
                        />
                        <h3>{game.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesPage;
