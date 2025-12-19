import React from 'react';
import '../../styles/GlitchText.css';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <div className="glitch" data-text={text}>
                {text}
            </div>
        </div>
    );
};
