import React from 'react';
interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

export default function AuthModalInputs({
  inputs,
  onInputChange,
  isSignin,
}: Props) {
  return (
    <div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstName}
            name="firstName"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            name="lastName"
            onChange={onInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={onInputChange}
        />
      </div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            name="phone"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={onInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
