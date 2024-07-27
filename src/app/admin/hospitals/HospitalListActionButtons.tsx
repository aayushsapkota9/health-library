'use client';
import NavigateToEdit from '@/src/components/mantine/Button/NavigateToEdit';
import DeletePopover from '@/src/components/mantine/popover/DeletePopover';
import apiRoutes from '@/src/config/api.config';
import React from 'react';

export const SupplierActionButton = ({ id }: { id: string }) => {
  return (
    <>
      <DeletePopover url={apiRoutes.doctors.doctorById(id)}></DeletePopover>
      <NavigateToEdit id={id}></NavigateToEdit>
    </>
  );
};
