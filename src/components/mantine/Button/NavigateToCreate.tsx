import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import Link from 'next/link';
import { headers } from 'next/headers';

interface NavigateToCreateProps {
  title: string;
  url: string;
}

const NavigateToCreate = ({ title, url }: NavigateToCreateProps) => {
  return (
    <Button component={Link} href={url} color={COLOR.primary}>
      <IconCirclePlus className="mr-1" /> Add {title}
    </Button>
  );
};

export default NavigateToCreate;
