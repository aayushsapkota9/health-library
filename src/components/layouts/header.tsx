'use client';

import { User } from '@/src/types/user';
import { Avatar, Burger, Button, Group, Popover, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { COLOR } from '@/src/types/enums/colors.enums';
import { IconArrowDown, IconChevronDown } from '@tabler/icons-react';

interface HeaderProps {
  mobileOpened: boolean;
  toggleMobile: () => void;
  desktopOpened: boolean;
  toggleDesktop: () => void;
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
  session,
}) => {
  const router = useRouter();
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
      <div className=" mr-6">
        {' '}
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="lg"
          offset={18}
        >
          <Popover.Target>
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              <Avatar
                src={
                  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
                }
              ></Avatar>
              <div className="flex gap-1 text-secondary  ">
                <Text className="font-semibold text-lg">
                  {session?.user.name
                    ?.split(' ')
                    ?.map((word) => word[0].toUpperCase())
                    ?.join('')}
                </Text>
                <IconChevronDown className="mt-[2px]"></IconChevronDown>
              </div>
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <div>
              <div className="font-semibold text-center">
                Welcome {session?.user.name}!
              </div>
              <Button
                fullWidth
                variant="outline"
                color={COLOR.secondary}
                onClick={async () => {
                  await signOut().then(() => router.push('/api/auth/signin'));
                }}
                className="mt-2 py-2 px-4 rounded cursor-pointer"
              >
                Logout
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </Group>
  );
};

export default Header;
