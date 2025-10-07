import React from 'react';
import { User } from '../types';
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { logout } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <span className="text-white text-sm hidden sm:block">{user.displayName}</span>
      <img
        className="h-10 w-10 rounded-full border-2 border-brand-secondary"
        src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
        alt="User avatar"
      />
      <button
        onClick={logout}
        className="p-2 rounded-full text-gray-300 hover:bg-dark-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-white transition"
        aria-label="Sign out"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
};

export default UserProfile;