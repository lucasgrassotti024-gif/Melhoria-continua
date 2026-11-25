import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener oficial do Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signup = async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (cred.user) {
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      try {
        await sendEmailVerification(cred.user);
      } catch (e) {
        console.warn('[Auth] Não foi possível enviar e-mail de verificação de imediato:', e);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const resendVerificationEmail = async () => {
    if (currentUser) {
      await sendEmailVerification(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAuthenticated: !!currentUser,
        isConfigured: isFirebaseConfigured,
        login,
        signup,
        logout,
        resetPassword,
        resendVerificationEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
