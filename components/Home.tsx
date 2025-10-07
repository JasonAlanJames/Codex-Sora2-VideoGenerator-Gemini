import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import LoadingSpinner from './LoadingSpinner';

const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <LoadingSpinner size={10} />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="text-center w-full flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
        Generate Social Videos with AI
      </h2>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Sign in with your favorite social account to start creating amazing, share-worthy videos in seconds.
      </p>
      <div className="mt-8">
        <Login />
      </div>
    </div>
  );
};

export default Home;