import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signOut(): void;
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@gobarber:token');
    const user = localStorage.getItem('@gobarber:user');
    if (token && user) {
      try {
        return {
          token,
          user: JSON.parse(user),
        };
      } catch {
        localStorage.removeItem('@gobarber:user');
      }
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, filteredUserPassword:user } = response.data;

    localStorage.setItem('@gobarber:token', token);
    localStorage.setItem(
      '@gobarber:user',
      JSON.stringify(user),
    );
    setData({ token, user});
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:token');
    localStorage.removeItem('@gobarber:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an Authprovider');
  }
  return context;
}
export { AuthProvider, useAuth };
