import React, { useState } from 'react';
import './Header.css';
import PAN_Logo from '../assets/PAN_Logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for hamburger menu

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <a href="/">
                    <img src={PAN_Logo} className="logo" alt="PAN Logo" />
                </a>
            </div>

            {/* Hamburger menu button for mobile */}
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Menu */}
            <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li><a href="/login" onClick={() => setMenuOpen(false)}>Login</a></li>
                    <li><a href="/timeRegistration" onClick={() => setMenuOpen(false)}>Time Registration</a></li>
                    <li><a href="/work-summary" onClick={() => setMenuOpen(false)}>Work Summary</a></li>
                </ul>
            </nav>
        </header>
    );
}
