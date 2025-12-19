import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface CircularTextProps {
    text: string;
    radius?: number;
    fontSize?: string;
    letterSpacing?: number;
    className?: string;
}

export const CircularText: React.FC<CircularTextProps> = ({
    text,
    radius = 100,
    fontSize = '1rem',
    letterSpacing = 12,
    className = ''
}) => {
    const { language } = useLanguage();

    // SVG approach ensures Arabic ligatures are preserved
    const size = radius * 2;
    const pathId = `circlePath-${Math.random().toString(36).substr(2, 9)}`;

    // Create a circle path
    // M cx, cy m -r, 0 a r,r 0 1,1 (2*r),0 a r,r 0 1,1 -(2*r),0
    // This draws a circle starting from the left (9 o'clock) moving clockwise

    return (
        <div className={`circular-text-container ${className}`} style={{ width: size, height: size }}>
            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <path
                        id={pathId}
                        d={`M ${radius}, ${radius} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                    />
                </defs>
                <text width={size}>
                    <textPath
                        href={`#${pathId}`}
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: 'var(--text-primary)',
                            fontSize,
                            fontWeight: 'bold',
                            letterSpacing: language === 'ar' ? '0px' : `${letterSpacing}px`
                        }}
                    >
                        {text}
                    </textPath>
                </text>
            </motion.svg>
        </div>
    );
};
