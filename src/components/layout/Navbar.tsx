import React from 'react';
import { Menu, Sun, Moon, Github, Globe } from 'lucide-react';
import { useVisualization } from '../../context/VisualizationContext';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/Navbar.css';

import { algorithmNameMap } from '../../utils/algorithmMapping';

interface NavbarProps {
    toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const { theme, toggleTheme, algorithm } = useVisualization();
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="btn-icon mobile-menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <h1 className="page-title">
                    {algorithm ? (language === 'ar' ? t(algorithmNameMap[algorithm.name] || 'appTitle') || algorithm.name : algorithm.name) : t('appTitle')}
                </h1>
            </div>

            <div className="navbar-right">
                <button className="btn-icon" onClick={toggleLanguage} title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}>
                    <Globe size={20} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '4px' }}>
                        {language === 'en' ? 'AR' : 'EN'}
                    </span>
                </button>
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
