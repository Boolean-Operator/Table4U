'use client';

import Image from 'next/image';
import ErrorMascot from '../../public/icons/error.png';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={ErrorMascot} alt="Error mascot icon" className="w-56 mb-8" />
      <div className="bg-white px-9 py14 shadow rounded">
        <h3 className="text-3xl font-bold">Danger Will Robinson, Danger!</h3>
        <p className="text-reg font-bold">{error.message}</p>
        <p className="mt-6 text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  );
}