import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  companyName?: string;
  locale: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, companyName: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    if (savedUser && savedRefreshToken) {
      const parsed = JSON.parse(savedUser);
      apiClient.setAccessToken(localStorage.getItem('accessToken'));
      return parsed;
    }
    return null;
  });

  const refreshAuth = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const response = await apiClient.refreshToken(refreshToken);
      apiClient.setAccessToken(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (user && localStorage.getItem('refreshToken')) {
      refreshAuth();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
  const interval = setInterval(() => {
      refreshAuth().catch(() => {
      });
    }, 10 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - accepting any credentials for testing
      const mockUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: email,
        companyName: email === 'demo@invoiceeasy.de' ? 'Demo Bakery' : 'Test Company',
        locale: 'de',
        plan: 'free'
      };
      
      const mockToken = 'mock-access-token-' + Date.now();
      const mockRefreshToken = 'mock-refresh-token-' + Date.now();
      
      apiClient.setAccessToken(mockToken);
      localStorage.setItem('refreshToken', mockRefreshToken);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, companyName: string): Promise<boolean> => {
    try {
      // Mock registration
      const mockUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: email,
        companyName: companyName,
        locale: 'de',
        plan: 'free'
      };
      
      const mockToken = 'mock-access-token-' + Date.now();
      const mockRefreshToken = 'mock-refresh-token-' + Date.now();
      
      apiClient.setAccessToken(mockToken);
      localStorage.setItem('refreshToken', mockRefreshToken);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      apiClient.setAccessToken(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
