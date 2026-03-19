import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../config/translations';

interface SaveConfirmationProps {
    language: Language;
}

const SaveConfirmation: React.FC<SaveConfirmationProps> = ({ language }) => {
    const t = translations[language].saveConfirmation;

    return (
        <motion.div
            layout
            className="fixed bottom-4 right-4 z-[9999] w-full max-w-sm p-1 glowing-container"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            <div className="relative z-10 tech-grid bg-black/40 backdrop-blur-xl border border-theme-primary/30 text-white rounded-[26px] w-full flex items-center gap-4 p-4 overflow-hidden">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-primary/10 border border-theme-primary/30">
                    <i className="fas fa-check-circle text-theme-primary text-xl"></i>
                </div>
                <div>
                    <h3 className="font-bold font-['Audiowide'] text-sm uppercase tracking-wider text-white">{t.title}</h3>
                    <p className="text-xs text-gray-400">{t.message}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default SaveConfirmation;