import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';

type AuthProvider = 'google' | 'facebook' | 'instagram';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (provider: AuthProvider) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    loading: true,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);
  
  const login = useCallback((provider: AuthProvider) => {
    // This is a MOCKED login flow for demonstration purposes.
    // In a real app, this would involve a full OAuth 2.0 flow.
    const mockUser: User = {
        uid: `mock-${Date.now()}`,
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: `https://i.pravatar.cc/150?u=demo`,
        providerId: provider,
    };
    
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authUser');
    setUser(null);
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};