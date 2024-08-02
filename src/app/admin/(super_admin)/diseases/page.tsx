import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './DiseasesListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import Loading from '../../../loading';
import { IDiseasesFormValue } from './create/DiseasesForm';
import { paginationConfig } from '@/src/config/pagination.config';
import { formatTimestampToDate } from '@/src/helpers/DateHelper';
import IndexWrapper from '@/src/components/wrappers/IndexWrapper';
type ExtraFields = {
  index: number;
  createdAt: string;
  slug: string;
};
type ColumnKey = keyof IDiseasesFormValue | keyof ExtraFields;
interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends IDiseasesFormValue {
  createdAt: string;
}
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();

  const response: any = await http
    .service()
    .get(
      apiRoutes.diseases.getAllDiseases(
        `page=${page ? page : 1}&limit=${paginationConfig.limit}&sortBy=${
          paginationConfig.sortBy
        }&sortOrder=${paginationConfig.sortOrder}`
      ),
      {
        next: {
          cache: 'no-store',
        },
      }
    );
  const data: ColumnKey[] = response?.data?.result.map((item: Element) => {
    return {
      ...item,
      createdAt: formatTimestampToDate(item.createdAt),
    };
  });
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
    { key: 'slug', displayName: 'Slug' },
    { key: 'references', displayName: 'References' },
    { key: 'createdAt', displayName: 'Created At' },
  ];
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Diseases', href: '/admin/diseases' },
  ];

  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Diseases'}
        href={'/admin/diseases/create'}
      ></IndexHeader>
      <IndexWrapper>
        <Suspense fallback={<Loading></Loading>}>
          <CustomTable
            columns={columns}
            elements={tableData}
            actions={SupplierActionButton}
          />
        </Suspense>
      </IndexWrapper>
      <CustomPagination totalPages={total} />
    </div>
  );
};

export default Supplier;
