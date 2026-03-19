


import { useState, useEffect, useRef } from 'react';
import { CARD_BACKGROUND_COLORS, BACKGROUND_PATTERNS } from '../config/theme';
import { Language } from '../config/translations';

const DEFAULT_SETTINGS = {
    primaryColor: '#00E5FF',
    primaryRgb: '0, 229, 255',
    particlesEnabled: true,
    soundEnabled: true,
    masterVolume: 0.5,
    animationsEnabled: true,
    graphicsQuality: 'high' as 'low' | 'medium' | 'high',
    cardBackgroundOpacity: 0.5,
    cardBackdropBlur: 4,
    cardBorderStyle: 'theme' as 'theme' | 'neutral',
    cardBackgroundColor: 'Default',
    backgroundPattern: 'Grid',
    language: 'en' as Language,
    scrollMode: 'snap' as 'snap' | 'free', // New UX Feature
};

const loadSettings = () => {
    try {
        const savedSettings = localStorage.getItem('portfolio-settings');
        if (savedSettings) {
            // Merge with default to ensure new keys (like scrollMode) exist if old config is loaded
            return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
    return DEFAULT_SETTINGS;
};

export const usePortfolioSettings = () => {
    const [settings, setSettings] = useState(loadSettings);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const debounceTimeout = useRef<number | null>(null);
    const isInitialMount = useRef(true);

    // --- Persist Settings ---
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = window.setTimeout(() => {
            try {
                localStorage.setItem('portfolio-settings', JSON.stringify(settings));
                setShowSavePopup(true);
                setTimeout(() => setShowSavePopup(false), 3000);
            } catch (error) {
                console.error("Failed to save settings:", error);
            }
        }, 500);

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [settings]);

    // --- Apply CSS Variables ---
    useEffect(() => {
        const root = document.documentElement;
        const isDarkMode = root.classList.contains('dark');

        root.style.setProperty('--primary-color', settings.primaryColor);
        root.style.setProperty('--primary-rgb', settings.primaryRgb);
        root.style.setProperty('--border-color-1', settings.primaryColor);
        root.style.setProperty('--border-color-2', settings.primaryColor);
        root.style.setProperty('--border-color-3', settings.primaryColor);
        
        const borderColor = settings.cardBorderStyle === 'theme' 
            ? `rgba(${settings.primaryRgb}, 0.2)`
            : 'var(--card-neutral-border-color)';
        root.style.setProperty('--card-border-color', borderColor);

        root.style.setProperty('--card-background-opacity', String(settings.cardBackgroundOpacity));
        root.style.setProperty('--card-backdrop-blur', `${settings.cardBackdropBlur}px`);

        const selectedCardBg = CARD_BACKGROUND_COLORS.find(c => c.name === settings.cardBackgroundColor) || CARD_BACKGROUND_COLORS[0];
        root.style.setProperty('--card-background-rgb', isDarkMode ? selectedCardBg.dark : selectedCardBg.light);

        const selectedPattern = BACKGROUND_PATTERNS.find(p => p.name === settings.backgroundPattern) || BACKGROUND_PATTERNS[0];
        root.style.setProperty('--ui-background-pattern-image', selectedPattern.css.backgroundImage);
        root.style.setProperty('--ui-background-pattern-size', selectedPattern.css.backgroundSize);
        root.style.setProperty('--ui-background-pattern-opacity', selectedPattern.css.opacity);

    }, [settings]);

    const handleUpdateSettings = (key: string, value: any) => {
        if (key === 'primaryColor') {
            setSettings((prev: any) => ({
                ...prev,
                primaryColor: value.value,
                primaryRgb: value.rgb
            }));
        } else {
            setSettings((prev: any) => ({ ...prev, [key]: value }));
        }
    };

    return {
        settings,
        setSettings,
        updateSettings: handleUpdateSettings,
        showSavePopup
    };
};
