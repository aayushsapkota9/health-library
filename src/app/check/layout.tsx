'use client';
import Footer from '@/src/components/layouts/User/Footer';
import {
  AppShell,
  AppShellMain,
  Burger,
  Button,
  Divider,
  VisuallyHidden,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      withBorder={false}
      className="text-textPrimary bg-primary font-display "
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <header className="  box-border	mb-2">
        {' '}
        <div className=" flex justify-around items-center lg:justify-between lg:px-10 gap-2 h-20  box-border	">
          <Burger
            color="primary.0"
            opened={opened}
            onClick={toggle}
            hiddenFrom="lg"
            size="md"
            className="text-primary "
            aria-label="Toggle navigation"
          />
          <VisuallyHidden>Toggle</VisuallyHidden>
          <Link href={'/'}>
            <Image
              height={120}
              width={150}
              src={'/H_Library_transparent.png'}
              alt="H Library Logo"
            />
          </Link>
          <div className="flex gap-2 relative right-2">
            <Link href={'/profile'}>
              <Button
                className="bg-primary text-textPrimary"
                radius={'md'}
                size="md"
                px={20}
                variant="outline"
                color="primary.0"
              >
                Login
              </Button>
            </Link>
            <Link href={'/profile'}>
              <Button className="bg-secondary" radius={'md'} size="md" px={20}>
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <AppShell.Navbar
        py="md"
        px={4}
        className="text-textPrimary bg-primary font-display"
        zIndex={999}
      >
        <div>
          {' '}
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="lg"
            size="md"
            color="white"
          />
        </div>
        <div className="flex justify-center">
          <Link href={'/'}>
            <Image
              height={30}
              width={186}
              src={'/toolsmandu-light.png'}
              alt="Toolsmandu Logo"
            />
          </Link>
        </div>
      </AppShell.Navbar>
      <AppShellMain>{children}</AppShellMain>
      <div className="xs:mt-4  md:mt-[4rem]">
        <Footer></Footer>
      </div>
    </AppShell>
  );
}
