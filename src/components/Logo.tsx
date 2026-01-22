import React from 'react';

interface LogoProps {
  invert?: boolean;
  height?: string;
}

export default function Logo({ invert = false, height = 'h-8' }: LogoProps) {
  return (
    <div className="flex items-center justify-center">
      <img
        src="https://plataforma.atomeducacional.com.br/atom-logo.svg"
        alt="PREVENT!"
        className={`${height} w-auto object-contain ${invert ? 'invert' : ''}`}
      />
    </div>
  );
}