// components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const navStyle = {
        padding: '10px',
        textDecoration: 'none',
        marginRight: '10px',
        color: 'black',
    };

    const activeStyle = {
        fontWeight: 'bold',
        color: 'blue',
    };

    return (
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <NavLink to="/home" style={navStyle} activeStyle={activeStyle}>
                Home
            </NavLink>
            <NavLink to="/games" style={navStyle} activeStyle={activeStyle}>
                Games
            </NavLink>
            <NavLink to="/search" style={navStyle} activeStyle={activeStyle}>
                Search
            </NavLink>
        </nav>
    );
}

export default Navbar;
