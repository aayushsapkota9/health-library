'use client';
import { sidebarConfig } from '@/src/config/sidebarConfig';
import { COLOR } from '@/src/types/enums/colors.enums';
import { User } from '@/src/types/user';
import { NavLink } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = ({ currentUser }: { currentUser: User | null }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLinkActive = (link: string) => {
    return pathname.split('/').includes(link);
  };

  return (
    <>
      {currentUser && currentUser.name}
      {sidebarConfig.map((item) => (
        <NavLink
          key={item.label}
          label={item.label}
          color={COLOR.primary}
          // href={item.link}
          onClick={() => {
            router.push(item.link);
          }}
          active={isLinkActive(item.key)}
        />
      ))}
    </>
  );
};

export default Navbar;
