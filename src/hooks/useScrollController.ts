


import { useState, useEffect, useRef } from 'react';

export const useScrollController = (loading: boolean, scrollMode: 'snap' | 'free' = 'snap') => {
    const [activeSection, setActiveSection] = useState('#home');
    const mainRef = useRef<HTMLElement>(null);
    const activeSectionRef = useRef(activeSection);

    // Simplified active section detection using Intersection Observer
    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl || loading) return;

        const observerOptions = {
            root: mainEl,
            threshold: scrollMode === 'snap' ? 0.6 : 0.35,
        };

        const observer = new IntersectionObserver((entries) => {
            const mostVisibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!mostVisibleEntry?.target?.id) return;

            const nextSection = `#${mostVisibleEntry.target.id}`;
            if (activeSectionRef.current !== nextSection) {
                activeSectionRef.current = nextSection;
                setActiveSection(nextSection);
            }
        }, observerOptions);

        const sections = mainEl.querySelectorAll('section, footer');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [loading, scrollMode]);

    return {
        activeSection,
        setActiveSection,
        mainRef,
        isScrolling: false // No longer needed for logic, kept for type compatibility
    };
};
