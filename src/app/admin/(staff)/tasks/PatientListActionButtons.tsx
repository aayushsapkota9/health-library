'use client';
import NavigateToEdit from '@/src/components/mantine/Button/NavigateToEdit';
import DeletePopover from '@/src/components/mantine/popover/DeletePopover';
import apiRoutes from '@/src/config/api.config';
import { IconEyeCheck } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export const PatientActionButtons = ({ id }: { id: string }) => {
  return (
    <div className="flex ">
      <Link href={`/admin/records/${id}/details`}>
        <IconEyeCheck></IconEyeCheck>
      </Link>
      <DeletePopover url={apiRoutes.tasks.byId(id)}></DeletePopover>
      <NavigateToEdit id={id}></NavigateToEdit>
    </div>
  );
};
