import React from 'react';
import { motion } from 'framer-motion';

interface ScrollDownIndicatorProps {
    targetId: string;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({ targetId }) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.a
            href={targetId}
            onClick={handleScroll}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 group cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            aria-label="Scroll to next section"
        >
            {/* The mouse shape */}
            <div className="w-7 h-11 rounded-full border-2 border-gray-500 group-hover:border-theme-primary transition-colors flex justify-center pt-2">
                {/* The scroll wheel */}
                <motion.div
                    className="w-1 h-2 rounded-full bg-gray-500 group-hover:bg-theme-primary transition-colors"
                    animate={{ y: [0, 8, 0] }} // Animate up and down
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut'
                    }}
                />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-theme-primary transition-colors">Scroll</span>
        </motion.a>
    );
};

export default ScrollDownIndicator;