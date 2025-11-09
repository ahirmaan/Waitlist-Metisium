import React from 'react';

const MetisiumLogo: React.FC = () => {
  const glassEffect = {
    color: 'rgba(240, 240, 255, 0.8)', // Semi-transparent cool white
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.5), 0 0 2px rgba(255, 255, 255, 0.6)',
  };

  return (
    <div className="group text-center">
      <h1 className="font-orbitron font-black text-7xl sm:text-8xl md:text-9xl tracking-wider leading-none">
        <span
          className="transition-all duration-500 group-hover:tracking-widest"
          style={glassEffect}
        >
          METI
        </span>
      </h1>
      <h1 className="font-orbitron font-black text-7xl sm:text-8xl md:text-9xl tracking-wider leading-none">
        <span
          className="transition-all duration-500 group-hover:tracking-widest"
          style={glassEffect}
        >
          SIUM
        </span>
      </h1>
      <div className="absolute inset-0 -z-10 bg-black opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
    </div>
  );
};

export default MetisiumLogo;
