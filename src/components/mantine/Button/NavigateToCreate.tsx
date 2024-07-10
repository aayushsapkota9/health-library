import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigateToCreateProps {
  title: string;
}

const NavigateToCreate = ({ title }: NavigateToCreateProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  return (
    <Button
      component={Link}
      href={`${pathname}/create${page ? `?page=${page}` : ''}`}
      color={COLOR.primary}
    >
      <IconCirclePlus className="mr-1" /> Add {title}
    </Button>
  );
};

export default NavigateToCreate;
