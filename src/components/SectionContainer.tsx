import React from 'react';
import { motion } from 'framer-motion';
import { sectionScrollVariant } from './motion/variants';

interface SectionContainerProps {
    children: React.ReactNode;
    maxWidth?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, maxWidth = 'max-w-3xl' }) => {
    return (
        <motion.div 
            className={`glowing-container relative w-full ${maxWidth} will-change-[opacity,transform]`}
            variants={sectionScrollVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="relative tech-grid z-10 bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] rounded-[28px] p-8 md:p-12 text-center leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
};

export default SectionContainer;