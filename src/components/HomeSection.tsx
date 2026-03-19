import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionScrollVariant, staggerContainer, fadeInUp } from './motion/variants';
import ScrollDownIndicator from './ScrollDownIndicator';
import { translations, Language } from '../config/translations';

// --- Constants ---
const FULL_NAME = "Andrei Costa";
const TYPING_INTERVAL_MS = 150;
const ROLE_CHANGE_INTERVAL_MS = 2500;
const CONTACT_EMAIL = "your-email@example.com";
const CONTACT_SUBJECT = "Hiring Inquiry";

// --- Optimized Components ---

interface StatBoxProps {
  label: string;
  value: string;
  icon: string;
}

const StatBox: React.FC<StatBoxProps> = memo(({ label, value, icon }) => (
  <div className="bg-black/40 p-2 md:p-3 rounded-lg flex items-center gap-3 w-full hover:border-theme-primary/50 transition-colors group border border-white/5">
    <div className="w-8 h-8 rounded bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform shrink-0">
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="min-w-0">
      <div className="text-[9px] md:text-[10px] uppercase text-gray-500 tracking-wider font-mono truncate">
        {label}
      </div>
      <div className="text-xs md:text-sm font-bold text-white font-mono truncate">
        {value}
      </div>
    </div>
  </div>
));

StatBox.displayName = 'StatBox';

// --- Optimized Radiation Monitor ---
interface RadiationMonitorProps { }

const RadiationMonitor: React.FC<RadiationMonitorProps> = memo(() => {
  const [dataPoints, setDataPoints] = useState<number[]>(() =>
    Array.from({ length: 20 }, () => 20)
  );
  const currentValueRef = useRef(0.45);
  const peakValueRef = useRef(0.82);
  const currentValueElRef = useRef<HTMLDivElement>(null);
  const peakValueElRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Memoized data point generator
  const generateNewValue = useCallback(() => {
    const random = Math.random();
    if (random > 0.90) {
      return Math.random() * 50 + 40; // High spike
    } else if (random > 0.7) {
      return Math.random() * 20 + 20; // Medium fluctuation
    }
    return Math.random() * 10 + 10; // Low noise
  }, []);

  // Memoized smooth path generator
  const generateSmoothPath = useCallback((points: Array<{ x: number, y: number }>, isFill: boolean) => {
    if (points.length < 2) return "";

    const widthStep = 100 / (points.length - 1);
    let d = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      const cp1x = p0.x + widthStep / 2;
      const cp1y = p0.y;
      const cp2x = p1.x - widthStep / 2;
      const cp2y = p1.y;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }

    if (isFill) {
      d += ` L 100,100 L 0,100 Z`;
    }

    return d;
  }, []);

  // Memoized points calculation
  const calculatePoints = useCallback((data: number[]) => {
    const widthStep = 100 / (data.length - 1);
    return data.map((val, i) => ({
      x: i * widthStep,
      y: 100 - Math.min(val, 100)
    }));
  }, []);

  // Memoized paths
  const paths = useMemo(() => {
    const points = calculatePoints(dataPoints);
    return {
      line: generateSmoothPath(points, false),
      fill: generateSmoothPath(points, true)
    };
  }, [dataPoints, calculatePoints, generateSmoothPath]);

  // Update data with requestAnimationFrame
  useEffect(() => {
    let mounted = true;

    const updateValues = () => {
      if (!mounted) return;

      const now = Date.now();
      if (now - lastUpdateRef.current < (isMobileRef.current ? 600 : 400)) {
        animationFrameRef.current = requestAnimationFrame(updateValues);
        return;
      }

      lastUpdateRef.current = now;

      setDataPoints(prev => {
        const newPoints = [...prev.slice(1)];
        const newValue = generateNewValue();

        // Update refs directly
        currentValueRef.current = currentValueRef.current * 0.9 + (newValue / 100 * 0.1);

        if (Math.random() > 0.95) {
          peakValueRef.current = Math.max(peakValueRef.current, Math.random() * 2.5);
        }

        // Update DOM directly for performance
        if (currentValueElRef.current) {
          currentValueElRef.current.textContent = currentValueRef.current.toFixed(2);
        }
        if (peakValueElRef.current) {
          peakValueElRef.current.textContent = peakValueRef.current.toFixed(2);
        }

        newPoints.push(newValue);
        return newPoints;
      });

      animationFrameRef.current = requestAnimationFrame(updateValues);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(updateValues);

    return () => {
      mounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [generateNewValue]);

  return (
    <div className="relative w-full h-full flex flex-col justify-end overflow-hidden">
      {/* Background Grid - Static SVG for better performance */}
      <svg
        className="absolute inset-0 opacity-20 pointer-events-none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(var(--primary-rgb), 0.3)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Data Overlay HUD */}
      <div className="absolute top-2 left-4 z-20 font-mono text-xs text-theme-primary/80 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-theme-primary rounded-full animate-pulse"></span>
          <span className="tracking-widest font-bold hidden md:inline">COSMIC_RAY_FLUX</span>
          <span className="tracking-widest font-bold md:hidden">FLUX</span>
        </div>
        <div className="text-xl font-bold text-white">
          <span ref={currentValueElRef}>0.45</span>
          <span className="text-xs text-gray-400"> µSv/h</span>
        </div>
      </div>

      <div className="absolute top-2 right-4 z-20 font-mono text-xs text-right text-theme-primary/60">
        <div>
          PEAK: <span ref={peakValueElRef} className="text-white">0.82</span>
        </div>
      </div>

      {/* Radiation Graph */}
      <div className="relative w-full h-3/4 z-10 px-2">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="radiationGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* The Fill */}
          <path
            d={paths.fill}
            fill="url(#radiationGradient)"
            className="transition-[d] duration-300 ease-linear"
          />

          {/* The Line */}
          <path
            d={paths.line}
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_5px_var(--primary-color)] transition-[d] duration-300 ease-linear"
          />
        </svg>
      </div>

      {/* Scanning Line */}
      <div className="absolute top-0 right-0 w-[2px] h-full bg-theme-primary/50 blur-[2px] animate-[slide-left_4s_linear_infinite] z-20 hardware-accelerate"></div>
    </div>
  );
});

RadiationMonitor.displayName = 'RadiationMonitor';

// --- Optimized Avatar Component ---
const AvatarUnit: React.FC = memo(() => (
  <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
    {/* Static border elements - no animation on mobile */}
    <div className="absolute inset-0 border border-theme-primary/30 rounded-full md:animate-[spin_10s_linear_infinite]"></div>
    <div className="absolute inset-4 border border-dashed border-theme-primary/50 rounded-full md:animate-[spin_15s_linear_infinite_reverse]"></div>

    {/* Image with loading optimization */}
    <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-theme-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]">
      <img
        src="https://avatars.githubusercontent.com/u/141879308?v=4"
        alt="Andrei Costa"
        className="w-full h-full object-cover"
        loading="lazy"
        width={160}
        height={160}
      />
    </div>

    {/* Status Tag */}
    <div className="absolute -bottom-3 bg-black/80 border border-theme-primary/50 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg z-20">
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-theme-primary animate-pulse"></div>
      <span className="text-[10px] md:text-xs font-mono text-theme-primary uppercase tracking-wider">
        Online
      </span>
    </div>
  </div>
));

AvatarUnit.displayName = 'AvatarUnit';

// --- Main HomeSection Component ---
interface HomeSectionProps {
  language: Language;
}

const HomeSection: React.FC<HomeSectionProps> = ({ language }) => {
  const t = translations[language].home;
  const [name, setName] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  // FIX: Type refs explicitly for clarity and to ensure browser-compatible timer IDs.
  const typingTimeoutRef = useRef<number | undefined>(undefined);
  const roleIntervalRef = useRef<number | undefined>(undefined);

  // Memoized values
  const roles = useMemo(() => t.roles, [t.roles]);
  const animationDuration = useMemo(() => "4s", []);

  // Optimized typing effect
  useEffect(() => {
    let i = 0;
    let mounted = true;

    const typeNextChar = () => {
      if (!mounted || i > FULL_NAME.length) return;

      setName(FULL_NAME.slice(0, i));
      i++;

      if (i <= FULL_NAME.length) {
        typingTimeoutRef.current = window.setTimeout(typeNextChar, TYPING_INTERVAL_MS);
      }
    };

    typingTimeoutRef.current = window.setTimeout(typeNextChar, TYPING_INTERVAL_MS);

    return () => {
      mounted = false;
      // FIX: The `clearTimeout` function must be called with the timer ID to clear it.
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Optimized role switcher
  const incrementRoleIndex = useCallback(() => {
    setCurrentRoleIndex(prev => (prev + 1) % roles.length);
  }, [roles.length]);

  useEffect(() => {
    roleIntervalRef.current = window.setInterval(incrementRoleIndex, ROLE_CHANGE_INTERVAL_MS);

    return () => {
      // FIX: The `clearInterval` function must be called with the interval ID to clear it.
      if (roleIntervalRef.current) {
        window.clearInterval(roleIntervalRef.current);
      }
    };
  }, [incrementRoleIndex]);

  // Memoized event handlers
  const sendEmail = useCallback(() => {
    window.open(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`, '_blank');
  }, []);

  const handleScrollToProjects = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoized border animations
  const borderAnimations = useMemo(() => [
    {
      style: { animation: `slide-top ${animationDuration} linear infinite` },
      className: "absolute top-0 left-0 w-full h-[2px] bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
    },
    {
      style: { animation: `slide-right ${animationDuration} linear infinite`, animationDelay: `1s` },
      className: "absolute top-0 right-0 w-[2px] h-full bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
    },
    {
      style: { animation: `slide-bottom ${animationDuration} linear infinite`, animationDelay: `2s` },
      className: "absolute bottom-0 right-0 w-full h-[2px] bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
    },
    {
      style: { animation: `slide-left ${animationDuration} linear infinite`, animationDelay: `3s` },
      className: "absolute bottom-0 left-0 w-[2px] h-full bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
    }
  ], [animationDuration]);

  // Memoized stats data
  const statsData = useMemo(() => [
    { label: t.stats.level, value: "26", icon: "fa-layer-group" },
    { label: t.stats.class, value: "Fullstack", icon: "fa-code" },
    { label: t.stats.exp, value: "5+ Yrs", icon: "fa-history" },
    { label: t.stats.mana, value: "100%", icon: "fa-bolt" }
  ], [t.stats]);

  // Memoized components
  const MobileAvatar = useMemo(() => (
    <div className="flex md:hidden w-full items-center justify-center mb-8">
      <AvatarUnit />
    </div>
  ), []);

  const DesktopStats = useMemo(() => (
    <div className="hidden md:flex w-5/12 relative z-10 p-12 flex-col items-center justify-center border-r border-transparent bg-black/20">
      <AvatarUnit />

      <div className="w-full max-w-[200px] flex items-center justify-center gap-4 my-10 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-primary"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-theme-primary shadow-[0_0_5px_var(--primary-color)]"></div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-theme-primary"></div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {statsData.map((stat, index) => (
          <StatBox key={index} {...stat} />
        ))}
      </div>
    </div>
  ), [statsData]);

  return (
    <section
      id="home"
      className="min-h-screen flex justify-center items-end relative overflow-hidden p-4 pt-10 md:p-8 pb-32 md:pb-48"
    >
      {/* Main Cyber Card Container */}
      <motion.div
        className="glowing-container relative w-full max-w-7xl overflow-hidden will-change-transform"
        variants={sectionScrollVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Border Beams */}
        {borderAnimations.map((border, index) => (
          <span
            key={index}
            style={border.style}
            className={border.className}
          />
        ))}

        {/* Inner Card Content */}
        <div className="relative tech-grid w-full bg-[--card-background] backdrop-blur-[4px] md:backdrop-blur-[4px] border border-[--card-border-color] rounded-[28px] overflow-hidden flex flex-col z-10">

          {/* Main Content Grid */}
          <div className="flex flex-col md:flex-row w-full flex-grow">
            {DesktopStats}

            {/* Right Column */}
            <div className="w-full md:w-7/12 relative z-10 p-6 md:p-16 flex flex-col justify-center text-center md:text-left">
              {/* Terminal Initializing Text */}
              <div className="mb-2 flex items-center justify-center md:justify-start gap-2 opacity-60">
                <i className="fas fa-terminal text-theme-primary text-xs"></i>
                <span className="font-mono text-[10px] md:text-xs text-theme-primary tracking-[0.2em]">
                  {t.initializing}
                </span>
              </div>

              {/* Name */}
              <motion.h1
                className="font-['Audiowide'] text-3xl md:text-5xl lg:text-7xl mb-2 text-white"
                variants={fadeInUp}
              >
                {name}
                <span className="text-theme-primary animate-pulse">_</span>
              </motion.h1>

              {/* Role Animation */}
              <div className="h-8 md:h-16 mb-4 md:mb-6 overflow-hidden relative min-h-[1.5em]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg md:text-3xl text-theme-primary font-bold uppercase tracking-wide absolute inset-0"
                  >
                    {roles[currentRoleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile Avatar */}
              {MobileAvatar}

              {/* Intro Text */}
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 font-light border-l-2 border-theme-primary/30 pl-4 text-justify md:text-left">
                {t.intro}
              </p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto md:mx-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  onClick={sendEmail}
                  variants={fadeInUp}
                  className="group relative overflow-hidden bg-theme-primary text-black font-bold py-3 md:py-4 px-8 rounded-lg uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)] text-sm md:text-base hardware-accelerate"
                  aria-label={t.btn_contact}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <i className="fas fa-envelope"></i> {t.btn_contact}
                  </span>
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </motion.button>

                <motion.button
                  onClick={handleScrollToProjects}
                  variants={fadeInUp}
                  className="group relative overflow-hidden bg-transparent border border-theme-primary text-theme-primary font-bold py-3 md:py-4 px-8 rounded-lg uppercase tracking-wider transition-all hover:bg-theme-primary/10 text-sm md:text-base hardware-accelerate"
                  aria-label={t.btn_projects}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <i className="fas fa-folder-open"></i> {t.btn_projects}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Animation Row */}
          <div className="relative w-full h-24 md:h-40 border-t border-white/10 bg-black flex items-end justify-center overflow-hidden shrink-0 group">
            <RadiationMonitor />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_8px] opacity-10 pointer-events-none z-30"></div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none z-30"></div>
          </div>
        </div>
      </motion.div>

      <ScrollDownIndicator targetId="#about" />
    </section>
  );
};

// Export with memo
export default memo(HomeSection);