import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Globe, Layers, Box } from 'lucide-react';

export const AntigravitySection: React.FC = () => {
    const icons = [
        { Icon: Code, delay: 0, x: '10%', size: 40 },
        { Icon: Database, delay: 2, x: '30%', size: 30 },
        { Icon: Cpu, delay: 4, x: '50%', size: 50 },
        { Icon: Globe, delay: 1, x: '70%', size: 35 },
        { Icon: Layers, delay: 3, x: '90%', size: 45 },
        { Icon: Box, delay: 5, x: '20%', size: 25 },
    ];

    return (
        <div className="antigravity-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: '120vh', opacity: 0 }}
                    animate={{
                        y: '-20vh',
                        opacity: [0, 0.5, 0.5, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: item.x,
                        color: 'rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <item.Icon size={item.size} />
                </motion.div>
            ))}
        </div>
    );
};
