import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './SupplierClient';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(apiRoutes.doctors.getAllSuppliers(`page=${page}&limit=10`), {
      next: {
        cache: 'no-store',
      },
    });
  const array = addIndicesToElements(response?.data?.result);
  return array;
};
const Supplier = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const tableData = await getTableData({ page: searchParams.page });
  const columns = [
    { key: 'index', displayName: 'Index' },
    { key: 'name', displayName: 'Name' },
    { key: 'address', displayName: 'Address' },
    { key: 'phone', displayName: 'Phone' },
  ];
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Doctors', href: '/admin/doctors' },
  ];

  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Doctor'}
        href={'/admin/doctors/create'}
      ></IndexHeader>
      <CustomTable
        columns={columns}
        elements={tableData}
        actions={SupplierActionButton}
      />
      <CustomPagination totalPages={1} />
    </div>
  );
};

export default Supplier;
