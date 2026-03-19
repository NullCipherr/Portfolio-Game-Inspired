


// FIX: Corrected React import and added necessary hooks and components like useState, useEffect, lazy, and Suspense.
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import LoadingOverlay from './components/LoadingOverlay';
import AnimatedBackground from './components/AnimatedBackground';
import Sidebar from './components/Sidebar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy sections
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ResumeSection = lazy(() => import('./components/ResumeSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

import SettingsModal from './components/SettingsModal';
import SaveConfirmation from './components/SaveConfirmation';
import { AudioProvider } from './hooks/useAudio';
import { usePortfolioSettings } from './hooks/usePortfolioSettings';
import { useScrollController } from './hooks/useScrollController';

const SectionLoader = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    // Custom Hooks
    const { settings, updateSettings, showSavePopup } = usePortfolioSettings();
    const { activeSection, setActiveSection, mainRef } = useScrollController(loading, settings.scrollMode);

    // Sidebar & Mobile State
    const [isSidebarPinned, setIsSidebarPinned] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const isSidebarExpanded = isSidebarPinned || isSidebarHovered;

    useEffect(() => {
        const checkViewport = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsDesktop(width >= 1024);
        };
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) return;
        const handleMouseMove = (event: MouseEvent) => {
            requestAnimationFrame(() => {
                document.body.style.setProperty('--mouse-x', `${event.clientX}px`);
                document.body.style.setProperty('--mouse-y', `${event.clientY}px`);
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [loading]);

    return (
        <MotionConfig transition={settings.animationsEnabled ? undefined : { duration: 0 }}>
            <AudioProvider settings={settings}>
                <div className="relative min-h-screen text-foreground overflow-x-hidden">
                    <AnimatedBackground
                        enabled={settings.particlesEnabled}
                        primaryRgb={settings.primaryRgb}
                        graphicsQuality={settings.graphicsQuality}
                    />

                    <AnimatePresence>
                        {loading && <LoadingOverlay />}
                    </AnimatePresence>

                    <AnimatePresence>
                        {settingsOpen && (
                            <SettingsModal
                                isOpen={settingsOpen}
                                onClose={() => setSettingsOpen(false)}
                                settings={settings}
                                updateSettings={updateSettings}
                                language={settings.language}
                                isMobile={isMobile}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showSavePopup && <SaveConfirmation language={settings.language} />}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {!loading && !settingsOpen && (
                            <motion.div
                                key="main-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex flex-col md:flex-row">
                                    <Sidebar
                                        primaryRgb={settings.primaryRgb}
                                        isPinned={isSidebarPinned}
                                        setPinned={setIsSidebarPinned}
                                        setHovered={setIsSidebarHovered}
                                        language={settings.language}
                                        setLanguage={(lang) => updateSettings('language', lang)}
                                        setSettingsOpen={setSettingsOpen}
                                        activeSection={activeSection}
                                        setActiveSection={setActiveSection}
                                    />

                                    <motion.main
                                        id="content"
                                        ref={mainRef}
                                        className={`flex-1 relative z-10 h-screen overflow-y-auto overflow-x-hidden interactive-glow-bg will-change-[padding] pb-24 md:pb-0 ${settings.scrollMode === 'snap' ? `scroll-snap-container ${settings.scrollSnapBehavior === 'strict' ? 'scroll-snap-strict' : 'scroll-snap-soft'}` : ''}`}
                                        initial={false}
                                        animate={{
                                            paddingLeft: isDesktop ? (isSidebarExpanded ? '16rem' : '5rem') : '0rem'
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                        style={{ scrollBehavior: settings.scrollMode === 'snap' ? 'auto' : 'smooth' }}
                                    >
                                        <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                            <HomeSection language={settings.language} />
                                        </div>
                                        <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                            <AboutSection language={settings.language} />
                                        </div>

                                        <ErrorBoundary>
                                            <Suspense fallback={<SectionLoader />}>
                                                <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                                    <SkillsSection language={settings.language} />
                                                </div>
                                                <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                                    <ProjectsSection language={settings.language} />
                                                </div>
                                                <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                                    <ResumeSection language={settings.language} />
                                                </div>
                                                <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                                    <ContactSection language={settings.language} />
                                                </div>
                                                <div className={settings.scrollMode === 'snap' ? 'scroll-snap-item' : ''}>
                                                    <Footer language={settings.language} />
                                                </div>
                                            </Suspense>
                                        </ErrorBoundary>
                                    </motion.main>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </AudioProvider>
        </MotionConfig>
    );
};

export default App;
