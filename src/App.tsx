import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { TripPlanner } from './components/TripPlanner';
import { JourneyTimeline } from './components/JourneyTimeline';
import { BookingPage } from './components/BookingPage';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentTripData, setCurrentTripData] = useState<any>(null);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('travelExplorerTheme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check for authentication
    const authStatus = localStorage.getItem('travelExplorerAuth');
    const userData = localStorage.getItem('travelExplorerUser');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('travelExplorerTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('travelExplorerTheme', 'light');
    }
  };

  const handleAuthentication = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('travelExplorerAuth');
    localStorage.removeItem('travelExplorerUser');
    setCurrentPage('home');
  };

  const handlePageChange = (page: string) => {
    // Redirect unauthenticated users trying to access protected pages
    if (!isAuthenticated && ['planner', 'timeline', 'booking', 'profile'].includes(page)) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const handlePlanGenerated = (tripData: any) => {
    setCurrentTripData(tripData);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onPageChange={handlePageChange} />;
      case 'login':
        return (
          <AuthPage
            isLogin={true}
            onPageChange={handlePageChange}
            onAuthenticate={handleAuthentication}
          />
        );
      case 'register':
        return (
          <AuthPage
            isLogin={false}
            onPageChange={handlePageChange}
            onAuthenticate={handleAuthentication}
          />
        );
      case 'planner':
        return (
          <TripPlanner
            onPageChange={handlePageChange}
            onPlanGenerated={handlePlanGenerated}
          />
        );
      case 'timeline':
        return <JourneyTimeline onPageChange={handlePageChange} />;
      case 'booking':
        return <BookingPage onPageChange={handlePageChange} />;
      case 'profile':
        return <ProfilePage onPageChange={handlePageChange} />;
      default:
        return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}