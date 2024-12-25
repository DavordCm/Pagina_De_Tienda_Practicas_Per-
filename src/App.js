import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <div>
                {/* Renderiza la barra de navegación aquí una sola vez */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
