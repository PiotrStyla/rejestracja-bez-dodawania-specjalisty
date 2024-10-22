import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, initializeUsersTable, createUser, getUserByEmail } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  createSpecialistAccount: (name: string, email: string, specialization: string) => Promise<any>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateUserMetadata: (metadata: object) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initializeUsersTable();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const dbUser = await getUserByEmail(user.email);
        setUser({ ...user, ...dbUser });
        setIsAuthenticated(true);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const dbUser = await getUserByEmail(session?.user?.email || '');
        setUser({ ...session?.user, ...dbUser });
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const dbUser = await getUserByEmail(email);
    setUser({ ...data.user, ...dbUser });
    setIsAuthenticated(true);
    return { ...data.user, ...dbUser };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const createSpecialistAccount = async (name: string, email: string, specialization: string) => {
    const password = Math.random().toString(36).slice(-8);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    await createUser(email, name, specialization, 'specialist');
    return { user: data.user, password };
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  const updateUserMetadata = async (metadata: object) => {
    const { error } = await supabase.auth.updateUser({ data: metadata });
    if (error) throw error;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    createSpecialistAccount,
    changePassword,
    updateUserMetadata
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;