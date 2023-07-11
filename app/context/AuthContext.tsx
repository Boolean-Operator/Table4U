'use client';

import { useState, createContext, useEffect } from 'react';
import { getCookie } from 'cookies-next';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  data: User | null;
  error: string | null;
  loading: boolean;
  loggedIn: boolean;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  data: null,
  error: null,
  loading: false,
  loggedIn: false,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    data: null,
    error: null,
    loading: true,
    loggedIn: false,
  });

  const fetchCurrentUser = async () => {
    const baseURL = 'http://localhost:3000';
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const jwt = getCookie('jwt');

      if (!jwt) {
        return setAuthState({
          data: null,
          error: null,
          loading: false,
          loggedIn: false,
        });
      }
      const config = {
        method: 'GET',
        headers: { Authorization: `${jwt}` },
      };
      const url = `${baseURL}/api/auth/me`;
      const response = await fetch(url, config);

      // need to set default headers with Authorization

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          data: data,
          error: null,
          loading: false,
          loggedIn: true,
        });
      } else {
        let errMessage = `Michael, There was an error. The response status is ${response.status}: ${response.statusText}`;
        throw new Error(errMessage);
      }
    } catch (error: any) {
      console.error(error);
      setAuthState({
        data: null,
        error: error.message,
        loading: false,
        loggedIn: false,
      });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
