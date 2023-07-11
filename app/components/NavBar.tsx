'use client';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../context/AuthContext';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { deleteCookie } from 'cookies-next';

export default function NavBar() {
  const { data, error, loading, loggedIn, setAuthState } = useContext(
    AuthenticationContext
  );
  const signout = async () => {
    deleteCookie('jwt');

    setAuthState({
      data: null,
      error: null,
      loading: false,
      loggedIn: false,
    });
  };

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex space-x-4 items-center">
          {loggedIn && (
            <button
              className="bg-blue-400 text-white border p-1 px-4 rounded"
              type="button"
              onClick={signout}
            >
              Logout
            </button>
          )}
          {!loggedIn && (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
