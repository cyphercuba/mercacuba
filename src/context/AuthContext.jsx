import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, logoutUser } from '../lib/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result?.ok && result.user) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const signOut = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, refreshUser, signOut, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
