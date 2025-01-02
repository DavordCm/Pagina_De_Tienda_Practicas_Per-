import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') { // Simulación de autenticación
            login();
            navigate('/home');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <label>Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Aceptar</button>
            </form>
        </div>
    );
};

export default LoginPage;
