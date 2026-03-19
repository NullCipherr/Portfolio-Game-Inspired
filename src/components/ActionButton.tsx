import React from 'react';
import { useAudio } from '../hooks/useAudio';

interface ActionButtonProps {
    text: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => {
    const { playSound } = useAudio();

    const handleClick = () => {
        playSound('click');
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => playSound('hover')}
            className="group relative overflow-hidden bg-theme-primary text-black font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                <i className="fas fa-download"></i>
                {text}
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
    );
};

export default ActionButton;