import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    strength?: number; // How strong the magnetic pull is
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    onClick,
    className = '',
    strength = 30
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        const factor = strength / 100;
        setPosition({ x: x * factor, y: y * factor });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
        return (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block', cursor: 'pointer' }}
        >
            {children}
        </motion.div>
    );
};
