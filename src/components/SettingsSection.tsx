import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CYBER_COLORS, FASHION_COLORS, RETRO_COLORS, CARD_BACKGROUND_COLORS, BACKGROUND_PATTERNS } from '../config/theme';
import { Language, translations } from '../config/translations';
import { useAudio } from '../hooks/useAudio';
import TypingTitle from './TypingTitle';
import ScrollDownIndicator from './ScrollDownIndicator';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';


interface SettingsSectionProps {
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
    };
    updateSettings: (key: string, value: any) => void;
    language: Language;
}

type TabId = 'appearance' | 'graphics' | 'audio' | 'system';

const SettingsSection: React.FC<SettingsSectionProps> = ({ settings, updateSettings, language }) => {
    const t = translations[language].settings;
    const { playSound } = useAudio();
    const [activeTab, setActiveTab] = useState<TabId>('appearance');
    const [systemInfo, setSystemInfo] = useState<any>(null);

    // Fetch Fake System Info on Mount
    useEffect(() => {
        setSystemInfo({
            userAgent: navigator.userAgent,
            screenRes: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            platform: navigator.platform,
            cores: navigator.hardwareConcurrency || 'Unknown',
            memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown',
        });
    }, []);

    const tabs = [
        { id: 'appearance', label: t.appearance.title, icon: 'fas fa-palette' },
        { id: 'graphics', label: t.graphics.title, icon: 'fas fa-desktop' },
        { id: 'audio', label: t.audio.title, icon: 'fas fa-volume-up' },
        { id: 'system', label: t.system.title, icon: 'fas fa-microchip' },
    ];

    const handleTabClick = (tabId: TabId) => {
        playSound('click');
        setActiveTab(tabId);
    };
    
    const handleToggle = (key: 'soundEnabled' | 'animationsEnabled' | 'particlesEnabled', value: boolean) => {
        playSound(value ? 'toggleOn' : 'toggleOff');
        updateSettings(key, value);
    };

    const TabContent: React.FC = () => {
        switch(activeTab) {
            case 'appearance': return <AppearanceTab t={t.appearance} settings={settings} updateSettings={updateSettings} playSound={playSound} />;
            case 'graphics': return <GraphicsTab t={t.graphics} settings={settings} updateSettings={updateSettings} playSound={playSound} handleToggle={handleToggle} />;
            case 'audio': return <AudioTab t={t.audio} settings={settings} updateSettings={updateSettings} playSound={playSound} handleToggle={handleToggle} />;
            case 'system': return <SystemTab t={t.system} systemInfo={systemInfo} />;
            default: return null;
        }
    };

    return (
        <section id="settings" className="min-h-screen flex justify-center items-center pt-4 pb-32 px-4 relative">
            <motion.div 
                className="glowing-container relative w-full max-w-7xl will-change-[opacity,transform]"
                variants={sectionScrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="relative z-10 tech-grid bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] text-white rounded-[28px] shadow-2xl w-full flex flex-col md:flex-row overflow-hidden min-h-[700px]">
                    
                    <div className="flex-1 flex flex-col md:flex-row p-6 sm:p-8 md:p-12">
                        <div 
                            className="hidden md:flex items-center justify-center pr-4 md:pr-8 border-r-2 min-h-[300px]"
                            style={{ borderColor: 'rgba(var(--primary-rgb), 0.2)' }}
                        >
                            <h3 className="font-bold text-fluid-xl transform -rotate-90 tracking-widest uppercase whitespace-nowrap text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]">
                                {t.label}
                            </h3>
                        </div>

                        <motion.div 
                            className="flex-grow md:pl-8 flex flex-col"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.div variants={fadeInUp}>
                                <TypingTitle text={t.title} className="text-fluid-xxl font-bold h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="card-divider w-24 mt-2 mb-6"></motion.div>

                            <motion.p variants={fadeInUp} className="text-gray-300 leading-relaxed max-w-3xl mb-8">
                                {t.desc}
                            </motion.p>
                            
                            {/* Tabbed Interface */}
                            <div className="flex-grow flex flex-col md:flex-row gap-8">
                                <nav className="flex flex-row md:flex-col gap-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id as TabId)}
                                            onMouseEnter={() => playSound('hover')}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                activeTab === tab.id 
                                                ? 'bg-theme-primary/10 text-theme-primary shadow-[inset_0_0_0_1px_rgba(var(--primary-rgb),0.3)]' 
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <i className={`${tab.icon} w-5 text-center`}></i>
                                            <span className="hidden md:inline">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                                <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-6 min-h-[300px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <TabContent />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            <ScrollDownIndicator targetId="#contact" />
        </section>
    );
};


// --- Sub-components for each tab for better organization ---

const AppearanceTab: React.FC<{ t: any, settings: any, updateSettings: any, playSound: any }> = ({ t, settings, updateSettings, playSound }) => (
    <div className="space-y-8">
        <header>
            <h2 className="text-lg font-bold text-white mb-1">{t.title}</h2>
            <p className="text-gray-400 text-xs">{t.desc}</p>
        </header>
        
        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.ecosystem_title}</h3>
            <div className="bg-white/5 border border-white/5 rounded-lg p-4 max-h-[150px] overflow-y-auto">
                <div className="grid grid-cols-6 md:grid-cols-10 gap-3 justify-items-center">
                    {[...CYBER_COLORS, ...FASHION_COLORS, ...RETRO_COLORS].map((color) => (
                        <button key={color.name} onClick={() => { playSound('click'); updateSettings('primaryColor', color); }} className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative group ${ settings.primaryColor.toLowerCase() === color.value.toLowerCase() ? 'border-white scale-110 shadow-[0_0_15px_currentColor]' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-110' }`} style={{ backgroundColor: color.value, color: color.value }} title={color.name}>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>

        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.texture_title}</h3>
             <div className="bg-white/5 border border-white/5 rounded-lg p-4 max-h-[150px] overflow-y-auto">
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {BACKGROUND_PATTERNS.map((pattern) => (
                        <button key={pattern.name} onClick={() => { playSound('click'); updateSettings('backgroundPattern', pattern.name); }} className={`aspect-square rounded-md border-2 transition-all duration-200 relative group overflow-hidden ${ settings.backgroundPattern === pattern.name ? 'border-theme-primary bg-theme-primary/10' : 'border-white/10 hover:border-white/50 bg-black/40'}`} title={pattern.name}>
                            <div className="absolute inset-0 w-full h-full opacity-50" style={{ backgroundImage: pattern.css.backgroundImage, backgroundSize: pattern.name === 'Grid' ? '10px 10px' : 'contain', backgroundRepeat: 'repeat', backgroundPosition: 'center' }} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{t.component_title}</h3>
            <div className="bg-white/5 border border-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-sm font-bold text-gray-400 mb-3">{t.tint_title}</h4>
                    <div className="grid grid-cols-5 gap-3 justify-items-center">
                    {CARD_BACKGROUND_COLORS.map((color) => (
                        <button key={color.name} onClick={() => { playSound('click'); updateSettings('cardBackgroundColor', color.name); }} className={`w-7 h-7 rounded-full border-2 transition-all duration-300 relative group ${ settings.cardBackgroundColor === color.name ? 'border-white scale-125' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110' }`} style={{ backgroundColor: `rgb(${color.dark})`}} title={color.name}/>
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
        </section>
    </div>
);

const GraphicsTab: React.FC<{ t: any, settings: any, updateSettings: any, playSound: any, handleToggle: any }> = ({ t, settings, updateSettings, playSound, handleToggle }) => (
    <div className="space-y-8">
        <header>
            <h2 className="text-lg font-bold text-white mb-1">{t.title}</h2>
            <p className="text-gray-400 text-xs">{t.desc}</p>
        </header>
        <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                    <h3 className="text-white font-medium">{t.particles_title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{t.particles_desc}</p>
                </div>
                <button onClick={() => handleToggle('particlesEnabled', !settings.particlesEnabled)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.particlesEnabled ? 'bg-theme-primary' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${settings.particlesEnabled ? 'left-6' : 'left-1'}`}></div>
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
        </div>
    </div>
);

const AudioTab: React.FC<{ t: any, settings: any, updateSettings: any, playSound: any, handleToggle: any }> = ({ t, settings, updateSettings, playSound, handleToggle }) => (
     <div className="space-y-8">
        <header>
            <h2 className="text-lg font-bold text-white mb-1">{t.title}</h2>
            <p className="text-gray-400 text-xs">{t.desc}</p>
        </header>
        <div className="bg-white/5 border border-white/5 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-white font-medium">{t.sound_title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{t.sound_desc}</p>
                </div>
                <button onClick={() => handleToggle('soundEnabled', !settings.soundEnabled)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.soundEnabled ? 'bg-theme-primary' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${settings.soundEnabled ? 'left-6' : 'left-1'}`}></div>
                </button>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <h4 className="text-white font-medium text-sm">{t.volume_title}</h4>
                    <span className="font-mono text-xs text-theme-primary">{Math.round(settings.masterVolume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.01" value={settings.masterVolume} onChange={(e) => updateSettings('masterVolume', parseFloat(e.target.value))} className="w-full h-1.5 bg-black/30 rounded-lg appearance-none cursor-pointer accent-theme-primary"/>
            </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-lg p-6">
            <h3 className="text-white font-medium mb-4">{t.language_title}</h3>
            <div className="w-full relative">
                <select value={settings.language} onChange={(e) => { playSound('click'); updateSettings('language', e.target.value); }} className="w-full h-11 bg-black/30 rounded-lg px-4 text-white border border-white/10 appearance-none focus:border-theme-primary outline-none cursor-pointer">
                    <option value="en">English (US)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
        </div>
    </div>
);

const SystemTab: React.FC<{ t: any, systemInfo: any }> = ({ t, systemInfo }) => (
    <div className="space-y-8">
        <header>
            <h2 className="text-lg font-bold text-white mb-1">{t.title}</h2>
            <p className="text-gray-400 text-xs">{t.desc}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        </div>
        <div className="bg-black/30 rounded-lg p-3 font-mono text-[11px] text-gray-400 break-all border border-white/5">
            <div className="mb-2 text-theme-primary text-xs">{t.userAgent}</div>
            {systemInfo?.userAgent}
        </div>
    </div>
);

export default SettingsSection;