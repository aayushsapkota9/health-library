import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import { paginationConfig } from '@/src/config/pagination.config';
import { formatTimestampToDate } from '@/src/helpers/DateHelper';
import Loading from '@/src/app/loading';
import { IDiseasesFormValue } from '@/src/app/admin/diseases/create/DiseasesForm';
import Heading from '@/src/components/heading/heading';
import { Card, CardSection, Title } from '@mantine/core';
type ExtraFields = {
  date: string;
  condition: string;
  phoneNo: string;
  index: string;
};
type ColumnKey = keyof IDiseasesFormValue | keyof ExtraFields;
interface Column {
  key: ColumnKey;
  displayName: string;
}
interface Element extends IDiseasesFormValue {
  date: string;
}
const getTableData = async ({ page = 1 }: { page: string | null | number }) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(
      apiRoutes.appointment.get(
        `page=${page}&limit=${paginationConfig.limit}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
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
      date: formatTimestampToDate(item.date),
    };
  });
  console.log(response);
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
    { key: 'phoneNo', displayName: 'Phone Number' },
    { key: 'date', displayName: 'Date' },
    { key: 'condition', displayName: 'Condition' },
  ];

  return (
    <div className=" text-textPrimary  xs:mx-4 sm:mx-16 md:mx-32">
      <Card
        shadow="sm"
        px={'lg'}
        py={'sm'}
        radius="md"
        className="bg-tertiary text-textPrimary"
      >
        <CardSection
          px={10}
          py={10}
          className="flex flex-col gap-3 justify-around"
        >
          {' '}
          <div className="flex gap-4 items-center">
            <Title order={2}>Appointments</Title>
          </div>
          <Suspense fallback={<Loading></Loading>}>
            <CustomTable columns={columns} elements={tableData} />
          </Suspense>
          <CustomPagination totalPages={total} />
        </CardSection>
      </Card>
    </div>
  );
};

export default Supplier;
