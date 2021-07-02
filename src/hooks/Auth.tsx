import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  UserID: string;
  CompanyID: string;
}

interface LoginCredentials {
  email: string;
  senha: string;
}

interface AuthContextState {
  user: string;
  company: string;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const UserID = localStorage.getItem('@Hypnus:userid');
    const CompanyID = localStorage.getItem('@Hypnus:company');

    if (UserID && CompanyID) {
      // api.defaults.headers.authorization = `Bearer ${token}`;

      return { UserID, CompanyID };
    }

    return {} as AuthState;
  });

  const login = useCallback(async ({ email, senha }) => {
    const response = await api.post('Login', { email, senha });

    const { UserID, CompanyID } = response.data[0];

    localStorage.setItem('@Hypnus:userid', UserID);
    localStorage.setItem('@Hypnus:company', CompanyID);

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ UserID, CompanyID });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@Hypnus:userid');
    localStorage.removeItem('@Hypnus:company');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.UserID, company: data.CompanyID, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
