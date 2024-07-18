import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './DiseasesListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../loading';
import { ISupplierFromValue } from './create/DiseasesForm';
import { paginationConfig } from '@/src/config/pagination.config';
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
  const data: ISupplierFromValue[] = response?.data?.result.map(
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
  const columns: Column[] = [{ key: 'index', displayName: 'Index' }];
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Doctors', href: '/admin/diseases' },
  ];

  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Diseases'}
        href={'/admin/diseases/create'}
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
