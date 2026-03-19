import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
}

const CyberImage: React.FC<CyberImageProps> = ({ src, alt, className = "", containerClassName = "" }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${containerClassName}`}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center backdrop-blur-sm"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Loading Skeleton & Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-[scan_2s_linear_infinite]" />
                        
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-t-transparent border-theme-primary rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-theme-primary tracking-widest animate-pulse">
                                LOADING_ASSET...
                            </span>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                animate={{ 
                    scale: isLoading ? 1.1 : 1, 
                    filter: isLoading ? "grayscale(100%)" : "grayscale(0%)" 
                }}
                transition={{ duration: 0.7 }}
            />

            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center border border-red-500/30">
                    <i className="fas fa-exclamation-triangle text-red-500 mb-2 text-2xl"></i>
                    <span className="text-xs text-red-500 font-mono">ASSET_CORRUPTED</span>
                </div>
            )}
        </div>
    );
};

export default CyberImage;