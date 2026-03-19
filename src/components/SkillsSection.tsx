import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingTitle from './TypingTitle';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import ScrollDownIndicator from './ScrollDownIndicator';
import { translations, Language } from '../config/translations';

// Skills data - including Font Awesome classes, colors, and official URLs
const skillsData = [
    // Page 1: Web & Frontend
    { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'SASS', icon: 'fab fa-sass', color: '#CC6699', url: 'https://sass-lang.com/' },
    { name: 'JAVASCRIPT', icon: 'fab fa-js-square', color: '#F7DF1E', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'TYPESCRIPT', icon: 'fas fa-code', color: '#3178C6', url: 'https://www.typescriptlang.org/' },
    { name: 'REACT JS', icon: 'fab fa-react', color: '#61DAFB', url: 'https://react.dev/' },
    { name: 'NEXT.JS', icon: 'fas fa-arrow-right', color: '#FFFFFF', url: 'https://nextjs.org/' },
    { name: 'VUE.JS', icon: 'fab fa-vuejs', color: '#4FC08D', url: 'https://vuejs.org/' },
    { name: 'TAILWIND', icon: 'fas fa-wind', color: '#38B2AC', url: 'https://tailwindcss.com/' },
    { name: 'FIGMA', icon: 'fab fa-figma', color: '#F24E1E', url: 'https://www.figma.com/' },

    // Page 2: Backend & DevOps
    { name: 'NODE JS', icon: 'fab fa-node-js', color: '#339933', url: 'https://nodejs.org/' },
    { name: 'PYTHON', icon: 'fab fa-python', color: '#3776AB', url: 'https://www.python.org/' },
    { name: 'MONGODB', icon: 'fas fa-database', color: '#47A248', url: 'https://www.mongodb.com/' },
    { name: 'FIREBASE', icon: 'fas fa-fire-alt', color: '#FFCA28', url: 'https://firebase.google.com/' },
    { name: 'DOCKER', icon: 'fab fa-docker', color: '#2496ED', url: 'https://www.docker.com/' },
    { name: 'AWS', icon: 'fab fa-aws', color: '#232F3E', url: 'https://aws.amazon.com/' },
    { name: 'POSTGRESQL', icon: 'fas fa-database', color: '#336791', url: 'https://www.postgresql.org/' },
    { name: 'GRAPHQL', icon: 'fas fa-project-diagram', color: '#E10098', url: 'https://graphql.org/' },
    { name: 'KUBERNETES', icon: 'fas fa-dharmachakra', color: '#326CE5', url: 'https://kubernetes.io/' },
    { name: 'NGINX', icon: 'fas fa-server', color: '#009639', url: 'https://www.nginx.com/' },
    
    // Page 3: Game Development
    { name: 'UNREAL ENGINE', icon: 'fab fa-unreal', color: '#FFFFFF', url: 'https://www.unrealengine.com/' },
    { name: 'C++', icon: 'fas fa-plus', color: '#00599C', url: 'https://isocpp.org/' },
    { name: 'BLENDER', icon: 'fas fa-cube', color: '#E87D0D', url: 'https://www.blender.org/' },
    { name: 'UNITY', icon: 'fab fa-unity', color: '#FFFFFF', url: 'https://unity.com/' },
    { name: 'C#', icon: 'fas fa-code', color: '#9B4F96', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
    { name: 'GODOT', icon: 'fas fa-gamepad', color: '#478CBF', url: 'https://godotengine.org/' },
    { name: 'OPENGL', icon: 'fas fa-draw-polygon', color: '#5586A4', url: 'https://www.opengl.org/' },
    { name: 'DIRECTX', icon: 'fab fa-windows', color: '#0078D7', url: 'https://devblogs.microsoft.com/directx/' },
    { name: 'HLSL/GLSL', icon: 'fas fa-palette', color: '#8B0000', url: 'https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-writing-shaders-9' },
    { name: 'PERFORCE', icon: 'fas fa-code-branch', color: '#00AEEF', url: 'https://www.perforce.com/' },
    
    // Page 4: AI, Languages & Tools
    { name: 'TENSORFLOW', icon: 'fas fa-brain', color: '#FF6F00', url: 'https://www.tensorflow.org/' },
    { name: 'PYTORCH', icon: 'fas fa-fire', color: '#EE4C2C', url: 'https://pytorch.org/' },
    { name: 'SCIKIT-LEARN', icon: 'fas fa-robot', color: '#F7931E', url: 'https://scikit-learn.org/' },
    { name: 'PANDAS', icon: 'fas fa-chart-line', color: '#150458', url: 'https://pandas.pydata.org/' },
    { name: 'GIT', icon: 'fab fa-git-alt', color: '#F05032', url: 'https://git-scm.com/' },
    { name: 'GITHUB', icon: 'fab fa-github', color: '#FFFFFF', url: 'https://github.com/' },
    { name: 'JIRA', icon: 'fab fa-jira', color: '#0052CC', url: 'https://www.atlassian.com/software/jira' },
    { name: 'JAVA', icon: 'fab fa-java', color: '#007396', url: 'https://www.java.com/' },
    { name: 'RUST', icon: 'fab fa-rust', color: '#DEA584', url: 'https://www.rust-lang.org/' },
    { name: 'GO (GOLANG)', icon: 'fas fa-laptop-code', color: '#00ADD8', url: 'https://go.dev/' },
];

const AUTOSCROLL_INTERVAL_MS = 4000;

interface SkillsSectionProps {
    language: Language;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ language }) => {
    const t = translations[language].skills;
    const [currentPage, setCurrentPage] = useState(0);
    const [skillsPerPage, setSkillsPerPage] = useState(10);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Tailwind's `md` breakpoint
                setSkillsPerPage(6);
            } else {
                setSkillsPerPage(10);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const totalPages = Math.ceil(skillsData.length / skillsPerPage);
    
    useEffect(() => {
        // Reset to page 0 if totalPages changes to avoid being on an out-of-bounds page
        setCurrentPage(0);
    }, [totalPages]);

    const currentSkills = skillsData.slice(
        currentPage * skillsPerPage,
        (currentPage + 1) * skillsPerPage
    );

    useEffect(() => {
        if (hoveredSkill) return;

        const timer = setInterval(() => {
            setCurrentPage(prevPage => (prevPage + 1) % totalPages);
        }, AUTOSCROLL_INTERVAL_MS);

        return () => clearInterval(timer); 
    }, [currentPage, totalPages, hoveredSkill]); 

    return (
        <section id="skills" className="min-h-screen flex justify-center items-stretch md:items-center pt-4 pb-20 md:pb-32 px-4 relative">
            <motion.div 
                className="glowing-container relative w-full max-w-6xl will-change-[opacity,transform]"
                variants={sectionScrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Main Card with Updated Glass Effect */}
                <div className="relative z-10 tech-grid bg-[--card-background] backdrop-blur-[4px] border border-[--card-border-color] text-white rounded-[28px] shadow-2xl w-full flex p-6 sm:p-8 md:p-12 h-full md:h-auto">
                    
                    {/* Vertical Skills Label - Using Inline Style for opacity */}
                    <div 
                        className="hidden md:flex items-center justify-center pr-4 md:pr-8 border-r-2"
                        style={{ borderColor: 'rgba(var(--primary-rgb), 0.2)' }}
                    >
                        <h3 className="font-bold text-fluid-xl transform -rotate-90 tracking-widest uppercase whitespace-nowrap text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]">
                            {t.label}
                        </h3>
                    </div>

                    {/* Main Content */}
                    <motion.div 
                        className="flex-grow md:pl-8 flex flex-col justify-center"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div variants={fadeInUp}>
                           <TypingTitle text={t.title} className="text-fluid-xxl font-bold h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="card-divider w-24 mt-4 mb-6"></motion.div>
                        <motion.p variants={fadeInUp} className="text-white mb-8 max-w-3xl leading-loose">
                            {t.desc}
                        </motion.p>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                            >
                                {currentSkills.map((skill) => (
                                    <motion.a 
                                        key={skill.name}
                                        href={skill.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Visit ${skill.name} website`}
                                        className="relative group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden will-change-transform backdrop-blur-md"
                                        style={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                        }}
                                        whileHover={{ 
                                            y: -5,
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            borderColor: skill.color,
                                            boxShadow: `0 0 20px -5px ${skill.color}80`
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onHoverStart={() => setHoveredSkill(skill.name)}
                                        onHoverEnd={() => setHoveredSkill(null)}
                                    >
                                        {/* Icon Container with subtle glow */}
                                        <div 
                                            className="mb-3 text-4xl sm:text-5xl transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                            style={{ color: skill.color }}
                                        >
                                            <i className={skill.icon}></i>
                                        </div>

                                        {/* Text Name */}
                                        <span className="text-xs font-bold tracking-widest uppercase text-center text-gray-300 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                        
                                        {/* Shine Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shine_1s_ease-in-out]" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                    
                    {/* Right Side Carousel Control */}
                    <div className="hidden md:flex flex-col items-center justify-center space-y-4 pl-4 md:pl-8">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                aria-label={`Go to skills page ${index + 1}`}
                                aria-current={currentPage === index ? 'page' : undefined}
                                className={`w-1 rounded-full transition-all duration-300 ${
                                    currentPage === index 
                                    ? 'h-10 bg-theme-primary shadow-[0_0_10px_var(--primary-color)]' 
                                    : 'h-4 bg-white/20 hover:bg-white/40'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
            <ScrollDownIndicator targetId="#projects" />
        </section>
    );
};

export default SkillsSection;