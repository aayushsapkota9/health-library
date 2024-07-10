'use client';
import Header from '@/src/components/layouts/header';
import Navbar from '@/src/components/layouts/navbar';
import { useCurrentUser } from '@/src/hooks/auth/useCurrentUser';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { user: currentUser } = useCurrentUser();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Header
          mobileOpened={mobileOpened}
          toggleMobile={toggleMobile}
          desktopOpened={desktopOpened}
          toggleDesktop={toggleDesktop}
          currentUser={currentUser}
        />
      </AppShellHeader>
      <AppShellNavbar p="md">
        <Navbar currentUser={currentUser} />
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
