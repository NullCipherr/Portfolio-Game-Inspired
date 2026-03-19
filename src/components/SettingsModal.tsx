import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CYBER_COLORS, FASHION_COLORS, RETRO_COLORS, CARD_BACKGROUND_COLORS, BACKGROUND_PATTERNS } from '../config/theme';
import { Language, translations } from '../config/translations';
import { useAudio } from '../hooks/useAudio';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        primaryColor: string;
        primaryRgb: string;
        particlesEnabled: boolean;
        soundEnabled: boolean;
        masterVolume: number;
        animationsEnabled: boolean;
        graphicsQuality: 'low' | 'medium' | 'high';
        cardBackgroundOpacity: number;
        cardBackdropBlur: number;
        cardBorderStyle: 'theme' | 'neutral';
        cardBackgroundColor: string;
        backgroundPattern: string;
        language: Language;
        scrollMode: 'snap' | 'free';
        scrollSnapBehavior: 'soft' | 'strict';
    };
    updateSettings: (key: string, value: any) => void;
    language: Language;
    isMobile: boolean;
}

// FIX: Create a shared props interface for all tab components to resolve type conflicts.
// This allows a single render call to be type-safe for multiple components with different prop requirements.
interface TabContentProps {
    t: any;
    settings: SettingsModalProps['settings'];
    updateSettings: SettingsModalProps['updateSettings'];
    playSound: (soundType: any) => void;
    handleToggle: (key: 'soundEnabled' | 'animationsEnabled' | 'particlesEnabled', value: boolean) => void;
    systemInfo: any;
}

type TabId = 'appearance' | 'behavior' | 'customize' | 'sound' | 'data';

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};


const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, updateSettings, language, isMobile }) => {
    const t = translations[language].settings;
    const { playSound } = useAudio();
    const [systemInfo, setSystemInfo] = React.useState<any>(null);

    // State for mobile navigation stack
    const [mobileNav, setMobileNav] = React.useState({ view: 'main' as TabId | 'main', direction: 0 });
    const { view: mobileView, direction } = mobileNav;

    React.useEffect(() => {
        if (isOpen && !systemInfo) {
            setSystemInfo({
                userAgent: navigator.userAgent,
                screenRes: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                platform: navigator.platform,
                cores: navigator.hardwareConcurrency || 'Unknown',
                memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown',
            });
        }
    }, [isOpen, systemInfo]);

    // Reset mobile view when modal is closed/reopened
    React.useEffect(() => {
        if (isOpen) {
            setMobileNav({ view: 'main', direction: 0 });
        }
    }, [isOpen]);

    const handleToggle = (key: 'soundEnabled' | 'animationsEnabled' | 'particlesEnabled', value: boolean) => {
        playSound(value ? 'toggleOn' : 'toggleOff');
        updateSettings(key, value);
    };

    // --- Mobile Navigation Handlers & Variants ---
    const handleMobileNavigate = (target: TabId) => {
        playSound('click');
        setMobileNav({ view: target, direction: 1 });
    };

    const handleMobileBack = () => {
        playSound('close');
        setMobileNav({ view: 'main', direction: -1 });
    };

    const mobilePageVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
        }),
        center: {
            x: '0%',
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
        }),
    };

    // --- Mobile Page Definitions ---
    const settingsPages = [
        { id: 'appearance', label: t.appearance.title, icon: 'fas fa-palette', Component: AppearanceTab },
        { id: 'behavior', label: t.interface.title, icon: 'fas fa-list-alt', Component: InterfaceTab },
        { id: 'customize', label: t.graphics.title, icon: 'fas fa-sliders-h', Component: GraphicsTab },
        { id: 'sound', label: t.audio.title, icon: 'fas fa-volume-up', Component: AudioTab },
        { id: 'data', label: t.system.title, icon: 'fas fa-database', Component: DataControlsTab },
    ];

    const currentPageData = settingsPages.find(p => p.id === mobileView);

    // --- Desktop Tab Definitions ---
    const desktopTabs = [
        { id: 'appearance', label: t.appearance.title, icon: 'fas fa-palette', desc: t.appearance.desc },
        { id: 'graphics', label: t.graphics.title, icon: 'fas fa-desktop', desc: t.graphics.desc },
        { id: 'audio', label: t.audio.title, icon: 'fas fa-volume-up', desc: t.audio.desc },
        { id: 'interface', label: t.interface.title, icon: 'fas fa-mouse', desc: t.interface.desc },
        { id: 'system', label: t.system.title, icon: 'fas fa-microchip', desc: t.system.desc },
    ];
    const [activeDesktopTab, setActiveDesktopTab] = React.useState<string>('appearance');
    const activeDesktopTabInfo = desktopTabs.find(tab => tab.id === activeDesktopTab);

    if (isMobile) {
        return (
            <motion.div
                className="fixed inset-0 z-[100] bg-black"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="w-full h-full flex flex-col text-white">
                    <div className="flex-1 relative overflow-hidden">
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                            <motion.div
                                key={mobileView}
                                custom={direction}
                                variants={mobilePageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
                                className="absolute inset-0 flex flex-col"
                            >
                                {mobileView === 'main' ? (
                                    <>
                                        <header className="p-4 text-center shrink-0">
                                            <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-3"></div>
                                            <h1 className="text-xl font-semibold">Settings</h1>
                                        </header>
                                        <div className="flex-1 overflow-y-auto px-2">
                                            <div className="space-y-1">
                                                {settingsPages.map(page => (
                                                    <button
                                                        key={page.id}
                                                        onClick={() => handleMobileNavigate(page.id as TabId)}
                                                        className="w-full flex items-center justify-between text-left p-4 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <i className={`${page.icon} w-5 text-center text-gray-400`}></i>
                                                            <span className="text-white text-base">{page.label}</span>
                                                        </div>
                                                        <i className="fas fa-chevron-right text-gray-500"></i>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <header className="p-4 flex items-center shrink-0 border-b border-white/10">
                                            <button
                                                onClick={handleMobileBack}
                                                className="relative z-50 text-gray-300 w-10 h-10 flex items-center justify-center -ml-2 hover:bg-white/10 rounded-full"
                                            >
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                            <h1 className="text-xl font-semibold text-center flex-1 -ml-8 pointer-events-none">{currentPageData?.label}</h1>
                                        </header>
                                        <div className="flex-1 overflow-y-auto p-4">
                                            {currentPageData && (
                                                <currentPageData.Component
                                                    t={
                                                        // This mapping is necessary because the mobile page IDs don't perfectly match the translation keys
                                                        (currentPageData.id === 'behavior' ? t.interface :
                                                            currentPageData.id === 'customize' ? t.graphics :
                                                                currentPageData.id === 'data' ? t.system :
                                                                    t[currentPageData.id as keyof typeof t])
                                                    }
                                                    settings={settings}
                                                    updateSettings={updateSettings}
                                                    playSound={playSound}
                                                    handleToggle={handleToggle}
                                                    systemInfo={systemInfo}
                                                />
                                            )}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        );
    }

    // --- DESKTOP MODAL ---
    const DesktopTabContent: React.FC = () => {
        switch (activeDesktopTab) {
            case 'appearance': return <AppearanceTab t={t.appearance} settings={settings} updateSettings={updateSettings} playSound={playSound} />;
            case 'graphics': return <GraphicsTab t={t.graphics} settings={settings} updateSettings={updateSettings} playSound={playSound} handleToggle={handleToggle} />;
            case 'audio': return <AudioTab t={t.audio} settings={settings} updateSettings={updateSettings} playSound={playSound} handleToggle={handleToggle} />;
            case 'interface': return <InterfaceTab t={t.interface} settings={settings} updateSettings={updateSettings} playSound={playSound} />;
            case 'system': return <DataControlsTab t={t.system} systemInfo={systemInfo} />;
            default: return null;
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className="absolute inset-0 tech-grid"
                style={{
                    background: 'radial-gradient(circle at 20% 10%, rgba(var(--primary-rgb), 0.14), transparent 45%), radial-gradient(circle at 80% 90%, rgba(var(--primary-rgb), 0.10), transparent 45%)'
                }}
            />

            <div className="relative z-10 w-full h-full flex flex-col text-white overflow-hidden">
                <header className="h-16 shrink-0 border-b border-white/10 bg-black/40 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            aria-label="Close Settings"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div>
                            <h2 className="font-['Audiowide'] text-lg text-white leading-none">SYSTEM SETTINGS</h2>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-1">Game Menu Interface</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                        aria-label="Close Settings"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </header>

                <div className="flex flex-row flex-grow min-h-0">
                    <nav className="relative flex flex-col p-4 md:p-6 w-[260px] border-r border-white/10 shrink-0 bg-black/45 backdrop-blur-xl">
                        <div className="pb-4 mb-4 border-b border-white/10">
                            <h3 className="font-['Audiowide'] text-base text-white">MENU</h3>
                            <p className="text-xs text-gray-400 mt-1">Calibration Panels</p>
                        </div>
                        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
                            {desktopTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { playSound('click'); setActiveDesktopTab(tab.id); }}
                                    onMouseEnter={() => playSound('hover')}
                                    className="relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 shrink-0 isolate text-left"
                                >
                                    {activeDesktopTab === tab.id && (
                                        <motion.div
                                            layoutId="settings-tab-indicator"
                                            className="absolute inset-0 bg-theme-primary/12 border border-theme-primary/40 rounded-lg z-0 shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <i className={`${tab.icon} w-5 text-center transition-colors ${activeDesktopTab === tab.id ? 'text-theme-primary' : 'text-gray-400'}`}></i>
                                    <span className={`transition-colors ${activeDesktopTab === tab.id ? 'text-white' : 'text-gray-400'}`}>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </nav>

                    <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto no-scrollbar">
                        <div className="w-full max-w-5xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDesktopTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.25, staggerChildren: 0.07 }}
                                >
                                    <header className="mb-8">
                                        <h1 className="text-2xl md:text-3xl font-bold text-white font-['Audiowide']">{activeDesktopTabInfo?.label}</h1>
                                        <p className="text-sm text-gray-400 mt-2">{activeDesktopTabInfo?.desc}</p>
                                        <div
                                            className="mt-4 h-px w-full"
                                            style={{ background: 'linear-gradient(90deg, rgba(var(--primary-rgb), 0.4), rgba(255,255,255,0.1), transparent)' }}
                                        />
                                    </header>
                                    <DesktopTabContent />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

// --- Reusable Tab Content Components ---

const AccountTab: React.FC<Partial<TabContentProps>> = ({ t }) => (
    <div className="space-y-8">
        <motion.section variants={itemVariants} className="bg-white/5 border border-white/5 rounded-lg p-6 text-center">
            <i className="fas fa-user-shield text-4xl text-theme-primary mb-4"></i>
            <h3 className="text-lg font-bold text-white">Account Management</h3>
            <p className="text-gray-400 text-sm mt-2">
                User account settings and profiles are not part of this demonstration.
            </p>
        </motion.section>
    </div>
);

const AppearanceTab: React.FC<Partial<TabContentProps>> = ({ t, settings, updateSettings, playSound }) => {
    if (!settings || !updateSettings || !playSound) return null;
    return (
        <div className="space-y-8">
            <motion.section className="space-y-4" variants={itemVariants}>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.ecosystem_title}</h3>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 max-h-[150px] overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-6 md:grid-cols-10 gap-3 justify-items-center">
                        {[...CYBER_COLORS, ...FASHION_COLORS, ...RETRO_COLORS].map((color) => {
                            const isActive = settings.primaryColor.toLowerCase() === color.value.toLowerCase();
                            return (
                                <motion.button
                                    key={color.name}
                                    onClick={() => { playSound('click'); updateSettings('primaryColor', color); }}
                                    className="w-8 h-8 rounded-full border-2 transition-opacity relative group"
                                    style={{ backgroundColor: color.value, borderColor: isActive ? 'white' : 'transparent', color: color.value }}
                                    title={color.name}
                                    animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.7 }}
                                    whileHover={{ scale: 1.1, opacity: 1 }}
                                >
                                    {isActive && <motion.div layoutId="color-pulse" className="absolute inset-0 rounded-full shadow-[0_0_15px_currentColor] animate-pulse" />}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">{color.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            <motion.section className="space-y-4" variants={itemVariants}>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.texture_title}</h3>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 max-h-[150px] overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {BACKGROUND_PATTERNS.map((pattern) => (
                            <button key={pattern.name} onClick={() => { playSound('click'); updateSettings('backgroundPattern', pattern.name); }} className={`aspect-square rounded-md border-2 transition-all duration-200 relative group overflow-hidden ${settings.backgroundPattern === pattern.name ? 'border-theme-primary bg-theme-primary/10' : 'border-white/10 hover:border-white/50 bg-black/40'}`} title={pattern.name}>
                                <div className="absolute inset-0 w-full h-full opacity-50" style={{ backgroundImage: pattern.css.backgroundImage, backgroundSize: pattern.name === 'Grid' ? '10px 10px' : 'contain', backgroundRepeat: 'repeat', backgroundPosition: 'center' }} />
                            </button>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section className="space-y-4" variants={itemVariants}>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.component_title}</h3>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-400 mb-3">{t.tint_title}</h4>
                        <div className="grid grid-cols-5 gap-3 justify-items-center">
                            {CARD_BACKGROUND_COLORS.map((color) => (
                                <button key={color.name} onClick={() => { playSound('click'); updateSettings('cardBackgroundColor', color.name); }} className={`w-7 h-7 rounded-full border-2 transition-all duration-300 relative group ${settings.cardBackgroundColor === color.name ? 'border-white scale-125' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'}`} style={{ backgroundColor: `rgb(${color.dark})` }} title={color.name} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-400 mb-3">{t.border_title}</h4>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-lg">
                            <button onClick={() => { playSound('click'); updateSettings('cardBorderStyle', 'theme'); }} className={`px-4 py-2 text-[10px] font-bold rounded-md transition-all ${settings.cardBorderStyle === 'theme' ? 'bg-theme-primary text-black' : 'text-gray-400 hover:text-white'}`}>{t.border_theme}</button>
                            <button onClick={() => { playSound('click'); updateSettings('cardBorderStyle', 'neutral'); }} className={`px-4 py-2 text-[10px] font-bold rounded-md transition-all ${settings.cardBorderStyle === 'neutral' ? 'bg-white/80 text-black' : 'text-gray-400 hover:text-white'}`}>{t.border_neutral}</button>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-white font-medium text-sm">{t.opacity_title}</h4>
                                <span className="font-mono text-xs text-theme-primary">{Math.round(settings.cardBackgroundOpacity * 100)}%</span>
                            </div>
                            <input type="range" min="0.1" max="1" step="0.05" value={settings.cardBackgroundOpacity} onChange={(e) => updateSettings('cardBackgroundOpacity', parseFloat(e.target.value))} className="w-full h-1.5 bg-black/30 rounded-lg appearance-none cursor-pointer accent-theme-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-white font-medium text-sm">{t.blur_title}</h4>
                                <span className="font-mono text-xs text-theme-primary">{settings.cardBackdropBlur}px</span>
                            </div>
                            <input type="range" min="0" max="20" step="1" value={settings.cardBackdropBlur} onChange={(e) => updateSettings('cardBackdropBlur', parseInt(e.target.value))} className="w-full h-1.5 bg-black/30 rounded-lg appearance-none cursor-pointer accent-theme-primary" />
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
};

const GraphicsTab: React.FC<Partial<TabContentProps>> = ({ t, settings, updateSettings, playSound, handleToggle }) => {
    if (!settings || !updateSettings || !playSound || !handleToggle) return null;
    return (
        <div className="space-y-8">
            <motion.div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-6" variants={itemVariants}>
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div>
                        <h3 className="text-white font-medium">{t.particles_title}</h3>
                        <p className="text-gray-500 text-xs mt-1">{t.particles_desc}</p>
                    </div>
                    <button onClick={() => handleToggle('particlesEnabled', !settings.particlesEnabled)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.particlesEnabled ? 'bg-theme-primary' : 'bg-white/10'}`}>
                        <motion.div layout className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md" style={{ left: settings.particlesEnabled ? '1.6rem' : '0.25rem' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                    </button>
                </div>
                <div>
                    <h3 className="text-white font-medium mb-4">{t.density_title}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {['low', 'medium', 'high'].map((q) => (
                            <button key={q} onClick={() => { playSound('click'); updateSettings('graphicsQuality', q); }} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${settings.graphicsQuality === q ? 'bg-theme-primary/20 border-theme-primary text-white' : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'}`}>
                                <span className="uppercase text-xs font-bold tracking-widest">{q}</span>
                                <span className="text-[10px] opacity-60 mt-1">{t[`density_${q}`]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
};

const AudioTab: React.FC<Partial<TabContentProps>> = ({ t, settings, updateSettings, playSound, handleToggle }) => {
    if (!settings || !updateSettings || !playSound || !handleToggle) return null;
    return (
        <div className="space-y-8">
            <motion.div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-6" variants={itemVariants}>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-medium">{t.sound_title}</h3>
                        <p className="text-gray-500 text-xs mt-1">{t.sound_desc}</p>
                    </div>
                    <button onClick={() => handleToggle('soundEnabled', !settings.soundEnabled)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.soundEnabled ? 'bg-theme-primary' : 'bg-white/10'}`}>
                        <motion.div layout className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md" style={{ left: settings.soundEnabled ? '1.6rem' : '0.25rem' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                    </button>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-medium text-sm">{t.volume_title}</h4>
                        <span className="font-mono text-xs text-theme-primary">{Math.round(settings.masterVolume * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="1" step="0.01" value={settings.masterVolume} onChange={(e) => updateSettings('masterVolume', parseFloat(e.target.value))} className="w-full h-1.5 bg-black/30 rounded-lg appearance-none cursor-pointer accent-theme-primary" />
                </div>
            </motion.div>
            <motion.div className="bg-white/5 border border-white/5 rounded-lg p-6" variants={itemVariants}>
                <h3 className="text-white font-medium mb-4">{t.language_title}</h3>
                <div className="w-full relative">
                    <select value={settings.language} onChange={(e) => { playSound('click'); updateSettings('language', e.target.value); }} className="w-full h-11 bg-black/30 rounded-lg px-4 text-white border border-white/10 appearance-none focus:border-theme-primary outline-none cursor-pointer">
                        <option value="en">English (US)</option>
                        <option value="pt-BR">Português (Brasil)</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
            </motion.div>
        </div>
    )
};

const InterfaceTab: React.FC<Partial<TabContentProps>> = ({ t, settings, updateSettings, playSound }) => {
    if (!settings || !updateSettings || !playSound) return null;
    return (
        <div className="space-y-8">
            <motion.div className="bg-white/5 border border-white/5 rounded-lg p-6" variants={itemVariants}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-white font-medium">{t.scroll_mode_title}</h3>
                        <p className="text-gray-500 text-xs mt-1">{t.scroll_mode_desc}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => { playSound('click'); updateSettings('scrollMode', 'snap'); }}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${settings.scrollMode === 'snap' ? 'bg-theme-primary/20 border-theme-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'}`}
                    >
                        <i className="fas fa-film text-2xl mb-3"></i>
                        <span className="uppercase text-xs font-bold tracking-widest">{t.mode_cinematic}</span>
                    </button>
                    <button
                        onClick={() => { playSound('click'); updateSettings('scrollMode', 'free'); }}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${settings.scrollMode === 'free' ? 'bg-theme-primary/20 border-theme-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'}`}
                    >
                        <i className="fas fa-arrows-alt-v text-2xl mb-3"></i>
                        <span className="uppercase text-xs font-bold tracking-widest">{t.mode_free}</span>
                    </button>
                </div>
            </motion.div>

            {settings.scrollMode === 'snap' && (
                <motion.div className="bg-white/5 border border-white/5 rounded-lg p-6" variants={itemVariants}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-medium">{t.snap_style_title}</h3>
                            <p className="text-gray-500 text-xs mt-1">{t.snap_style_desc}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => { playSound('click'); updateSettings('scrollSnapBehavior', 'soft'); }}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${settings.scrollSnapBehavior === 'soft' ? 'bg-theme-primary/20 border-theme-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'}`}
                        >
                            <i className="fas fa-feather-alt text-2xl mb-3"></i>
                            <span className="uppercase text-xs font-bold tracking-widest">{t.snap_style_soft}</span>
                        </button>
                        <button
                            onClick={() => { playSound('click'); updateSettings('scrollSnapBehavior', 'strict'); }}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${settings.scrollSnapBehavior === 'strict' ? 'bg-theme-primary/20 border-theme-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'}`}
                        >
                            <i className="fas fa-bullseye text-2xl mb-3"></i>
                            <span className="uppercase text-xs font-bold tracking-widest">{t.snap_style_strict}</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
};

const DataControlsTab: React.FC<Partial<TabContentProps>> = ({ t, systemInfo }) => (
    <div className="space-y-6">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3" variants={itemVariants}>
            {[
                { label: t.resolution, value: systemInfo?.screenRes },
                { label: t.cores, value: systemInfo?.cores },
                { label: t.platform, value: systemInfo?.platform },
                { label: t.memory, value: systemInfo?.memory },
            ].map(item => (
                <div key={item.label} className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white font-mono text-base">{item.value}</div>
                </div>
            ))}
        </motion.div>
        <motion.div className="bg-black/30 rounded-lg p-3 font-mono text-[11px] text-gray-400 break-all border border-white/5" variants={itemVariants}>
            <div className="mb-2 text-theme-primary text-xs">{t.userAgent}</div>
            {systemInfo?.userAgent}
        </motion.div>
    </div>
);

export default SettingsModal;
