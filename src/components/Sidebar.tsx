import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import { translations, Language } from '../config/translations';
import { useAudio } from '../hooks/useAudio';

interface SidebarProps {
    primaryRgb: string;
    isPinned: boolean;
    setPinned: (isPinned: boolean) => void;
    setHovered: (isHovered: boolean) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    setSettingsOpen: (isOpen: boolean) => void;
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const SCROLL_OBSERVER_DEBOUNCE_MS = 1000;

const Sidebar: React.FC<SidebarProps> = ({ 
    primaryRgb, 
    isPinned, 
    setPinned, 
    setHovered, 
    language, 
    setLanguage, 
    setSettingsOpen,
    activeSection, 
    setActiveSection 
}) => {
    const t = translations[language].nav;
    const { playSound } = useAudio();
    
    const NAV_ITEMS = useMemo(() => [
        { href: '#home', icon: 'fas fa-home', text: t.home },
        { href: '#about', icon: 'fas fa-user', text: t.about },
        { href: '#skills', icon: 'fas fa-cogs', text: t.skills },
        { href: '#projects', icon: 'fas fa-briefcase', text: t.projects },
        { href: '#resume', icon: 'fas fa-file-alt', text: t.resume },
        { href: '#contact', icon: 'fas fa-envelope', text: t.contact },
    ], [t]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const hoverTimeoutRef = useRef<number | null>(null);
    
    const [isCurrentlyHovered, setIsCurrentlyHovered] = useState(false);
    const [tooltip, setTooltip] = useState<{ content: string; top: number } | null>(null);
    const isExpanded = isPinned || isCurrentlyHovered;

    // --- Scroll Observer Logic ---
    React.useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        observerRef.current = new IntersectionObserver(observerCallback, { root: null, threshold: 0.2 });
        
        const observer = observerRef.current;
        const sections = NAV_ITEMS.map(item => document.getElementById(item.href.substring(1)));
        const footer = document.getElementById('footer');

        sections.forEach(sec => { if (sec) observer.observe(sec); });
        if (footer) observer.observe(footer);

        return () => {
            observer.disconnect();
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [NAV_ITEMS, setActiveSection]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        playSound('click');
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        
        const observer = observerRef.current;
        if (observer) observer.disconnect();

        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId); 

        scrollTimeoutRef.current = window.setTimeout(() => {
            if (observer) {
                const sections = NAV_ITEMS.map(item => document.getElementById(item.href.substring(1)));
                const footer = document.getElementById('footer');
                sections.forEach(sec => { if (sec) observer.observe(sec); });
                if (footer) observer.observe(footer);
            }
        }, SCROLL_OBSERVER_DEBOUNCE_MS); 
    };

    // --- Intelligent Hover & Tooltip Logic ---
    const handleHoverStart = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsCurrentlyHovered(true);
        setHovered(true);
    };

    const handleHoverEnd = () => {
        setTooltip(null);
        if (!isPinned) {
            hoverTimeoutRef.current = window.setTimeout(() => {
                setIsCurrentlyHovered(false);
                setHovered(false);
            }, 300);
        }
    };
    
    const handleItemMouseEnter = (e: React.MouseEvent, content: string) => {
        playSound('hover');
        if (!isExpanded) {
            setTooltip({ content, top: (e.currentTarget as HTMLElement).offsetTop });
        }
    };

    const handlePinClick = () => {
        playSound(isPinned ? 'toggleOff' : 'toggleOn');
        setPinned(!isPinned);
    };
    
    const handleLanguageClick = () => {
        playSound('toggleOn');
        setLanguage(language === 'en' ? 'pt-BR' : 'en');
    };

    const handleSettingsClick = () => {
        playSound('open');
        setSettingsOpen(true);
    };

    const Divider = () => (
        <motion.div
            className="w-full px-4 my-2"
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            <div 
                className="h-px w-full" 
                style={{ 
                    background: `linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.3), transparent)` 
                }} 
            />
        </motion.div>
    );

    return (
        <>
            {/* --- Desktop Sidebar (Left) --- */}
            <motion.nav 
                className="sidebar-shell hidden md:flex flex-col fixed left-0 top-0 h-screen z-50 overflow-hidden bg-[--card-background] tech-grid will-change-[width]"
                style={{ borderColor: `rgba(${primaryRgb}, 0.3)` }}
                animate={{ width: isExpanded ? '16rem' : '5rem' }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
            >
                <div className="h-20 flex items-center justify-start pl-5 relative overflow-hidden shrink-0 z-10">
                    <div className="w-10 flex justify-center">
                         <AnimatedLogo onClick={(e) => handleNavClick(e, '#home')} />
                    </div>
                    
                    <motion.span 
                        className="ml-4 font-['Audiowide'] text-xl text-white whitespace-nowrap absolute left-14"
                        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        PORTFOLIO
                    </motion.span>
                </div>

                <Divider />

                <div className="flex-1 flex flex-col gap-2 px-3 z-10 relative overflow-y-auto no-scrollbar pt-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.href;
                        return (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                onMouseEnter={(e) => handleItemMouseEnter(e, item.text)}
                                className="group relative flex items-center h-12 rounded-lg shrink-0 isolate"
                                whileTap={{ scale: 1 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute inset-0 rounded-lg bg-theme-primary/10 border border-theme-primary/30 shadow-[inset_0_0_15px_rgba(var(--primary-rgb),0.15)] z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-theme-primary rounded-r-md shadow-[0_0_8px_var(--primary-color)]"></div>
                                    </motion.div>
                                )}
                                {!isActive && <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />}
                                
                                <div className="min-w-[3.5rem] h-full flex items-center justify-center relative z-10">
                                    <i 
                                        className={`${item.icon} text-lg transition-all duration-300 ${isActive ? 'text-theme-primary drop-shadow-[0_0_5px_var(--primary-color)]' : 'text-gray-400 group-hover:text-white'}`}
                                        style={{ transform: 'translateZ(0px)' }}
                                    ></i>
                                </div>
                                
                                <motion.span 
                                    className={`whitespace-nowrap font-medium text-sm relative z-10 origin-left ${isActive ? 'text-theme-primary' : 'text-gray-400 group-hover:text-white'}`}
                                    animate={{ 
                                        opacity: isExpanded ? 1 : 0, 
                                        x: isExpanded ? 0 : -10,
                                        fontWeight: isActive ? 700 : 500,
                                        letterSpacing: isActive ? '0.1em' : '0em',
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                    {item.text}
                                </motion.span>
                            </motion.a>
                        );
                    })}
                </div>

                <div className="p-3 z-20 flex flex-col gap-3 mt-auto border-t border-[--card-border-color] bg-black/40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    <div 
                        className="relative h-12 rounded-lg bg-black/20 border border-white/5 overflow-hidden group hover:border-theme-primary/30 transition-all cursor-pointer"
                        onMouseEnter={(e) => handleItemMouseEnter(e, t.switch_language)}
                        onClick={handleLanguageClick}
                    >
                         {isExpanded ? (
                            <div className="w-full h-full flex items-center justify-between px-1 relative">
                                <motion.div 
                                    className="absolute inset-y-1 w-[calc(50%-4px)] bg-theme-primary/20 border border-theme-primary/50 rounded-md shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]"
                                    layout
                                    initial={false}
                                    animate={{ 
                                        left: language === 'en' ? '4px' : 'calc(50% + 2px)',
                                    }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                                <div className={`z-10 w-1/2 text-center text-xs font-bold font-mono transition-colors ${language === 'en' ? 'text-theme-primary' : 'text-gray-500'}`}>EN</div>
                                <div className={`z-10 w-1/2 text-center text-xs font-bold font-mono transition-colors ${language === 'pt-BR' ? 'text-theme-primary' : 'text-gray-500'}`}>PT</div>
                            </div>
                         ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                 <i className="fas fa-globe text-lg text-gray-400 group-hover:text-theme-primary transition-colors"></i>
                            </div>
                         )}
                    </div>

                    <button
                        onClick={handleSettingsClick}
                        onMouseEnter={(e) => handleItemMouseEnter(e, t.config)}
                        className="group relative flex items-center h-12 rounded-lg transition-all duration-300 overflow-hidden w-full hover:bg-white/5"
                        title="Open settings"
                    >
                        <div className="min-w-[3.5rem] h-full flex items-center justify-center relative z-10">
                            <i className="fas fa-cog text-lg text-gray-400 group-hover:text-white transition-colors"></i>
                        </div>
                        <motion.span 
                            className="whitespace-nowrap font-medium text-sm relative z-10 text-gray-400 group-hover:text-white"
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                            transition={{ duration: 0.2, delay: 0.15 }}
                        >
                            {t.config}
                        </motion.span>
                    </button>
                    
                    <button
                        onClick={handlePinClick}
                        onMouseEnter={(e) => handleItemMouseEnter(e, isPinned ? t.pinned : t.pin)}
                        className={`group relative flex items-center h-12 rounded-lg transition-all duration-300 overflow-hidden w-full border ${isPinned ? 'bg-theme-primary/10 border-theme-primary/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                        title={isPinned ? "Unlock sidebar" : "Lock sidebar"}
                    >
                         <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${isPinned ? 'bg-theme-primary shadow-[0_0_8px_var(--primary-color)]' : 'bg-gray-700'}`}></div>

                        <div className="min-w-[3.5rem] h-full flex items-center justify-center relative z-10">
                            <i className={`fas ${isPinned ? 'fa-lock' : 'fa-lock-open'} text-lg transition-all duration-300 ${isPinned ? 'text-theme-primary' : 'text-gray-400 group-hover:text-white'}`}></i>
                        </div>
                        <motion.span 
                            className={`whitespace-nowrap font-medium text-sm relative z-10 ${isPinned ? 'text-theme-primary' : 'text-gray-400 group-hover:text-white'}`}
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                            transition={{ duration: 0.2, delay: 0.15 }}
                        >
                            {isPinned ? t.pinned : t.pin}
                        </motion.span>
                    </button>
                    
                    <motion.div 
                        className="text-[9px] text-gray-600 uppercase tracking-widest whitespace-nowrap overflow-hidden text-center"
                        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        v2.5 // SYS_ACTIVE
                    </motion.div>
                </div>

                <AnimatePresence>
                    {tooltip && (
                        <motion.div
                            className="absolute left-full ml-3 px-3 py-2 bg-black/90 backdrop-blur-md rounded-md text-sm text-white font-medium shadow-xl pointer-events-none z-[60] border border-theme-primary/30"
                            style={{ top: tooltip.top + 6 }}
                            initial={{ opacity: 0, x: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                        >
                            {tooltip.content}
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black/90 border-l border-b border-theme-primary/30 transform rotate-45"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* --- Mobile Bottom Bar (Optimized) --- */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#050505]/90 backdrop-blur-xl border-t border-theme-primary/20 z-50 flex justify-evenly items-center px-1 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="flex flex-col items-center justify-center w-full h-full relative group"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="mobileActiveLine"
                                    className="absolute top-0 w-8 h-0.5 bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
                                />
                            )}
                            <div className="relative">
                                <i className={`${item.icon} text-lg mb-1 transition-all duration-300 ${isActive ? 'text-theme-primary drop-shadow-[0_0_8px_var(--primary-color)] -translate-y-1' : 'text-gray-500 group-hover:text-gray-300'}`}></i>
                            </div>
                        </a>
                    );
                })}
                
                {/* Mobile Settings Button */}
                <button
                    onClick={handleSettingsClick}
                    className="flex flex-col items-center justify-center w-full h-full relative group"
                >
                    <i className="fas fa-cog text-lg mb-1 text-gray-500 group-hover:text-white transition-colors"></i>
                </button>
            </nav>
        </>
    );
};

export default Sidebar;
