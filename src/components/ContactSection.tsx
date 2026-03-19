import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingTitle from './TypingTitle';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import { translations, Language } from '../config/translations';
import { useAudio } from '../hooks/useAudio';

const SOCIAL_LINKS = {
    github: "https://github.com/NullCipherr",
    linkedin: "https://www.linkedin.com/in/seu-usuario",
    email: "mailto:seu-email@example.com",
};

interface ContactSectionProps {
    language: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
    const t = translations[language].contact;
    const { playSound } = useAudio();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sendStatus !== 'idle') return;

        playSound('click');
        setSendStatus('sending');

        setTimeout(() => {
            setSendStatus('sent');
            playSound('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => {
                setSendStatus('idle');
            }, 3000);
        }, 2000);
    };

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
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="relative z-10 tech-grid bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] text-white rounded-[28px] shadow-2xl w-full flex flex-col md:flex-row p-6 md:p-12 overflow-hidden">
                    
                    {/* Vertical Label (Desktop Only) */}
                    <div 
                        className="hidden md:flex items-center justify-center pr-8 border-r-2 min-h-[250px]"
                        style={{ borderColor: 'rgba(var(--primary-rgb), 0.2)' }}
                    >
                        <h3 className="font-bold text-fluid-xl transform -rotate-90 tracking-widest uppercase whitespace-nowrap text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]">
                            {t.label}
                        </h3>
                    </div>

                    <div className="flex-grow md:pl-8 flex flex-col lg:flex-row gap-8 lg:gap-0 relative">
                        
                        {/* LEFT COLUMN: Info & Socials */}
                        <div className="flex-1 flex flex-col justify-center relative z-10">
                            <motion.div variants={fadeInUp}>
                                <TypingTitle text={t.title} className="text-3xl md:text-fluid-xxl font-bold h-10 md:h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="card-divider w-24 mt-2 mb-6"></motion.div>

                            <motion.p variants={fadeInUp} className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-md">
                                {t.desc}
                            </motion.p>
                            
                            <motion.div 
                                className="flex flex-col gap-4 mt-auto max-w-xs"
                                variants={staggerContainer}
                            >
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
                            </motion.div>
                        </div>

                        {/* CENTRAL DIVIDER (Desktop Only) */}
                        <div className="hidden lg:flex flex-col items-center justify-center mx-8 relative">
                            <div className="w-[1px] h-full" style={{ background: 'linear-gradient(to bottom, transparent, rgba(var(--primary-rgb), 0.5), transparent)' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-theme-primary shadow-[0_0_15px_var(--primary-color)] animate-pulse"></div>
                        </div>

                        {/* RIGHT COLUMN: Form */}
                        <div className="flex-1 flex flex-col justify-center relative z-10 pt-8 lg:pt-0 border-t border-white/10 lg:border-t-0 mt-4 lg:mt-0">
                            
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-6 opacity-70">
                                    <div className="w-2 h-2 bg-theme-primary rounded-full animate-ping"></div>
                                    <span className="font-mono text-xs text-theme-primary tracking-widest uppercase">{t.form.header}</span>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {['name', 'email', 'message'].map((field) => (
                                        <div key={field} className="group relative">
                                            <div className="absolute -top-3 left-2 px-2 bg-transparent text-xs text-theme-primary font-mono z-10">
                                                <span className="bg-black/80 px-1">{t.form[`${field}_label` as keyof typeof t.form]}</span>
                                            </div>
                                            {field === 'message' ? (
                                                <textarea 
                                                    rows={4}
                                                    required
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white outline-none focus:border-theme-primary/60 transition-all font-mono resize-none text-sm"
                                                    value={formState[field as keyof typeof formState]}
                                                    onChange={(e) => setFormState({...formState, [field]: e.target.value})}
                                                />
                                            ) : (
                                                <input 
                                                    type={field === 'email' ? 'email' : 'text'}
                                                    required
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white outline-none focus:border-theme-primary/60 transition-all font-mono text-sm"
                                                    value={formState[field as keyof typeof formState]}
                                                    onChange={(e) => setFormState({...formState, [field]: e.target.value})}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <button 
                                        type="submit"
                                        disabled={sendStatus !== 'idle'}
                                        className="relative w-full h-14 bg-theme-primary/10 border border-theme-primary/30 rounded-lg overflow-hidden group hover:bg-theme-primary/20 transition-all"
                                        onMouseEnter={() => playSound('hover')}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <AnimatePresence mode="wait">
                                                {sendStatus === 'idle' && (
                                                    <motion.div
                                                        key="idle"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="flex items-center gap-3 font-bold uppercase tracking-wider text-theme-primary"
                                                    >
                                                        <span>{t.form.btn_idle}</span>
                                                        <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                                                    </motion.div>
                                                )}

                                                {sendStatus === 'sending' && (
                                                    <motion.div
                                                        key="sending"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="w-full h-full relative"
                                                    >
                                                        <div className="absolute left-0 top-0 h-full bg-theme-primary/20 w-full animate-pulse"></div>
                                                        <div className="absolute left-0 top-0 h-full w-2 bg-theme-primary blur-[5px] animate-[slide-right_1s_linear_infinite]"></div>
                                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white z-10">
                                                            {t.form.btn_sending}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {sendStatus === 'sent' && (
                                                    <motion.div
                                                        key="sent"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-wider"
                                                    >
                                                        <i className="fas fa-check-circle"></i>
                                                        <span>{t.form.btn_sent}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </button>
                                </form>
                            </div>

                        </div>
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