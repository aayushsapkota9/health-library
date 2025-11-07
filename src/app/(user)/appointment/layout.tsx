import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="xs:px-[auto] sm:px-[2rem] md:px-[5rem] lg:px-[8rem]  ">
      <section className=" ">{children}</section>
    </section>
  );
}
