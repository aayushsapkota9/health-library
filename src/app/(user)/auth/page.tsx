'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const Page = () => {
  const { data: session } = useSession();

  return (
    <div>
      <button className="text-green-600" onClick={() => signIn()}>
        Sign In
      </button>
      {JSON.stringify(session)}
    </div>
  );
};

export default Page;
