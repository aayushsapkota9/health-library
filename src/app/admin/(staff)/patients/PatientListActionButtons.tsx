'use client';
import NavigateToEdit from '@/src/components/mantine/Button/NavigateToEdit';
import DeletePopover from '@/src/components/mantine/popover/DeletePopover';
import apiRoutes from '@/src/config/api.config';
import React from 'react';

export const PatientActionButtons = ({ id }: { id: string }) => {
  return (
    <div className="flex ">
      <DeletePopover url={apiRoutes.patients.byId(id)}></DeletePopover>
      <NavigateToEdit id={id}></NavigateToEdit>
    </div>
  );
};
