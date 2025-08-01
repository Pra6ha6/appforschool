import React from 'react';
import { Dumbbell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FitGenius
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              Features
            </a>
            <a href="#generator" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;