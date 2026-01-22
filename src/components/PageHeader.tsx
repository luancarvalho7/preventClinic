import React from 'react';
import Logo from './Logo';

export default function PageHeader() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <Logo height="h-5" />
      </div>
    </div>
  );
}
