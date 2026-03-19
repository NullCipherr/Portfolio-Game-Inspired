import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// --- System Boot Logs ---
const BOOT_LOGS = [
  'BIOS_CHECK... OK',
  'LOADING_KERNEL_V2.5.0...',
  'MOUNTING_VIRTUAL_DOM...',
  'ALLOCATING_MEMORY_ADDRESSES...',
  'INITIALIZING_REACT_CORE...',
  'LOADING_ASSETS_BUNDLE [HASH: 8f9a2b]...',
  'CONFIGURING_VIEWPORT...',
  'STARTING_PARTICLE_ENGINE...',
  'CALIBRATING_PHYSICS_NODES...',
  'OPTIMIZING_SHADERS...',
  'ESTABLISHING_SECURE_CONNECTION...',
  'USER_AGENT_DETECTED...',
  'APPLYING_THEME_VARIABLES...',
  'HYDRATING_UI_COMPONENTS...',
  'SYSTEM_READY.',
];

// --- Sub-Component: Real-time Graph ---
const SystemLoadGraph: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>(() =>
    new Array(30).fill(50)
  );

  const gradientId = useId();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDataPoints((prev) => {
        const newPoints = prev.slice(1);

        const random = Math.random();
        let nextVal = 50;

        if (random > 0.8) nextVal = Math.random() * 40 + 60;
        else if (random < 0.2) nextVal = Math.random() * 20 + 10;
        else nextVal = Math.random() * 30 + 35;

        newPoints.push(nextVal);
        return newPoints;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  const paths = useMemo(() => {
    if (dataPoints.length === 0) {
      return { line: '', fill: '' };
    }

    const width = 100;
    const height = 100;
    const step = width / (dataPoints.length - 1);

    let d = `M 0,${height - dataPoints[0]}`;

    for (let i = 0; i < dataPoints.length - 1; i++) {
      const x0 = i * step;
      const y0 = height - dataPoints[i];
      const x1 = (i + 1) * step;
      const y1 = height - dataPoints[i + 1];

      const cp1x = x0 + step / 2;
      const cp1y = y0;
      const cp2x = x1 - step / 2;
      const cp2y = y1;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
    }

    const fillPath = `${d} L ${width},${height} L 0,${height} Z`;

    return { line: d, fill: fillPath };
  }, [dataPoints]);

  return (
    <div className="w-full h-24 md:h-32 bg-black/40 border border-white/10 rounded-lg relative overflow-hidden group">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--primary-color)"
              stopOpacity="0.5"
            />
            <stop
              offset="100%"
              stopColor="var(--primary-color)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path d={paths.fill} fill={`url(#${gradientId})`} />
        <path
          d={paths.line}
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute top-2 left-2 text-[10px] font-mono text-theme-primary">
        CPU_LOAD_INTEGRITY
      </div>

      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-theme-primary animate-pulse">
        PROCESSING...
      </div>
    </div>
  );
};

const LoadingOverlay: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const bootTimestampRef = useRef<number>(Date.now());
  const currentYearRef = useRef<number>(new Date().getFullYear());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(timer);
          return 100;
        }

        const diff = 100 - prev;
        const increment = Math.max(0.5, Math.random() * (diff / 10));
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  const currentLogIndex = useMemo(() => {
    const totalLogs = BOOT_LOGS.length;
    return Math.min(totalLogs - 1, Math.floor((progress / 100) * totalLogs));
  }, [progress]);

  const visibleLogs = useMemo(() => {
    return BOOT_LOGS.slice(0, currentLogIndex + 1);
  }, [currentLogIndex]);

  useEffect(() => {
    const el = logsContainerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [visibleLogs.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden font-mono cursor-wait"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(20px)',
        transition: { duration: 0.8, ease: 'easeInOut' },
      }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="absolute top-4 left-4 text-[10px] text-gray-500 hidden md:block">
        <div>SYS_BOOT_SEQ</div>
        <div className="text-theme-primary">V2.5.0-ALPHA</div>
      </div>

      <div className="absolute top-4 right-4 text-[10px] text-gray-500 text-right hidden md:block">
        <div>MEM_CHECK: OK</div>
        <div className="text-theme-primary">SECURE_BOOT</div>
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] text-gray-500 hidden md:block">
        <div>INIT_TIMESTAMP: {bootTimestampRef.current}</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 text-right hidden md:block">
        <div>COPYRIGHT {currentYearRef.current}</div>
        <div>ANDREI COSTA</div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-theme-primary flex items-center justify-center bg-theme-primary/10">
              <i className="fas fa-terminal text-sm text-theme-primary" aria-hidden="true" />
            </div>
            <span className="font-['Audiowide'] text-xl tracking-wider">
              SYSTEM<span className="text-theme-primary">_</span>INIT
            </span>
          </div>

          <div className="text-2xl font-bold text-theme-primary">
            {Math.floor(progress)}%
          </div>
        </div>

        <SystemLoadGraph />

        <div className="w-full h-1 bg-gray-800 relative overflow-hidden">
          <motion.div
            className="h-full bg-theme-primary shadow-[0_0_10px_var(--primary-color)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          ref={logsContainerRef}
          className="h-32 bg-black/50 border border-white/5 rounded p-3 overflow-y-auto overflow-x-hidden relative text-xs font-mono text-gray-400"
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

          <div className="flex flex-col gap-1 justify-end min-h-full">
            {visibleLogs.map((log, i) => {
              const isLatest = i === visibleLogs.length - 1;

              return (
                <motion.div
                  key={`${i}-${log}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={isLatest ? 'text-theme-primary font-bold' : ''}
                >
                  <span className="opacity-50 mr-2">[{1000 + i * 42}]</span>
                  {log}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-1 bg-theme-primary/30 blur-sm z-20 animate-[slide-right_2s_linear_infinite]"
        style={{ animationDuration: '3s' }}
      />
    </motion.div>
  );
};

export default LoadingOverlay;