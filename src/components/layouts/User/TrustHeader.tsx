import { Container, Divider, Group } from '@mantine/core';
import {
  IconBooks,
  IconBrandWhatsapp,
  IconCheck,
  IconLock,
  IconMailFast,
} from '@tabler/icons-react';

const TrustHeader = () => {
  return (
    <Container
      className="bg-gradient-to-b from-quaternary to-secondary py-3"
      fluid
      visibleFrom="sm"
      px={{ xs: 20, sm: 50, md: 120 }}
    >
      <Group className="text-textTertiary">
        <span className="flex justify-center gap-1 items-center text-sm">
          {' '}
          <IconCheck size={15}></IconCheck>
          VERIFIED INFORMATION
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center gap-1 items-center text-sm">
          {' '}
          <IconBrandWhatsapp size={15}></IconBrandWhatsapp>
          EMERGENCY SERVICES
        </span>
        <Divider orientation="vertical" />
        <span className="flex justify-center gap-1 items-center text-sm">
          <IconBooks size={20}></IconBooks>
          HEALTH LIBRARY
        </span>
      </Group>
    </Container>
  );
};

export default TrustHeader;
