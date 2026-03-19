import React, { useState, useEffect, useRef } from 'react';

interface TypingTitleProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const DECODE_SPEED_MS = 30; // Speed of character shuffling

const TypingTitle: React.FC<TypingTitleProps> = ({ text, className, as: Component = 'h2' }) => {
    const prefix = "> ";
    const hasPrefix = text.startsWith(prefix);
    const targetText = hasPrefix ? text.substring(prefix.length) : text;

    const [displayText, setDisplayText] = useState('');
    const [isInView, setIsInView] = useState(false);
    
    const containerRef = useRef<HTMLElement>(null);
    const iterationRef = useRef(0);
    const intervalRef = useRef<any>(null);

    // Observer to trigger animation when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (containerRef.current) observer.unobserve(containerRef.current);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const animateText = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        iterationRef.current = 0;

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => 
                targetText
                    .split("")
                    .map((char, index) => {
                        if (index < iterationRef.current) {
                            return targetText[index];
                        }
                        // Random char during decoding
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iterationRef.current >= targetText.length) {
                clearInterval(intervalRef.current);
            }

            // Iterate slower or faster
            iterationRef.current += 1 / 3; 
        }, DECODE_SPEED_MS);
    };

    // Trigger on view
    useEffect(() => {
        if (isInView) {
            animateText();
        }
        return () => clearInterval(intervalRef.current);
    }, [isInView, targetText]);

    // Cast the specific ref type or use generic HTMLElement
    const Tag = Component as any;

    return (
        <Tag 
            ref={containerRef} 
            className={`${className} cursor-default`}
            aria-label={text}
        >
            {hasPrefix && <span className="opacity-50 select-none mr-2">{prefix}</span>}
            <span>{displayText}</span>
        </Tag>
    );
};

export default TypingTitle;