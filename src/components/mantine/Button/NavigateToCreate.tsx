import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import Link from 'next/link';

interface NavigateToCreateProps {
  title: string;
  url: string;
}

const NavigateToCreate = ({ title, url }: NavigateToCreateProps) => {
  return (
    <Button
      radius={'md'}
      size="md"
      variant="outline"
      color={COLOR.secondary}
      component={Link}
      href={url}
    >
      Add {title}
    </Button>
  );
};

export default NavigateToCreate;
