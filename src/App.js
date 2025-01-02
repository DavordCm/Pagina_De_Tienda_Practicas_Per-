import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/games"
                    element={
                        <PrivateRoute>
                            <GamesPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
