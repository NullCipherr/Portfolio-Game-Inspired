import { Variants } from 'framer-motion';

// ==========================================
// Performance Optimized Variants
// ==========================================

const FAST_DURATION = 0.5;

export const fadeInZoom: Variants = {
    hidden: { 
        opacity: 0,
        // Removed scale to improve performance
    },
    visible: { 
        opacity: 1, 
        transition: {
            duration: FAST_DURATION,
            ease: "easeOut"
        }
    },
};

// Optimized for scrolling heavy cards with backdrop-filter
export const sectionScrollVariant: Variants = {
    hidden: { 
        opacity: 0,
        y: 30, // Reduced distance for less pixel travel
        willChange: "transform, opacity" // Hint to browser to promote to layer
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98] // Custom "smooth out" curve
        }
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08, // Slightly increased delay to reduce concurrent paints
            delayChildren: 0.05
        },
    },
};

export const fadeInUp: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: FAST_DURATION,
            ease: "easeOut"
        }
    },
};

export const projectCardVariants: Variants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        },
    },
};