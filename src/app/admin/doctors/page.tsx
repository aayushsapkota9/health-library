import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './DoctorListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../loading';
import { ISupplierFromValue } from './create/DoctorRegistrationForm';
type ColumnKey = keyof ISupplierFromValue | 'index';

interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends ISupplierFromValue {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();

  const response: any = await http
    .service()
    .get(apiRoutes.doctors.getAllDoctors(`page=${page}&limit=10`), {
      next: {
        cache: 'no-store',
      },
    });
  const data: ISupplierFromValue[] = response?.data?.result.map(
    (item: Element) => {
      return {
        ...item,
        fullName: item.user.fullName,
      };
    }
  );
  const indexedElements = addIndicesToElements(data);
  return indexedElements;
};

const Supplier = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const tableData = await getTableData({ page: searchParams.page });
  const columns: Column[] = [
    { key: 'index', displayName: 'Index' },
    { key: 'fullName', displayName: 'Name' },
    { key: 'fullAddress', displayName: 'Address' },
    { key: 'phoneNo', displayName: 'Phone' },
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
      <Suspense fallback={<Loading></Loading>}>
        <CustomTable
          columns={columns}
          elements={tableData}
          actions={SupplierActionButton}
        />
      </Suspense>
      <CustomPagination totalPages={1} />
    </div>
  );
};

export default Supplier;
