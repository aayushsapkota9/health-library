'use client';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { useRouter } from 'next/navigation';

import {
  Button,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import DeleteButton from '../Button/TableButtons/DeleteButton';

interface PopoverProps {
  url: string;
}
export default function DeletePopover({ url }: PopoverProps) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const deleteSuppliers = async () => {
    const http = new HttpService();
    const response: any = await http.service().remove(url);
    if (response.success) {
      setOpened(false);
      router.refresh();
    }
    showNotificationOnRes(response);
  };

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <PopoverTarget>
        <div onClick={() => setOpened(true)}>
          <DeleteButton></DeleteButton>
        </div>
      </PopoverTarget>
      <PopoverDropdown>
        <Text size="sm">Are you sure you want to delete this?</Text>
        <Group mt="xl">
          <Button onClick={() => setOpened(false)}>No</Button>
          <Button onClick={() => deleteSuppliers()}>Yes</Button>
        </Group>
      </PopoverDropdown>
    </Popover>
  );
}
