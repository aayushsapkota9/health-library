import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './DoctorListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../loading';
import { paginationConfig } from '@/src/config/pagination.config';
import { IDoctorFormValues } from './create/DoctorRegistrationForm';
type ColumnKey = keyof IDoctorFormValues | 'index';

interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends IDoctorFormValues {
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
    .get(
      apiRoutes.doctors.getAllDoctors(
        `page=${page}&limit=${paginationConfig.limit}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
      ),
      {
        next: {
          cache: 'no-store',
        },
      }
    );
  const data: IDoctorFormValues[] = response?.data?.result.map(
    (item: Element) => {
      return {
        ...item,
        fullName: item.user.fullName,
      };
    }
  );
  const indexedElements = addIndicesToElements(data);
  return {
    tableData: indexedElements,
    total: response?.data?.totalCount,
  };
};

const Supplier = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { tableData, total } = await getTableData({ page: searchParams.page });
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

      <CustomPagination totalPages={total} />
    </div>
  );
};

export default Supplier;
