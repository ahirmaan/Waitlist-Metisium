import React from 'react';
import MetisiumLogo from './components/MetisiumLogo';
import WaitlistForm from './components/WaitlistForm';

const generateStars = (count: number, sizeClass: string) => {
  return Array.from({ length: count }).map((_, i) => {
    const size = sizeClass === 'small' ? 1 : sizeClass === 'medium' ? 2 : 3;
    return (
      <div
        key={`star-${sizeClass}-${i}`}
        className="absolute bg-white rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * 0.6 + 0.4,
        }}
      />
    );
  });
};

const App: React.FC = () => {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#0A0A18] to-[#1a1a2e] text-white overflow-hidden flex items-center justify-center font-poppins">
      {/* Background Stars - Procedural Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 stars-small">{generateStars(300, 'small')}</div>
        <div className="absolute inset-0 stars-medium">{generateStars(100, 'medium')}</div>
        <div className="absolute inset-0 stars-large">{generateStars(50, 'large')}</div>
      </div>

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] md:w-[60vw] md:h-[60vh] bg-indigo-600/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <MetisiumLogo />
        
        <div className="mt-10 w-full max-w-lg opacity-0 animate-fade-in-delayed-1">
          <WaitlistForm />
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.0s ease-out forwards;
        }
        .animate-fade-in-delayed-1 {
          animation: fade-in 1.0s ease-out 0.8s forwards;
        }

        @keyframes animate-stars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100vh);
          }
        }

        .stars-small > div {
          animation: animate-stars 120s linear infinite;
        }
        .stars-medium > div {
          animation: animate-stars 80s linear infinite;
        }
        .stars-large > div {
          animation: animate-stars 50s linear infinite;
        }

        /* Wrap stars around when they go off screen */
        .stars-small, .stars-medium, .stars-large {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 200%; /* Double height to allow seamless looping */
        }
      `}</style>
    </main>
  );
};

export default App;