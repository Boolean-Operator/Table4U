'use client';
import { useContext, useEffect, useState } from 'react';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import Spinner from './Spinner';

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { error, data, loading } = useContext(AuthenticationContext);

  const { signin, signup } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [invalidInput, setInvalidInput] = useState(true);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setInvalidInput(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setInvalidInput(false);
      }
      setInvalidInput(true);
    }
  }, [inputs, isSignIn]);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <>
      <button
        className={`${renderContent(
          'bg-blue-400 text-white',
          ''
        )}border p-1 px-4 rounded`}
        type="button"
        onClick={handleOpen}
      >
        {renderContent('Sign In', 'Sign Up')}
      </button>
      {showModal && (
        <>
          {/*background-overlay*/}
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-[600px]">
              {/*content container*/}
              <div className="border-0 rounded-lg shadow-lg flex flex-col w-full min-w-[400px] h-full bg-white outline-none focus:outline-none">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {/*header*/}
                    {error && (
                      <div className="flex items-center justify-end p-3 border-b border-solid border-slate-200">
                        <div
                          className="rounded-lg bg-red-200 px-6 py-5 w-full "
                          role="alert"
                        >
                          {error}
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="uppercase text-xl font-semibold">
                        {renderContent(
                          'Log in to Table4U',
                          'Create a Table4U Account'
                        )}
                      </h3>

                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={handleClose}
                      >
                        <span className="text-black capitalize  h-6 w-6 text-2xl block outline-none">
                          X
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <AuthModalInputs
                        inputs={inputs}
                        onInputChange={handleInputChange}
                        isSignin={isSignIn}
                      />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="uppdercase bg-red-600 text-white w-full p-3 text-sm mb-5 disabled:bg-gray-400"
                        disabled={invalidInput}
                        type="button"
                        onClick={handleClick}
                      >
                        {renderContent('Sign In', 'Create Account')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
