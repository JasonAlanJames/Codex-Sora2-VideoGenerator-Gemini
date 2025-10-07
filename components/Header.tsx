import React from 'react';
import { Film } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserProfile from './UserProfile';
import LoadingSpinner from './LoadingSpinner';

const Header: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <header className="bg-dark-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Film className="h-8 w-8 text-brand-primary" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            AI Social Media Video Generator
          </h1>
        </div>
        <div className="flex items-center">
          {loading ? <LoadingSpinner size={6} /> : user ? <UserProfile user={user} /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;