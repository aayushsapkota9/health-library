'use client';

import { User } from '@/src/types/user';
import { Burger, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  mobileOpened: boolean;
  toggleMobile: () => void;

  desktopOpened: boolean;
  toggleDesktop: () => void;
  currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
  currentUser,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Group h="100%" px="md" className="flex justify-between">
      <Burger
        opened={mobileOpened}
        onClick={toggleMobile}
        hiddenFrom="sm"
        size="sm"
      />
      <Burger
        opened={desktopOpened}
        onClick={toggleDesktop}
        visibleFrom="sm"
        size="sm"
      />
      <div className="flex justify-center items-center gap-5">
        {' '}
        <div className="hidden md:block md:font-semibold lg:block lg:font-semibold">
          {session?.user.email}
        </div>
        <button
          onClick={() => {
            signOut();
          }}
          className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </Group>
  );
};

export default Header;
