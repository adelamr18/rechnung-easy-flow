import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const expiryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    if (savedUser && savedRefreshToken) {
      const parsed = JSON.parse(savedUser);
      const savedAccessToken = localStorage.getItem('accessToken');
      apiClient.setAccessToken(savedAccessToken);
      return parsed;
    }
    return null;
  });

  const clearExpiryTimer = useCallback(() => {
    if (expiryTimeoutRef.current) {
      clearTimeout(expiryTimeoutRef.current);
      expiryTimeoutRef.current = null;
    }
  }, []);

  const logout = useCallback(async () => {
    clearExpiryTimer();
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
  }, [clearExpiryTimer]);

  const handleTokenExpired = useCallback(() => {
    toast({
      title: 'Session expired',
      description: 'Your token has expired. Please login again.',
      variant: 'destructive',
    });
    void logout();
  }, [logout, toast]);

  const scheduleTokenExpiry = useCallback((token: string | null) => {
    clearExpiryTimer();
    if (!token) return;

    try {
      const [, payloadBase64] = token.split('.');
      const payloadJson = JSON.parse(
        atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      );
      if (!payloadJson.exp) return;

      const expiresInMs = payloadJson.exp * 1000 - Date.now();
      if (expiresInMs <= 0) {
        handleTokenExpired();
        return;
      }

      expiryTimeoutRef.current = setTimeout(handleTokenExpired, expiresInMs);
    } catch {
      // ignore decoding errors
    }
  }, [clearExpiryTimer, handleTokenExpired]);

  const refreshAuth = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const response = await apiClient.refreshToken(refreshToken);
      apiClient.setAccessToken(response.accessToken);
      scheduleTokenExpiry(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      if (error?.status === 401) {
        toast({
          title: 'Session expired',
          description: 'Your token has expired. Please login again.',
          variant: 'destructive',
        });
      }
      logout();
    }
  };

  useEffect(() => {
    apiClient.setUnauthorizedHandler((message) => {
      toast({
        title: 'Unauthorized',
        description: message || 'You are not authorized. Please login again.',
        variant: 'destructive',
      });
      void logout();
    });

    return () => apiClient.setUnauthorizedHandler(null);
  }, [logout, toast]);

  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    if (savedAccessToken) {
      scheduleTokenExpiry(savedAccessToken);
    }
    if (user && localStorage.getItem('refreshToken')) {
      refreshAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      refreshAuth().catch(() => {
        // handled inside refreshAuth
      });
    }, 15 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.login(email, password);
      apiClient.setAccessToken(response.accessToken);
      scheduleTokenExpiry(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, companyName: string): Promise<boolean> => {
    try {
      const response = await apiClient.register(email, password, companyName);
      apiClient.setAccessToken(response.accessToken);
      scheduleTokenExpiry(response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
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
