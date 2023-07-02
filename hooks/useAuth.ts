const useAuth = () => {
  const baseURL = 'http://localhost:3000';

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${baseURL}/api/auth/signin`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(response);
      // console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error in authorzation');
    }
  };
  const signup = async () => {};

  return {
    signin,
    signup,
  };
};

export default useAuth;
