import React from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Moon, Sun, MapPin, User, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function Navigation({ 
  currentPage, 
  onPageChange, 
  isDarkMode, 
  onThemeToggle, 
  isAuthenticated,
  onLogout 
}: NavigationProps) {
  const navItems = isAuthenticated ? [
    { id: 'home', label: 'Home', icon: MapPin },
    { id: 'planner', label: 'Trip Planner', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ] : [
    { id: 'home', label: 'Home', icon: MapPin },
  ];

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8" style={{ color: '#314F40' }} />
            <h1 
              className="text-xl font-bold cursor-pointer hover-glow"
              style={{ color: '#314F40' }}
              onClick={() => onPageChange('home')}
            >
              Travel Explorer
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-[#314F40] text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-[#7EAF96] hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={onThemeToggle}
              />
              <Moon className="h-4 w-4" />
            </div>

            {isAuthenticated ? (
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="hover-glow"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={() => onPageChange('login')}
                  variant="outline"
                  size="sm"
                  className="hover-glow"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onPageChange('register')}
                  size="sm"
                  className="hover-scale"
                  style={{ backgroundColor: '#314F40' }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}