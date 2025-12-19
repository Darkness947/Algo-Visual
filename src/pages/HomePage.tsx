import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Search, GitGraph, Zap, Code, Layout, Layers, Clock, Globe, Github, MessageSquare, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CircularText } from '../components/animations/CircularText';
import { GlitchText } from '../components/animations/GlitchText';
import { FallenText } from '../components/animations/FallenText';
import { AntigravitySection } from '../components/animations/AntigravitySection';
import { CurvedText } from '../components/animations/CurvedText';
import { TypewriterText } from '../components/animations/TypewriterText';
import { MagneticButton } from '../components/animations/MagneticButton';
import { Footer } from '../components/layout/Footer';
import '../styles/HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    const letter = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200
            }
        }
    };

    const titleText = t('heroTitle');

    return (
        <div className="home-container">
            {/* Language Toggle for Home Page */}
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
                <button
                    onClick={toggleLanguage}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Globe size={20} />
                    <span>{language === 'en' ? 'AR' : 'EN'}</span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <motion.div
                    className="floating-shape shape-1"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="floating-shape shape-2"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                <motion.h1
                    className="hero-title"
                    variants={letterContainer}
                    initial="hidden"
                    animate="show"
                    key={language} // Remount animation on language change
                >
                    {language === 'ar' ? (
                        <motion.span variants={letter} style={{ display: 'inline-block' }}>
                            {titleText}
                        </motion.span>
                    ) : (
                        titleText.split("").map((char: string, index: number) => (
                            <motion.span key={index} variants={letter} style={{ display: 'inline-block', marginRight: char === ' ' ? '1rem' : '0' }}>
                                {char}
                            </motion.span>
                        ))
                    )}
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    key={`sub-${language}`}
                >
                    {t('heroSubtitle')}
                </motion.p>

                {/* Typewriter Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{ marginBottom: '2rem', height: '2rem' }}
                >
                    <TypewriterText strings={t('tips') as string[]} />
                </motion.div>

                <motion.button
                    className="cta-button"
                    onClick={() => navigate('/visualizer')}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 1.5, type: "spring" }}
                >
                    {t('startVisualizing')}
                </motion.button>
            </section>

            {/* Antigravity Section (Background for Features) */}
            <div style={{ position: 'relative' }}>
                {!isMobile && <AntigravitySection />}

                {/* Features Section */}
                <section className="features-section" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {t('featuresTitle')}
                    </motion.h2>

                    <motion.div
                        className="features-grid"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <FeatureCard
                            icon={<BarChart2 size={32} />}
                            title={t('featSortingTitle')}
                            description={t('featSortingDesc')}
                        />
                        <FeatureCard
                            icon={<GitGraph size={32} />}
                            title={t('featGraphTitle')}
                            description={t('featGraphDesc')}
                        />
                        <FeatureCard
                            icon={<Search size={32} />}
                            title={t('featSearchTitle')}
                            description={t('featSearchDesc')}
                        />
                        <FeatureCard
                            icon={<Code size={32} />}
                            title={t('featCodeTitle')}
                            description={t('featCodeDesc')}
                        />
                        <FeatureCard
                            icon={<Zap size={32} />}
                            title={t('featControlTitle')}
                            description={t('featControlDesc')}
                        />
                        <FeatureCard
                            icon={<Layout size={32} />}
                            title={t('featUiTitle')}
                            description={t('featUiDesc')}
                        />
                        <FeatureCard
                            icon={<Layers size={32} />}
                            title={t('featDpTitle')}
                            description={t('featDpDesc')}
                        />
                        <FeatureCard
                            icon={<Clock size={32} />}
                            title={t('featGreedyTitle')}
                            description={t('featGreedyDesc')}
                        />
                    </motion.div>
                </section>
            </div>

            {/* Did You Know Section (Glitch & Fallen Text) */}
            <section className="did-you-know-section" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <GlitchText text={t('didYouKnow')} className="section-title" />
                <div style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#cbd5e1' }}>
                    <FallenText text={t('fact1')} />
                    <div style={{ height: '1rem' }} />
                    <FallenText text={t('fact2')} />
                    <div style={{ height: '1rem' }} />
                    <FallenText text={t('fact3')} />
                </div>
            </section>

            {/* Community Section (Circular Text) */}
            <section className="community-section" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularText text={t('masterAlgos')} radius={100} fontSize="0.8rem" />
                    <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        AlgoVisual
                    </div>
                </div>
                <h2 className="section-title">{t('joinCommunity')}</h2>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="https://github.com/Darkness947" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <MagneticButton className="social-button">
                            <Github size={24} />
                            <span>{t('github')}</span>
                        </MagneticButton>
                    </a>
                    <a href="https://discord.gg/DwaHY47z" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <MagneticButton className="social-button">
                            <MessageSquare size={24} />
                            <span>{t('discord')}</span>
                        </MagneticButton>
                    </a>
                    <a href="https://x.com/caraxes_t?s=21" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <MagneticButton className="social-button">
                            <Twitter size={24} />
                            <span>{t('twitter')}</span>
                        </MagneticButton>
                    </a>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div style={{ marginBottom: '2rem' }}>
                    <CurvedText text={t('learningJourney')} />
                </div>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {t('howItWorksTitle')}
                </motion.h2>

                <div className="steps-container">
                    <StepCard
                        number="01"
                        title={t('step1Title')}
                        description={t('step1Desc')}
                        delay={0.2}
                    />
                    <StepCard
                        number="02"
                        title={t('step2Title')}
                        description={t('step2Desc')}
                        delay={0.4}
                    />
                    <StepCard
                        number="03"
                        title={t('step3Title')}
                        description={t('step3Desc')}
                        delay={0.6}
                    />
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => {
    return (
        <motion.div
            className="feature-card"
            variants={{
                hidden: { y: 50, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
            <div className="feature-icon">
                {icon}
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </motion.div>
    );
};

const StepCard: React.FC<{ number: string, title: string, description: string, delay: number }> = ({ number, title, description, delay }) => {
    return (
        <motion.div
            className="step-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
        >
            <div className="step-number">{number}</div>
            <div className="step-content">
                <h3 className="step-title">{title}</h3>
                <p className="step-description">{description}</p>
            </div>
        </motion.div>
    );
};
