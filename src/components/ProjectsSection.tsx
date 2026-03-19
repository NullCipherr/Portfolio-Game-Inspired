import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import SectionContainer from './SectionContainer';
import ProjectModal from './ProjectModal';
import TypingTitle from './TypingTitle';
import CyberImage from './CyberImage';
import { projectCardVariants, fadeInUp, staggerContainer } from './motion/variants';
import ScrollDownIndicator from './ScrollDownIndicator';
import { translations, Language } from '../config/translations';
import { useAudio } from '../hooks/useAudio';

const projects = [
    {
        title: "Project Alpha",
        description: "A cutting-edge application for managing tasks and boosting productivity.",
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop", 
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        details: "Project Alpha is a comprehensive task management solution designed for modern teams. It features a real-time collaborative dashboard, deadline tracking, and integration with popular tools like Slack and Google Calendar. The backend is built on a robust RESTful API, ensuring scalability and performance.",
        status: "Live"
    },
    {
        title: "Project Beta",
        description: "An immersive 3D game experience developed with Unreal Engine.",
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
        technologies: ["Unreal Engine", "C++", "Blender", "Perforce"],
        details: "Project Beta is a third-person action-adventure game that pushes the boundaries of real-time graphics. It features a dynamic weather system, advanced AI for non-playable characters, and a complex physics-based combat system. The world is built with a focus on exploration and environmental storytelling.",
        status: "Beta"
    },
    {
        title: "Project Gamma",
        description: "A machine learning model for sentiment analysis with high accuracy.",
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
        technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
        details: "Project Gamma utilizes a transformer-based neural network to analyze and classify text sentiment. Trained on a diverse dataset of over one million reviews, the model can accurately predict sentiment for applications ranging from customer feedback analysis to social media monitoring.",
        status: "Prototype"
    },
    {
        title: "Project Delta",
        description: "A sleek e-commerce platform with a focus on user experience.",
        link: "#",
        imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1200&auto=format&fit=crop",
        technologies: ["Vue.js", "Firebase", "Stripe", "SASS"],
        details: "Project Delta is a modern e-commerce storefront with a clean design and intuitive navigation. It features secure payments through Stripe, real-time inventory management with Firebase, and a fully responsive layout for a seamless shopping experience on any device.",
        status: "Live"
    }
];

export type Project = typeof projects[0];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const AUTOSCROLL_INTERVAL_MS = 5000;

interface ProjectsSectionProps {
    language: Language;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ language }) => {
    const t = translations[language].projects;
    const { playSound } = useAudio();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const scrollToPage = (pageIndex: number) => {
        const container = scrollContainerRef.current;
        if (container) {
            const { clientWidth } = container;
            container.scrollTo({
                left: pageIndex * clientWidth,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const calculatePages = () => {
            const { scrollWidth, clientWidth } = container;
            const pages = clientWidth > 0 && scrollWidth > clientWidth ? Math.ceil(scrollWidth / clientWidth) : 1;
            setTotalPages(pages);
        };

        const handleScroll = () => {
            const { scrollLeft, clientWidth } = container;
            const page = Math.round(scrollLeft / clientWidth);
            setCurrentPage(page);
        };

        calculatePages();
        window.addEventListener('resize', calculatePages);
        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', calculatePages);
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (totalPages <= 1 || isHovering) return;

        const timer = setInterval(() => {
            const nextPage = (currentPage + 1) % totalPages;
            scrollToPage(nextPage);
        }, AUTOSCROLL_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [currentPage, totalPages, isHovering]);

    const handleOpenModal = (project: Project) => {
        playSound('open');
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <>
            <section id="projects" className="min-h-screen flex justify-center items-center pt-4 pb-32 px-4 relative">
                <SectionContainer maxWidth="max-w-[1400px]">
                    <motion.div 
                        className="text-center mb-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div variants={fadeInUp}>
                            <TypingTitle text={t.title} className="text-fluid-xxl font-bold h-16 text-theme-primary [text-shadow:0_0_8px_rgba(var(--primary-rgb),0.6)]" />
                        </motion.div>
                        <motion.p variants={fadeInUp} className="text-fluid-md italic text-gray-300">{t.subtitle}</motion.p>
                        <motion.div variants={fadeInUp} className="card-divider w-32 mx-auto mt-4 mb-4"></motion.div>
                    </motion.div>

                    <motion.div 
                        ref={scrollContainerRef} 
                        // Added will-change-scroll for optimization, reduced pb-12 to pb-8 for tighter look
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 gap-8 pb-8 pt-4 will-change-scroll"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{ perspective: '1000px' }}
                    >
                        {projects.map((project, index) => {
                            // Helper to display translated status if available
                            const statusKey = project.status.toLowerCase() as keyof typeof t.status;
                            const displayStatus = t.status[statusKey] || project.status;

                            return (
                                <motion.div 
                                    key={index} 
                                    className="project-card-container snap-center shrink-0 w-[90%] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                    variants={projectCardVariants}
                                >
                                    <motion.div
                                        // Reduced height from 520px to 440px for a more compact look
                                        className="group relative h-[440px] w-full bg-black/40 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:scale-[1.02] border border-[--card-border-color] hover:border-theme-primary/50 will-change-transform"
                                        onClick={() => handleOpenModal(project)}
                                        onMouseEnter={() => playSound('hover')}
                                    >
                                        {/* === 1. Holographic Image Section (Top) - Adjusted to 55% === */}
                                        <div className="relative h-[55%] w-full bg-black">
                                            
                                            {/* Container for the image and its holographic clones */}
                                            <div className="relative w-full h-full">
                                                {/* OPTIMIZED: Using CyberImage component for smart loading */}
                                                <CyberImage 
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    containerClassName="w-full h-full"
                                                    className="w-full h-full object-cover grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                                />
                                                
                                                {/* Scanlines Overlay (Always visible but enhanced on hover) */}
                                                <div 
                                                    className="absolute inset-0 z-10 pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300"
                                                    style={{
                                                        backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
                                                        backgroundSize: '100% 4px',
                                                    }}
                                                ></div>
                                                
                                                {/* Holographic Interference (Moves on hover) */}
                                                <div 
                                                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-30 mix-blend-screen"
                                                    style={{
                                                        background: 'linear-gradient(to bottom, transparent, rgba(var(--primary-rgb), 0.5), transparent)',
                                                        backgroundSize: '100% 10px',
                                                        animation: 'holoScan 3s linear infinite paused',
                                                    }}
                                                >
                                                    <style>{`
                                                        .group:hover div[style*="holoScan"] {
                                                            animation-play-state: running !important;
                                                        }
                                                    `}</style>
                                                </div>

                                                {/* Color Tint Overlay (Blue-ish tech feel in idle, clears on hover) */}
                                                <div className="absolute inset-0 bg-theme-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                            </div>
                                            
                                            {/* Scanner Laser (Active on Hover) */}
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-primary shadow-[0_0_15px_var(--primary-color),0_0_30px_var(--primary-color)] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]"></div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4 z-20">
                                                <div className="bg-black/90 backdrop-blur-md border border-theme-primary/30 px-3 py-1 rounded text-[10px] font-mono text-theme-primary uppercase tracking-widest shadow-lg flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-theme-primary ${project.status === 'Live' ? 'animate-pulse' : ''}`}></span>
                                                    {displayStatus}
                                                </div>
                                            </div>

                                            {/* Project ID Tag */}
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-8 bg-theme-primary"></div>
                                                    <div className="bg-black/80 px-2 py-1 text-[10px] font-mono text-white tracking-widest border-r border-theme-primary/50">
                                                        PRJ-{String(index + 1).padStart(3, '0')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* === 2. Data Info Section (Bottom) - Adjusted to 45% and p-5 === */}
                                        <div className="relative h-[45%] bg-gradient-to-b from-black/80 to-black/40 p-5 flex flex-col justify-between overflow-hidden">
                                            
                                            {/* Animated Grid Background for Content Area */}
                                            <div 
                                                className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500" 
                                                style={{ 
                                                    backgroundImage: 'linear-gradient(var(--primary-color) 1px, transparent 1px), linear-gradient(90deg, var(--primary-color) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px',
                                                    transform: 'perspective(500px) rotateX(20deg)',
                                                    transformOrigin: 'top'
                                                }}
                                            ></div>

                                            <div>
                                                <div className="flex justify-between items-start mb-1 relative z-10">
                                                    <h3 className="text-lg font-bold text-white font-['Audiowide'] truncate group-hover:text-theme-primary transition-colors duration-300 drop-shadow-md">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                
                                                {/* Decorative Data Line */}
                                                <div className="flex items-center gap-1 mb-3 opacity-50">
                                                    <div className="h-[2px] w-2 bg-theme-primary"></div>
                                                    <div className="h-[2px] w-full bg-gray-700"></div>
                                                    <div className="h-[2px] w-8 bg-theme-primary group-hover:w-16 transition-all duration-500"></div>
                                                </div>

                                                {/* Tech Chips */}
                                                <div className="flex flex-wrap gap-2 mb-3 relative z-10">
                                                    {project.technologies.slice(0, 3).map(tech => (
                                                        <span key={tech} className="text-[10px] uppercase font-bold font-mono px-2 py-1 rounded-sm bg-theme-primary/5 border border-theme-primary/20 text-gray-400 group-hover:border-theme-primary/50 group-hover:text-theme-primary group-hover:shadow-[0_0_5px_rgba(var(--primary-rgb),0.2)] transition-all">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span className="text-[10px] uppercase font-mono px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-gray-500">
                                                            +{project.technologies.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-400 text-sm line-clamp-2 font-light relative z-10 group-hover:text-gray-300 transition-colors">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Interactive Footer Button Area - Compacted */}
                                            <div className="mt-auto flex items-center justify-between group/btn relative z-10 pt-3 border-t border-white/5">
                                                <span className="text-[10px] font-mono text-gray-500 group-hover:text-theme-primary transition-colors uppercase tracking-wider group-hover:drop-shadow-[0_0_5px_var(--primary-color)]">
                                                    {t.view_project}
                                                </span>
                                                
                                                {/* Enhanced Circular Button */}
                                                <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 group-hover:border-theme-primary group-hover:bg-theme-primary group-hover:shadow-[0_0_20px_var(--primary-color)]">
                                                    <i className="fas fa-arrow-right text-sm text-theme-primary transform -rotate-45 group-hover:rotate-0 group-hover:text-black transition-all duration-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                    
                    {/* Pagination Dots */}
                    <motion.div
                        className="flex justify-center items-center space-x-3 mt-2"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {totalPages > 1 && Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToPage(index)}
                                aria-label={`Go to projects page ${index + 1}`}
                                className={`rounded-full transition-all duration-500 ${
                                    currentPage === index 
                                    ? 'w-12 h-1 bg-theme-primary shadow-[0_0_10px_var(--primary-color)]' 
                                    : 'w-2 h-1 bg-white/20 hover:bg-white/40'
                                }`}
                            />
                        ))}
                    </motion.div>

                </SectionContainer>
                <ScrollDownIndicator targetId="#resume" />
                
                {/* CSS Animation for the scanner and hologram */}
                <style>{`
                    @keyframes scan {
                        0% { top: 0%; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    @keyframes holoScan {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(100%); }
                    }
                `}</style>
            </section>
            
            <ProjectModal 
                isOpen={!!selectedProject} 
                onClose={handleCloseModal} 
                project={selectedProject} 
                language={language}
            />
        </>
    );
};

export default ProjectsSection;