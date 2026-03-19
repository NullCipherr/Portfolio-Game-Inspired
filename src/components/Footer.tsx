import React from 'react';
import { motion } from 'framer-motion';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import AnimatedLogo from './AnimatedLogo';
import { translations, Language } from '../config/translations';

const SOCIAL_LINKS = {
    github: "https://github.com/NullCipherr",
    linkedin: "https://www.linkedin.com/in/seu-usuario",
    email: "mailto:seu-email@example.com",
};

interface FooterProps {
    language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
    const t = translations[language].footer;
    const navT = translations[language].nav;

    const QUICK_LINKS = [
        { href: '#about', text: navT.about },
        { href: '#skills', text: navT.skills },
        { href: '#projects', text: navT.projects },
        { href: '#contact', text: navT.contact },
    ];

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleScrollTop = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="relative pt-24 pb-8 px-4">
             <motion.div 
                className="glowing-container relative w-full max-w-7xl mx-auto will-change-[opacity,transform]"
                variants={sectionScrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Main Card */}
                <div className="relative tech-grid z-10 bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] rounded-[28px] p-8 md:p-12 text-white overflow-hidden">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 text-center md:text-left"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Column 1: Brand & Copyright */}
                        <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start">
                             <AnimatedLogo onClick={handleScrollTop} />
                            <p className="mt-4 text-gray-400 text-sm max-w-xs">
                                {t.tagline}
                            </p>
                            <p className="mt-auto pt-8 text-xs text-gray-500 font-mono">
                                &copy; {new Date().getFullYear()} ANDREI COSTA. {t.rights}
                            </p>
                        </motion.div>

                        {/* Column 2: Quick Links */}
                        <motion.div variants={fadeInUp}>
                            <h3 className="font-['Audiowide'] text-lg text-theme-primary uppercase tracking-widest mb-6">{t.nav_title}</h3>
                            <ul className="space-y-3">
                                {QUICK_LINKS.map(link => (
                                    <li key={link.href}>
                                        <a 
                                            href={link.href} 
                                            onClick={(e) => handleScrollTo(e, link.href)}
                                            className="text-gray-300 hover:text-theme-primary hover:drop-shadow-[0_0_5px_var(--primary-color)] transition-all duration-300 group flex items-center gap-2 justify-center md:justify-start"
                                        >
                                           <span className="w-2 h-px bg-gray-500 group-hover:w-4 group-hover:bg-theme-primary transition-all"></span>
                                           <span>{link.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 3: Socials */}
                        <motion.div variants={fadeInUp} className="md:col-span-2 lg:col-span-1">
                            <h3 className="font-['Audiowide'] text-lg text-theme-primary uppercase tracking-widest mb-6">{t.connect_title}</h3>
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-theme-primary/10 hover:border-theme-primary hover:text-theme-primary transition-all duration-300 hover:-translate-y-1" aria-label="GitHub">
                                    <i className="fab fa-github text-xl"></i>
                                </a>
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-theme-primary/10 hover:border-theme-primary hover:text-theme-primary transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin text-xl"></i>
                                </a>
                                <a href={SOCIAL_LINKS.email} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-theme-primary/10 hover:border-theme-primary hover:text-theme-primary transition-all duration-300 hover:-translate-y-1" aria-label="Email">
                                    <i className="fas fa-envelope text-xl"></i>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;