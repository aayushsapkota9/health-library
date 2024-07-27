'use client';
import ProfileHeader from '@/src/components/layouts/User/ProfileHeader';
import { Divider } from '@mantine/core';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="xs:px-[auto] sm:px-[2rem] md:px-[5rem] lg:px-[10rem]  ">
      <ProfileHeader></ProfileHeader>
      <Divider size="xs"></Divider>
      <section className="mt-4">{children}</section>
    </section>
  );
}
