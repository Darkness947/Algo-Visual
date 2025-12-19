import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Search, GitGraph, Zap, Code, Layout, Layers, Clock } from 'lucide-react';
import '../styles/HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

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

    const titleText = "Algorithm Visualizer";

    return (
        <div className="home-container">
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
                >
                    {titleText.split("").map((char, index) => (
                        <motion.span key={index} variants={letter} style={{ display: 'inline-block', marginRight: char === ' ' ? '1rem' : '0' }}>
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    Master complex algorithms through interactive, step-by-step visualizations.
                    Explore Sorting, Searching, and Graph algorithms in a beautiful, modern interface.
                </motion.p>

                <motion.button
                    className="cta-button"
                    onClick={() => navigate('/visualizer')}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 1.5, type: "spring" }}
                >
                    Start Visualizing
                </motion.button>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Everything you need to learn
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
                        title="Sorting Algorithms"
                        description="Watch Bubble, Merge, Quick sort and more organize data in real-time."
                    />
                    <FeatureCard
                        icon={<GitGraph size={32} />}
                        title="Graph Theory"
                        description="Visualize BFS, DFS, and Dijkstra's algorithm on interactive graphs."
                    />
                    <FeatureCard
                        icon={<Search size={32} />}
                        title="Searching"
                        description="Understand how Linear and Binary search find elements efficiently."
                    />
                    <FeatureCard
                        icon={<Code size={32} />}
                        title="Code Tracing"
                        description="Follow the code execution line-by-line as the visualization runs."
                    />
                    <FeatureCard
                        icon={<Zap size={32} />}
                        title="Real-time Control"
                        description="Pause, play, step forward/backward, and adjust speed on the fly."
                    />
                    <FeatureCard
                        icon={<Layout size={32} />}
                        title="Modern UI"
                        description="A clean, dark-mode enabled interface built for focus and clarity."
                    />
                    <FeatureCard
                        icon={<Layers size={32} />}
                        title="Dynamic Programming"
                        description="Master complex problems like LCS and Knapsack with table visualizations."
                    />
                    <FeatureCard
                        icon={<Clock size={32} />}
                        title="Greedy Algorithms"
                        description="Visualize optimization problems like Activity Selection step-by-step."
                    />
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    How it works
                </motion.h2>

                <div className="steps-container">
                    <StepCard
                        number="01"
                        title="Select an Algorithm"
                        description="Choose from our extensive library of sorting, searching, graph, and DP algorithms."
                        delay={0.2}
                    />
                    <StepCard
                        number="02"
                        title="Visualize Execution"
                        description="Watch the algorithm run step-by-step with real-time variable updates and code highlighting."
                        delay={0.4}
                    />
                    <StepCard
                        number="03"
                        title="Master the Concept"
                        description="Experiment with different inputs and speeds to build a deep intuitive understanding."
                        delay={0.6}
                    />
                </div>
            </section>
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
