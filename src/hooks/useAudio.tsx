
import React, { createContext, useContext, useRef, useEffect, useCallback } from 'react';

// --- Type Definitions ---
export type SoundType = 'click' | 'hover' | 'toggleOn' | 'toggleOff' | 'open' | 'close' | 'success';

interface AudioContextType {
    playSound: (soundType: SoundType) => void;
}

interface AudioProviderProps {
    children: React.ReactNode;
    settings: {
        soundEnabled: boolean;
        masterVolume: number;
    };
}

// --- Context Definition ---
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// --- Audio Generation Logic (Web Audio API) ---
const useProvideAudio = (settings: AudioProviderProps['settings']) => {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const isInitialized = useRef<boolean>(false);

    const { soundEnabled, masterVolume } = settings;

    // Function to initialize the AudioContext, must be called after a user interaction
    const initializeAudio = useCallback(() => {
        if (!isInitialized.current && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const context = new AudioContext();
                const gain = context.createGain();
                gain.connect(context.destination);
                
                audioCtxRef.current = context;
                masterGainRef.current = gain;
                isInitialized.current = true;
            }
        }
    }, []);

    // Effect to handle master volume changes
    useEffect(() => {
        if (masterGainRef.current) {
            masterGainRef.current.gain.setValueAtTime(masterVolume, audioCtxRef.current?.currentTime || 0);
        }
    }, [masterVolume]);

    // The core function to play sounds
    const playSound = useCallback((soundType: SoundType) => {
        // Must be initialized by user gesture first
        initializeAudio();
        
        const audioCtx = audioCtxRef.current;
        const masterGain = masterGainRef.current;

        if (!soundEnabled || !audioCtx || !masterGain) return;
        
        // Ensure context is running
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(masterGain);

        switch (soundType) {
            case 'hover':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(120, now);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'click':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1000, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            
            case 'toggleOn':
                osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, now);
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'toggleOff':
                osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, now);
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'open':
                osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.001, now);
                gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'close':
                osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.001, now);
                gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            
            case 'success':
                 // A simple two-note chime
                gainNode.gain.setValueAtTime(0.3, now);
                osc.frequency.setValueAtTime(523.25, now); // C5
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                
                const osc2 = audioCtx.createOscillator();
                osc2.type = 'sine';
                osc2.connect(gainNode);
                osc2.frequency.setValueAtTime(783.99, now + 0.1); // G5
                
                osc.start(now);
                osc2.start(now + 0.1);
                osc.stop(now + 0.3);
                osc2.stop(now + 0.3);
                break;
        }

    }, [soundEnabled, initializeAudio]);

    // Effect to add a one-time event listener to initialize the audio context on user interaction
    useEffect(() => {
        const initListener = () => {
            initializeAudio();
            window.removeEventListener('click', initListener);
            window.removeEventListener('keydown', initListener);
        };

        window.addEventListener('click', initListener);
        window.addEventListener('keydown', initListener);

        return () => {
            window.removeEventListener('click', initListener);
            window.removeEventListener('keydown', initListener);
        };
    }, [initializeAudio]);


    return { playSound };
};

// --- Provider Component ---
export const AudioProvider: React.FC<AudioProviderProps> = ({ children, settings }) => {
    const audio = useProvideAudio(settings);
    return <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>;
};

// --- Consumer Hook ---
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
