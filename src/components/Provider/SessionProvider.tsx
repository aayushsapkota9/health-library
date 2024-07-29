'use client';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
function NextAuthSessonProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessonProvider;
