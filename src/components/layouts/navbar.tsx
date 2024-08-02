'use client';
import { sidebarConfig } from '@/src/config/sidebarConfig';
import { COLOR } from '@/src/types/enums/colors.enums';
import { Role } from '@/src/types/enums/Role.enums';
import { Divider, NavLink } from '@mantine/core';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
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
    <div>
      <div>
        <Link href={'/'} className="flex justify-center mb-2">
          <Image
            height={100}
            width={100}
            src={'/H_Library_transparent.png'}
            alt="H Library Logo"
          />
        </Link>
      </div>
      <Divider></Divider>
      <div className=" ml-4 pt-4">
        {sidebarConfig.map((item) => {
          const isDisabled = !item.roles.includes(session?.user.role as Role);
          return (
            <NavLink
              disabled={isDisabled}
              leftSection={item.icon}
              key={item.label}
              label={item.label}
              description={item.description}
              color={COLOR.secondary}
              onClick={() => {
                router.push(item.link);
              }}
              active={isLinkActive(item.key)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
