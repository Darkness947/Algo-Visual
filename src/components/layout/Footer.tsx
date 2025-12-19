import React from 'react';
import { Link } from 'react-router-dom';
import { Github, MessageSquare, Twitter, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton } from '../animations/MagneticButton';
import '../../styles/Footer.css';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3 className="footer-logo">AlgoVisual</h3>
                        <p className="footer-tagline">{t('footerTagline')}</p>
                    </div>

                    <div className="footer-links">
                        <h4>{t('quickLinks')}</h4>
                        <ul>
                            <li><Link to="/">{t('home')}</Link></li>
                            <li><Link to="/visualizer">{t('visualizer')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4>{t('connect')}</h4>
                        <div className="social-icons">
                            <a href="https://github.com/Darkness947" target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="footer-social-btn">
                                    <Github size={20} />
                                </MagneticButton>
                            </a>
                            <a href="https://discord.gg/DwaHY47z" target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="footer-social-btn">
                                    <MessageSquare size={20} />
                                </MagneticButton>
                            </a>
                            <a href="https://x.com/caraxes_t?s=21" target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="footer-social-btn">
                                    <Twitter size={20} />
                                </MagneticButton>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {currentYear} AlgoVisual. {t('allRightsReserved')} {t('copyright')}
                        <span className="heart-icon"><Heart size={14} fill="red" stroke="none" /></span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
