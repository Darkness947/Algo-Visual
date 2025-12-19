import React from 'react';
import { Menu, Sun, Moon, Github } from 'lucide-react';
import { useVisualization } from '../../context/VisualizationContext';
import '../../styles/Navbar.css';

interface NavbarProps {
    toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const { theme, toggleTheme, algorithm } = useVisualization();

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="btn-icon mobile-menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <h1 className="page-title">{algorithm ? algorithm.name : 'AlgoVisual'}</h1>
            </div>

            <div className="navbar-right">
                <a href="https://github.com/Darkness947" target="_blank" rel="noreferrer" className="btn-icon">
                    <Github size={20} />
                </a>
                <button className="btn-icon" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};
