import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './HospitalListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../loading';
import { paginationConfig } from '@/src/config/pagination.config';
import { IHospitalFromValue } from './create/HospitalRegistrationForm';
type ColumnKey = keyof IHospitalFromValue | 'index';

interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends IHospitalFromValue {}
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();

  const response: any = await http
    .service()
    .get(
      apiRoutes.hospital.get(
        `page=${page}&limit=${paginationConfig.limit}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
      ),
      {
        next: {
          cache: 'no-store',
        },
      }
    );
  const data: IHospitalFromValue[] = response?.data?.result.map(
    (item: Element) => {
      return {
        ...item,
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
    { key: 'name', displayName: 'Name' },
    { key: 'address', displayName: 'Address' },
    { key: 'phone', displayName: 'Phone' },
    { key: 'noOfGeneralBeds', displayName: 'No. of General Beds' },
    { key: 'noOfICUBeds', displayName: 'No. of ICU Beds' },
    { key: 'noOfEmergencyBeds', displayName: 'No. of Emergency Beds' },
  ];
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Hospitals', href: '/admin/hospitals' },
  ];

  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Hospital'}
        href={'/admin/hospitals/create'}
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
