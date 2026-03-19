import React from 'react';

interface AnimatedLogoProps {
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ onClick }) => {
    return (
        <a 
            href="#home" 
            onClick={onClick}
            className="text-xl animated-logo cursor-pointer"
            aria-label="Homepage"
        >
            AC
        </a>
    );
};

export default AnimatedLogo;