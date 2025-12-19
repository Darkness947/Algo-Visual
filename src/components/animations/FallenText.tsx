import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface FallenTextProps {
    text: string;
    className?: string;
}

export const FallenText: React.FC<FallenTextProps> = ({ text, className = '' }) => {
    const { language } = useLanguage();

    // For Arabic, we might want to keep words together or just render the block 
    // if splitting characters breaks ligatures.
    // However, "Fallen Text" implies individual letters dropping. 
    // For Arabic, dropping words might be safer and still look cool.

    const isArabic = language === 'ar';
    const items = isArabic ? text.split(' ') : text.split('');

    return (
        <div className={`fallen-text-container ${className}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isArabic ? '0.5rem' : '0' }}>
            {items.map((item, i) => (
                <motion.span
                    key={i}
                    initial={{ y: -100, opacity: 0, rotate: Math.random() * 40 - 20 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                        delay: i * 0.05
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {item === ' ' && !isArabic ? '\u00A0' : item}
                </motion.span>
            ))}
        </div>
    );
};
