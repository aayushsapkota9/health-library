import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './HospitalListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../../loading';
import { paginationConfig } from '@/src/config/pagination.config';
import { IHospitalFromValue } from './create/HospitalRegistrationForm';
import { getToken, JWT } from 'next-auth/jwt';
import { headers, cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import IndexWrapper from '@/src/components/wrappers/IndexWrapper';
type ExtendedColumns = {
  index: string;
  email: string;
};
type ColumnKey = keyof IHospitalFromValue | keyof ExtendedColumns;

interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends IHospitalFromValue {}
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();
  const jwt: any = await getToken({
    req: {
      headers: Object.fromEntries(headers() as Headers),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    } as unknown as NextRequest,
  });
  const response: any = await http
    .service()
    .serverGet(
      apiRoutes.hospital.get(
        `page=${page ? page : 1}&limit=${paginationConfig.limit}&sortBy=${
          paginationConfig.sortBy
        }&sortOrder=${paginationConfig.sortOrder}`
      ),
      `${jwt.token}`,
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
        email: item.user?.email,
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
    { key: 'email', displayName: 'Email' },
    { key: 'phone', displayName: 'Phone' },
    { key: 'address', displayName: 'Address' },

    { key: 'noOfBeds', displayName: 'No. of Beds' },
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
      <IndexWrapper>
        <Suspense fallback={<Loading></Loading>}>
          <CustomTable
            columns={columns}
            elements={tableData}
            actions={SupplierActionButton}
          />
        </Suspense>{' '}
      </IndexWrapper>
      <CustomPagination totalPages={total} />
    </div>
  );
};

export default Supplier;
