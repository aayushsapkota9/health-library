'use client';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomPagination } from '@/src/components/mantine';
import NavigateToEdit from '@/src/components/mantine/Button/NavigateToEdit';
import DeletePopover from '@/src/components/mantine/popover/DeletePopover';
import apiRoutes from '@/src/config/api.config';
import React from 'react';

const SupplierClientComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <IndexHeader title="Supplier"></IndexHeader>
      <div>
        {children}
        <CustomPagination totalPages={10} />
      </div>
    </div>
  );
};
export const SupplierActionButton = ({ id }: { id: string }) => {
  return (
    <>
      <DeletePopover
        url={apiRoutes.suppliers.suppliersById(id)}
      ></DeletePopover>
      <NavigateToEdit id={id}></NavigateToEdit>
    </>
  );
};

export default SupplierClientComponent;
