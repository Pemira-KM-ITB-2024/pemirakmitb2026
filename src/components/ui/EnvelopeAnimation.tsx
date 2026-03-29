import React from "react";

interface EnvelopeProps {
  stage: 1 | 2;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
}

export default function EnvelopeAnimation({ 
  stage, onClick, onMouseEnter, onMouseLeave, className = "" 
}: EnvelopeProps) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {stage === 1 ? (
        <img
          src="/envelope3.png"
          className="absolute inset-0 w-full h-full cursor-pointer z-30" // Hapus transition di sini
          alt="Amplop tertutup"
        />
      ) : (
        <>
          <img
            src="/envelope2.png"
            className="absolute left-1/2 -translate-x-1/2 z-0 w-auto h-auto"
            style={{ bottom: '100%', marginBottom: '-2px' }}
            alt="Amplop belakang"
          />
          <img
            src="/envelope1.png"
            className="absolute inset-0 w-full h-full z-20"
            alt="Amplop depan"
          />
        </>
      )}
    </div>
  );
}