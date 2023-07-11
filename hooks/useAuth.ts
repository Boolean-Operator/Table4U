import { AuthenticationContext } from '@/app/context/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const baseURL = 'http://localhost:3000';
  const { error, loading, data, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
      loggedIn: false,
    });

    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      };
      const url = `${baseURL}/api/auth/signin`;

      const response = await fetch(url, config);
      console.log(response);

      if (response.ok) {
        console.log('Iamhere');
        const data = await response.json();
        setAuthState({
          data: data,
          error: null,
          loading: false,
          loggedIn: true,
        });
        handleClose();
      } else {
        let errMessage = `Michael, There was an error. The response status is ${response.status}: ${response.statusText}`;
        throw new Error(errMessage);
      }
    } catch (error: any) {
      console.error('Killroy was here');
      setAuthState({
        data: null,
        error: error.message,
        loading: false,
        loggedIn: false,
      });
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
      loggedIn: false,
    });

    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }),
        headers: { 'Content-Type': 'application/json' },
      };
      const url = `${baseURL}/api/auth/signup`;

      const response = await fetch(url, config);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          data: data,
          error: null,
          loading: false,
          loggedIn: true,
        });
        handleClose();
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

  return {
    signin,
    signup,
  };
};

export default useAuth;
