
import React from 'react';

export const Terminal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-white shadow-lg">
      <div className="flex gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export const TerminalLine = ({ prefix = ">>>", children }: { prefix?: string; children: React.ReactNode }) => {
  return (
    <div className="flex gap-4">
      <span className="text-pythonYellow">{prefix}</span>
      <span className="text-pythonLightBlue">{children}</span>
    </div>
  );
};
