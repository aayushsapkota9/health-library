'use client';
import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
import { IconList } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface NavigateToIndexProps {
  title: string;
}

const NavigateToCreate = () => {
  const router = useRouter();
  const pathname = usePathname();
  let updatedPathname = '';
  if (pathname.split('/').includes('edit')) {
    // If "/edit" exists in the pathname, remove "id" and "edit"
    // eslint-disable-next-line no-useless-escape
    updatedPathname = pathname.replace(/\/[^\/]+\/edit$/, '');
  } else if (pathname.split('/').includes('create')) {
    // If "/create" exists in the pathname, remove "/create" and "id"
    // eslint-disable-next-line no-useless-escape
    updatedPathname = pathname.replace(/\/create(\/[^\/]+)?$/, '');
  } else {
    // "/edit" or "/create" does not exist in the pathname keep the path as it is
    updatedPathname = pathname;
  }

  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  return (
    <Button
      onClick={() => {
        router.push(`${updatedPathname}${page ? `?page=${page}` : ''}`);
      }}
      color={COLOR.secondary}
      radius={'md'}
      size="md"
      variant="outline"
    >
      <IconList className="mr-1" /> Go Back
    </Button>
  );
};

export default NavigateToCreate;
