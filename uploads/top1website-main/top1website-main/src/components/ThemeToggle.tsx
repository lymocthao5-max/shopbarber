import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:bg-primary/10"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative h-5 w-5">
        <Sun 
          className={`absolute h-5 w-5 transition-all duration-500 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon 
          className={`absolute h-5 w-5 transition-all duration-500 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Animated background glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20 shadow-lg shadow-blue-400/25'
            : 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 shadow-lg shadow-yellow-400/25'
        }`}
      />
    </Button>
  );
};