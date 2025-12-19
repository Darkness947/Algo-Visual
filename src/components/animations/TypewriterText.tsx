import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/TypewriterText.css';

interface TypewriterTextProps {
    strings: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    delay?: number;
    className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    strings,
    typeSpeed = 100,
    deleteSpeed = 50,
    delay = 2000,
    className = ''
}) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
    const { language } = useLanguage();

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % strings.length;
            const fullText = strings[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, strings, typeSpeed, deleteSpeed, delay]);

    return (
        <div className={`typewriter-container ${className} ${language === 'ar' ? 'rtl' : ''}`}>
            <span className="typewriter-text">{text}</span>
            <span className="typewriter-cursor">|</span>
        </div>
    );
};
