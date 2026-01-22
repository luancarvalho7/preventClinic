import React from 'react';
import Logo from './Logo';

export default function PageHeader() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <Logo height="h-5" />
      </div>
    </div>
  );
}
