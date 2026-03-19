import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Project } from './ProjectsSection';
import { translations, Language } from '../config/translations';
import { useAudio } from '../hooks/useAudio';
import CyberImage from './CyberImage';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    language: Language;
}

const pageVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 100 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] // Custom ease curve
        }
    },
    exit: { 
        opacity: 0, 
        y: 50,
        transition: {
            duration: 0.3,
        }
    }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project, language }) => {
    const t = translations[language].projects;
    const { playSound } = useAudio();

    const handleClose = () => {
        playSound('close');
        onClose();
    };

    // Prevent background scrolling when page is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Handle Escape Key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [handleClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-[100] bg-[#03060d] overflow-y-auto overflow-x-hidden"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(var(--primary-rgb),0.08),transparent_35%),radial-gradient(circle_at_80%_85%,rgba(var(--primary-rgb),0.06),transparent_35%)] pointer-events-none" />
                    {/* Fixed Header / Navigation */}
                    <div className="sticky top-0 z-50 w-full bg-[#040810] border-b border-theme-primary/30 shadow-lg shadow-theme-primary/5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                            
                            {/* Breadcrumbs / Back Button */}
                            <button 
                                onClick={handleClose} 
                                className="group flex items-center gap-2 text-gray-400 hover:text-theme-primary transition-colors"
                                onMouseEnter={() => playSound('hover')}
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-theme-primary/50 transition-colors shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_10px_var(--primary-color)]">
                                    <i className="fas fa-arrow-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-theme-primary/80">{t.back}</span>
                                    <span className="text-sm font-bold">Projects</span>
                                </div>
                            </button>

                            {/* Center Title (Optional - visible on scroll maybe, keeping static for now) */}
                            <div className="hidden md:block font-mono text-xs text-gray-500 uppercase tracking-widest">
                                Project_Detail_View // {project.title}
                            </div>

                            {/* Close Button (X) */}
                            <button 
                                onClick={handleClose}
                                onMouseEnter={() => playSound('hover')}
                                className="w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content Container */}
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                        
                        {/* Hero Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-theme-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] bg-black"
                        >
                            {/* OPTIMIZED: Using CyberImage here too */}
                            <CyberImage 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none"></div>
                            
                            {/* Floating Title on Hero */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full z-10">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/20 border border-theme-primary/50 backdrop-blur-md mb-4">
                                        <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse"></span>
                                        <span className="text-xs font-bold text-theme-primary uppercase tracking-widest">Featured Project</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white font-['Audiowide'] drop-shadow-lg">
                                        {project.title}
                                    </h1>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Blog Layout: Sidebar Info + Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            
                            {/* Left Column: Specs / Tech Stack (Sticky) */}
                            <div className="lg:col-span-4">
                                <div className="lg:sticky lg:top-24 space-y-8">
                                    
                                    {/* Tech Stack Card */}
                                    <motion.div 
                                        className="p-6 rounded-2xl bg-black/60 border border-white/10"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-white/10 pb-2">
                                            {t.tech_stack}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span 
                                                    key={i} 
                                                    className="px-3 py-1.5 rounded text-sm bg-black/40 border border-white/10 text-gray-200 font-mono hover:border-theme-primary/50 hover:text-theme-primary transition-colors cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Project Links */}
                                    <motion.div 
                                        className="flex flex-col gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <a 
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => playSound('click')}
                                            onMouseEnter={() => playSound('hover')}
                                            className="glowing-button w-full h-12 rounded-xl flex items-center justify-center gap-2 text-white font-bold bg-theme-primary/80 hover:bg-theme-primary transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                                        >
                                            <i className="fas fa-external-link-alt"></i> {t.links.live}
                                        </a>
                                        <a 
                                            href={project.codeLink || project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => playSound('click')}
                                            onMouseEnter={() => playSound('hover')}
                                            className="w-full h-12 rounded-xl border border-white/20 hover:bg-white/5 text-gray-300 font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <i className="fab fa-github"></i> {t.links.code}
                                        </a>
                                    </motion.div>

                                </div>
                            </div>

                            {/* Right Column: Narrative / Description */}
                            <div className="lg:col-span-8">
                                <motion.div 
                                    className="prose prose-invert max-w-none"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <span className="text-theme-primary">#</span> {t.overview}
                                    </h2>
                                    <div className="p-8 rounded-2xl bg-black/55 border-l-4 border-theme-primary mb-8 text-lg leading-relaxed text-gray-200">
                                        "{project.description}"
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mt-10 mb-4">The Challenge & Solution</h3>
                                    <div className="text-gray-300 space-y-4 leading-relaxed text-lg">
                                        {/* Mocking rich content based on 'details' prop */}
                                        <p>{project.details}</p>
                                        <p>
                                            Development followed a rigorous process of prototyping and iteration. The primary goal was to ensure high performance while maintaining visual fidelity. By leveraging {project.technologies[0]} and {project.technologies[1]}, we achieved a seamless user experience that scales effectively.
                                        </p>
                                        <p>
                                            The interface was designed with a focus on accessibility and responsiveness, ensuring that the application feels native on all devices.
                                        </p>
                                    </div>

                                    {/* Mock Gallery Section */}
                                    <h3 className="text-xl font-bold text-white mt-10 mb-6">Visual Gallery</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="h-48 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-gray-600">
                                            <i className="fas fa-image text-3xl"></i>
                                        </div>
                                        <div className="h-48 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-gray-600">
                                            <i className="fas fa-image text-3xl"></i>
                                        </div>
                                    </div>

                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
