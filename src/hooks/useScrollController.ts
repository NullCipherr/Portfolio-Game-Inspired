


import { useState, useEffect, useRef } from 'react';

export const useScrollController = (loading: boolean, scrollMode: 'snap' | 'free' = 'snap') => {
    const [activeSection, setActiveSection] = useState('#home');
    const [isScrolling, setIsScrolling] = useState(false);
    const mainRef = useRef<HTMLElement>(null);
    const cachedDestinations = useRef<HTMLElement[]>([]);

    // Cache scroll destinations
    useEffect(() => {
        if (!loading && mainRef.current) {
            const mainEl = mainRef.current;
            cachedDestinations.current = Array.from(mainEl.querySelectorAll<HTMLElement>('section, footer'));
        }
    }, [loading]);

    // Simplified active section detection using Intersection Observer
    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl || loading) return;

        const observerOptions = {
            root: mainEl,
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        }, observerOptions);

        const sections = mainEl.querySelectorAll('section, footer');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [loading]);

    return {
        activeSection,
        setActiveSection,
        mainRef,
        isScrolling: false // No longer needed for logic, kept for type compatibility
    };
};
