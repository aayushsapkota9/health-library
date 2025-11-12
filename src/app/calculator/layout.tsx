import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}<footer className='bg-red-800 p-20 m-20'>Aayush is Gay</footer></main>;
}