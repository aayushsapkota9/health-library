'use client';
import { sidebarConfig } from '@/src/config/sidebarConfig';
import { COLOR } from '@/src/types/enums/colors.enums';
import { Role } from '@/src/types/enums/Role.enums';
import { NavLink } from '@mantine/core';
import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
interface INavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: INavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLinkActive = (link: string) => {
    return pathname.split('/').includes(link);
  };

  return (
    <>
      {sidebarConfig
        .filter((item) => item.roles.includes(session?.user.role as Role))
        .map((item) => (
          <NavLink
            key={item.label}
            label={item.label}
            color={COLOR.secondary}
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
