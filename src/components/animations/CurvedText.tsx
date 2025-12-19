import React from 'react';

interface CurvedTextProps {
    text: string;
    className?: string;
}

export const CurvedText: React.FC<CurvedTextProps> = ({ text, className = '' }) => {
    // A simple SVG path for text to follow
    const pathId = "curvePath";

    return (
        <div className={`curved-text-container ${className}`} style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center' }}>
            <svg width="100%" height="200" viewBox="0 0 1000 200" style={{ overflow: 'visible' }}>
                <path
                    id={pathId}
                    d="M 50,100 Q 500,250 950,100"
                    fill="transparent"
                    stroke="none"
                />
                <text width="1000">
                    <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle" style={{ fill: 'var(--text-primary)', fontSize: '2rem', fontWeight: 'bold' }}>
                        {text}
                    </textPath>
                </text>
            </svg>
        </div>
    );
};
