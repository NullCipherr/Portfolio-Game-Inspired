import React from 'react';
import { motion } from 'framer-motion';
import ActionButton from './ActionButton';
import TypingTitle from './TypingTitle';
import ScrollDownIndicator from './ScrollDownIndicator';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import { translations, Language } from '../config/translations';
import CyberImage from './CyberImage';

const RESUME_PATH = '/resume.pdf'; 
const RESUME_FILENAME = 'Andrei_Costa_Resume.pdf';

interface ResumeSectionProps {
    language: Language;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ language }) => {
    const t = translations[language].resume;
    
    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = RESUME_PATH;
        link.download = RESUME_FILENAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="resume" className="min-h-screen flex justify-center items-center pt-4 pb-32 px-4 relative">
             <motion.div 
                className="glowing-container relative w-full max-w-7xl will-change-[opacity,transform]"
                variants={sectionScrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Mobile: Flex-col, Desktop: Flex-row */}
                <div className="relative z-10 tech-grid bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] text-white rounded-[28px] shadow-2xl w-full flex flex-col lg:flex-row overflow-hidden">
                    
                    {/* Left Column: Content */}
                    <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 order-2 lg:order-1">
                        {/* Vertical Label (Desktop Only) */}
                        <div 
                            className="hidden lg:flex items-center justify-center pr-8 border-r-2 min-h-[300px]"
                            style={{ borderColor: 'rgba(var(--primary-rgb), 0.2)' }}
                        >
                            <h3 className="font-bold text-fluid-xl transform -rotate-90 tracking-widest uppercase whitespace-nowrap text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]">
                                {t.label}
                            </h3>
                        </div>

                        {/* Main Content Area */}
                        <motion.div 
                            className="flex-grow md:pl-8 flex flex-col justify-center"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.div variants={fadeInUp}>
                                <TypingTitle text={t.title} className="text-3xl md:text-fluid-xxl font-bold h-10 md:h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="card-divider w-24 mt-2 mb-6"></motion.div>

                            <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl">
                                 <motion.p variants={fadeInUp}>
                                    {t.p1}
                                </motion.p>
                                
                                <motion.p variants={fadeInUp} className="text-justify border-l-2 pl-4 bg-black/10 py-2 pr-2 rounded-r-lg" style={{ borderColor: 'rgba(var(--primary-rgb), 0.3)' }}>
                                    {t.p2}
                                </motion.p>
                            </div>
                            
                            <motion.div variants={fadeInUp} className="mt-8 flex justify-center md:justify-start">
                                 <ActionButton text={t.btn} onClick={downloadResume} />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image (Hologram Effect) */}
                    <div className="block md:hidden lg:block w-full lg:w-5/12 relative h-48 lg:h-auto min-h-[200px] lg:min-h-full order-1 lg:order-2 bg-black/40 overflow-hidden group">
                        <motion.div 
                            variants={fadeInUp}
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                            <div className="relative w-full h-full">
                                <CyberImage
                                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Career Journey Hologram" 
                                    className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 brightness-110 mix-blend-screen"
                                    containerClassName="w-full h-full"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)',
                                        backgroundSize: '100% 4px'
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-theme-primary/20 mix-blend-overlay z-20 animate-pulse"></div>
                                <div className="absolute top-0 left-0 w-full h-[10%] bg-theme-primary/30 blur-md animate-[slide-bottom_3s_linear_infinite] z-20 opacity-30"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-30"></div>
                            </div>

                            <div className="absolute top-6 right-6 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-theme-primary shadow-[0_0_10px_var(--primary-color)] rounded-tr-xl z-40 opacity-80"></div>
                            <div className="absolute bottom-6 left-6 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-theme-primary shadow-[0_0_10px_var(--primary-color)] rounded-bl-xl z-40 opacity-80"></div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
             <ScrollDownIndicator targetId="#contact" />
        </section>
    );
};

export default ResumeSection;
