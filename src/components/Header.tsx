import React, { useState, useEffect, useRef } from 'react';
import AnimatedLogo from './AnimatedLogo';

const NAV_ITEMS = [
    { href: '#home', icon: 'fas fa-home', text: 'Home' },
    { href: '#about', icon: 'fas fa-user', text: 'About' },
    { href: '#skills', icon: 'fas fa-cogs', text: 'Skills' },
    { href: '#projects', icon: 'fas fa-briefcase', text: 'Projects' },
    { href: '#resume', icon: 'fas fa-file-alt', text: 'Resume' },
    { href: '#contact', icon: 'fas fa-envelope', text: 'Contact' },
];

const SCROLL_OBSERVER_DEBOUNCE_MS = 1000;

const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('#home');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // This check ensures that we only update the active section
            // when the user is scrolling manually, not during a programmatic scroll.
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.75, // Section is considered active when 75% visible
        });
        
        const observer = observerRef.current;
        const sections = NAV_ITEMS.map(item => document.querySelector(item.href));
        sections.forEach(sec => {
            if (sec) observer.observe(sec);
        });

        return () => {
            sections.forEach(sec => {
                if (sec) observer.unobserve(sec);
            });
            observer.disconnect();
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();

        // Clear any pending timeout to re-enable the observer
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set active section immediately on click for a responsive feel
        setActiveSection(targetId);
        
        // Temporarily disconnect the observer to prevent it from firing during the smooth scroll
        const observer = observerRef.current;
        if (observer) {
            observer.disconnect();
        }

        const element = document.querySelector(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Re-enable the observer after the scroll animation is likely to have finished
        scrollTimeoutRef.current = window.setTimeout(() => {
            if (observer) {
                const sections = NAV_ITEMS.map(item => document.querySelector(item.href));
                sections.forEach(sec => {
                    if (sec) observer.observe(sec);
                });
            }
        }, SCROLL_OBSERVER_DEBOUNCE_MS); 
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg header-glow-border">
            <nav className="container mx-auto flex justify-between items-center h-16 px-6">
                <div>
                    <AnimatedLogo onClick={(e) => handleNavClick(e, '#home')} />
                </div>
                <ul className="flex justify-center items-center list-none p-0 m-0 space-x-1 md:space-x-2 h-full">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href} className="h-full flex items-center">
                            <a
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`flex items-center justify-center text-sm uppercase no-underline relative rounded-md px-3 py-2 transition-all duration-300 nav-link ${activeSection === item.href ? 'active' : ''}`}
                                title={item.text}
                            >
                                <i className={`${item.icon} text-base md:mr-2`}></i>
                                <span className="hidden md:inline">{item.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;