import React from 'react';
import { motion } from 'framer-motion';
import TypingTitle from './TypingTitle';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import { translations, Language } from '../config/translations';
import { useAudio } from '../hooks/useAudio';
import CyberImage from './CyberImage';

const SOCIAL_LINKS = {
    email: 'mailto:seu-email@example.com',
    github: 'https://github.com/NullCipherr',
    linkedin: 'https://www.linkedin.com/in/seu-usuario',
};

interface ContactSectionProps {
    language: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
    const t = translations[language].contact;
    const { playSound } = useAudio();

    const handleScrollTo = (targetSelector: string) => {
        const target = document.querySelector(targetSelector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="contact" className="min-h-screen flex justify-center items-center pt-4 pb-32 px-4 relative">
            <motion.div
                className="glowing-container relative w-full max-w-7xl will-change-[opacity,transform]"
                variants={sectionScrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                <div className="relative z-10 tech-grid bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] text-white rounded-[28px] shadow-2xl w-full flex flex-col lg:flex-row overflow-hidden">
                    <div
                        className="hidden lg:flex items-center justify-center px-8 border-r-2 min-h-[220px]"
                        style={{ borderColor: 'rgba(var(--primary-rgb), 0.2)' }}
                    >
                        <h3 className="font-bold text-fluid-xl transform -rotate-90 tracking-widest uppercase whitespace-nowrap text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]">
                            {t.label}
                        </h3>
                    </div>

                    <div className="flex-grow lg:pl-8 p-6 md:p-10 lg:py-12 flex flex-col justify-center">
                        <motion.div variants={fadeInUp}>
                            <TypingTitle text={t.title} className="text-3xl md:text-fluid-xxl font-bold h-10 md:h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="card-divider w-24 mt-2 mb-6"></motion.div>

                        <motion.p variants={fadeInUp} className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-2xl">
                            {t.desc}
                        </motion.p>

                        <motion.div
                            className="flex flex-col gap-4 max-w-md"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.a
                                variants={fadeInUp}
                                href={SOCIAL_LINKS.email}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-button group"
                                onMouseEnter={() => playSound('hover')}
                            >
                                <i className="fas fa-envelope text-xl group-hover:scale-110 transition-transform"></i>
                                <span className="font-semibold">{t.social.email}</span>
                            </motion.a>

                            <motion.a
                                variants={fadeInUp}
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-button group"
                                onMouseEnter={() => playSound('hover')}
                            >
                                <i className="fab fa-github text-xl group-hover:scale-110 transition-transform"></i>
                                <span className="font-semibold">{t.social.github}</span>
                            </motion.a>

                            <motion.a
                                variants={fadeInUp}
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-button group"
                                onMouseEnter={() => playSound('hover')}
                            >
                                <i className="fab fa-linkedin text-xl group-hover:scale-110 transition-transform"></i>
                                <span className="font-semibold">{t.social.linkedin}</span>
                            </motion.a>
                        </motion.div>
                    </div>

                    <div className="hidden lg:block w-5/12 relative min-h-full bg-black/40 overflow-hidden group border-l border-white/5">
                        <motion.div
                            variants={fadeInUp}
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                            <div className="relative w-full h-full">
                                <CyberImage
                                    src="/contact-hologram.svg"
                                    alt="Contact Gateway Hologram"
                                    className="w-full h-full object-cover opacity-70 filter grayscale contrast-125 brightness-110 mix-blend-screen"
                                    containerClassName="w-full h-full"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.45) 51%)',
                                        backgroundSize: '100% 4px'
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-theme-primary/15 mix-blend-overlay z-20 animate-pulse"></div>
                                <div className="absolute top-0 left-0 w-full h-[10%] bg-theme-primary/30 blur-md animate-[slide-bottom_3s_linear_infinite] z-20 opacity-30"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-30"></div>
                            </div>

                            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-theme-primary shadow-[0_0_10px_var(--primary-color)] rounded-tr-xl z-40 opacity-80"></div>
                            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-theme-primary shadow-[0_0_10px_var(--primary-color)] rounded-bl-xl z-40 opacity-80"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <button
                    onClick={() => handleScrollTo('#home')}
                    className="group flex flex-col items-center gap-2 text-gray-400 hover:text-theme-primary transition-all duration-300"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-theme-primary group-hover:bg-theme-primary/10 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] transition-all">
                        <i className="fas fa-arrow-up text-lg"></i>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest">Top</span>
                </button>
            </motion.div>
        </section>
    );
};

export default ContactSection;
