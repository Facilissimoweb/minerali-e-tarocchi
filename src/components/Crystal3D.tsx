import React from 'react';
import { motion } from 'motion/react';

interface Crystal3DProps {
  shape: 'trigonal' | 'cubic' | 'monoclinic' | 'hexagonal' | 'amorphous' | 'orthorhombic' | 'octahedral' | 'complex';
  color: string;
  size?: number;
}

export const Crystal3D: React.FC<Crystal3DProps> = ({ shape, color, size = 180 }) => {
  // Common animation settings for rotating crystals
  const rotateTransition: any = {
    animate: {
      rotateY: 360,
      rotateX: [0, 10, -10, 0],
    },
    transition: {
      rotateY: {
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      },
      rotateX: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowStyle = {
    filter: `drop-shadow(0 0 15px ${color}40)`
  };

  const renderShape = () => {
    switch (shape) {
      case 'cubic':
        // A faceted cube
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={rotateTransition.animate}
            transition={rotateTransition.transition}
            id={`crystal-cubic-${color}`}
          >
            {/* Front face */}
            <path d="M 25,25 L 75,25 L 75,75 L 25,75 Z" fill={`${color}15`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Top face */}
            <path d="M 25,25 L 50,10 L 100,10 L 75,25 Z" fill={`${color}25`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Right face */}
            <path d="M 75,25 L 100,10 L 100,60 L 75,75 Z" fill={`${color}30`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Inner lines for 3D depth */}
            <line x1="25" y1="75" x2="50" y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="60" x2="100" y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="60" x2="50" y2="10" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
          </motion.svg>
        );

      case 'octahedral':
        // Double pyramid (Fluorite, Magnetite)
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={rotateTransition.animate}
            transition={rotateTransition.transition}
            id={`crystal-octahedral-${color}`}
          >
            {/* Top-front-left face */}
            <path d="M 50,10 L 20,50 L 50,50 Z" fill={`${color}20`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Top-front-right face */}
            <path d="M 50,10 L 80,50 L 50,50 Z" fill={`${color}30`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Bottom-front-left face */}
            <path d="M 50,90 L 20,50 L 50,50 Z" fill={`${color}15`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Bottom-front-right face */}
            <path d="M 50,90 L 80,50 L 50,50 Z" fill={`${color}25`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            
            {/* Back wireframe */}
            <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="0.5" strokeDasharray="1,2" />
            <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="1" />
          </motion.svg>
        );

      case 'hexagonal':
        // Hexagonal prism (Emerald, Aquamarine)
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={rotateTransition.animate}
            transition={rotateTransition.transition}
            id={`crystal-hexagonal-${color}`}
          >
            {/* Top hexagon face */}
            <path d="M 35,15 L 65,15 L 80,25 L 65,35 L 35,35 L 20,25 Z" fill={`${color}30`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Front center prism face */}
            <path d="M 35,35 L 65,35 L 65,80 L 35,80 Z" fill={`${color}15`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Left front prism face */}
            <path d="M 20,25 L 35,35 L 35,80 L 20,70 Z" fill={`${color}20`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Right front prism face */}
            <path d="M 65,35 L 80,25 L 80,70 L 65,80 Z" fill={`${color}25`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Bottom caps */}
            <line x1="35" y1="80" x2="20" y2="70" stroke={color} strokeWidth="1" />
            <line x1="65" y1="80" x2="80" y2="70" stroke={color} strokeWidth="1" />
          </motion.svg>
        );

      case 'trigonal':
        // Trigonal rhombohedron / Quartz double pyramid
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={rotateTransition.animate}
            transition={rotateTransition.transition}
            id={`crystal-trigonal-${color}`}
          >
            {/* Top pyramid facet 1 */}
            <path d="M 50,5 L 25,45 L 50,55 Z" fill={`${color}20`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Top pyramid facet 2 */}
            <path d="M 50,5 L 75,45 L 50,55 Z" fill={`${color}35`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Body facets */}
            <path d="M 25,45 L 50,55 L 50,85 L 25,75 Z" fill={`${color}15`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            <path d="M 50,55 L 75,45 L 75,75 L 50,85 Z" fill={`${color}25`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Bottom point facets */}
            <path d="M 25,75 L 50,85 L 50,95 Z" fill={`${color}10`} stroke={color} strokeWidth="1" />
            <path d="M 50,85 L 75,75 L 50,95 Z" fill={`${color}15`} stroke={color} strokeWidth="1" />
          </motion.svg>
        );

      case 'monoclinic':
      case 'orthorhombic':
        // Elongated tabular slate (Selenite, Moonstone)
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={rotateTransition.animate}
            transition={rotateTransition.transition}
            id={`crystal-monoclinic-${color}`}
          >
            {/* Top slanted plane */}
            <path d="M 25,25 L 60,15 L 85,30 L 50,40 Z" fill={`${color}30`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Left face */}
            <path d="M 25,25 L 50,40 L 50,85 L 25,70 Z" fill={`${color}15`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Right face */}
            <path d="M 50,40 L 85,30 L 85,75 L 50,85 Z" fill={`${color}25`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Back vertical edge */}
            <line x1="60" y1="15" x2="60" y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
          </motion.svg>
        );

      case 'amorphous':
      case 'complex':
      default:
        // Fluid, organic multi-faceted gemstone shape (Opal, Obsidian, Moldavite)
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={glowStyle}
            animate={{
              rotateY: 360,
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            id={`crystal-amorphous-${color}`}
          >
            {/* Faceted geode / abstract cluster */}
            <path d="M 50,15 L 75,30 L 85,55 L 70,80 L 50,85 L 30,80 L 15,55 L 25,30 Z" fill={`${color}10`} stroke={color} strokeWidth="1" strokeLinejoin="round" />
            {/* Inner facet lines radiating from center */}
            <path d="M 50,50 L 50,15 L 75,30 L 50,50 L 85,55 L 70,80 L 50,50 L 50,85 L 30,80 L 50,50 L 15,55 L 25,30 L 50,50 Z" fill="none" stroke={color} strokeWidth="0.75" />
            {/* Shimmer facets */}
            <circle cx="50" cy="50" r="10" fill={`${color}15`} filter="blur(4px)" />
            <circle cx="35" cy="40" r="6" fill={`${color}25`} filter="blur(2px)" />
          </motion.svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center relative select-none" style={{ perspective: '600px' }}>
      {/* Background ambient radial glow */}
      <div 
        className="absolute w-3/4 h-3/4 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: color }}
      />
      {renderShape()}
    </div>
  );
};
