import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { PatientActionButtons } from './PatientListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import { paginationConfig } from '@/src/config/pagination.config';
import { IRecordsFormValues } from './create/PatientRegistrationForm';
import { getToken } from 'next-auth/jwt';
import { headers, cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  Avatar,
  Badge,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { Role } from '@/src/types/enums/Role.enums';
import { getColorByIndex } from '@/src/helpers/Color.helper';
import Loading from '../../../loading';
import IndexWrapper from '@/src/components/wrappers/IndexWrapper';
import { Gender } from '@/src/types/enums/gender.enums';
import { formatTimestampToDateTime } from '@/src/helpers/DateHelper';
interface Department {
  id: string;
  name: string;
  value: string;
}
interface Element extends Omit<IRecordsFormValues, 'patient'> {
  id: string;
  createdAt: string;
  symptoms: Array<string>;
  patient: {
    id: string;
    name: string;
    role: Role;
    phone: string;
    gender: Gender;
  };
}
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
      apiRoutes.records.get(
        `page=${page ? page : 1}&limit=${paginationConfig.limit}&sortBy=${
          paginationConfig.sortBy
        }&sortOrder=${paginationConfig.sortOrder}`
      ),
      jwt?.token,
      {
        next: {
          cache: 'no-store',
        },
      }
    );
  const data: Element[] = response?.data?.result.map((item: Element) => {
    return {
      ...item,
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

  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Records', href: '/admin/records' },
  ];

  return (
    <>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Record'}
        href={'/admin/records/create'}
      ></IndexHeader>
      <IndexWrapper>
        <div>
          <Suspense fallback={<Loading></Loading>}>
            <Table>
              <TableThead>
                <TableTr>
                  <TableTh>Index</TableTh>
                  <TableTh>Name</TableTh>
                  <TableTh>Phone No</TableTh>
                  <TableTh>Admitted At</TableTh>
                  <TableTh>Symptoms</TableTh>
                  <TableTh>Actions</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {tableData.length >= 1 ? (
                  tableData.map((item) => {
                    return (
                      <TableTr key={item.index}>
                        <TableTd>{item.index}</TableTd>
                        <TableTd>{item.patient.name}</TableTd>
                        <TableTd>{item.patient.phone}</TableTd>
                        <TableTd>
                          {formatTimestampToDateTime(item.createdAt)}
                        </TableTd>
                        <TableTd>
                          {item.symptoms.map((item) => (
                            <Badge
                              className="ml-1"
                              key={item}
                              color="yellow"
                              size="lg"
                              radius={'md'}
                            >
                              {item}
                            </Badge>
                          ))}
                        </TableTd>
                        <TableTd>
                          <PatientActionButtons
                            id={item.id}
                          ></PatientActionButtons>
                        </TableTd>
                      </TableTr>
                    );
                  })
                ) : (
                  <TableTr>
                    <TableTd colSpan={5}>
                      {' '}
                      There is no data in this table
                    </TableTd>
                  </TableTr>
                )}
              </TableTbody>
            </Table>
          </Suspense>
        </div>
      </IndexWrapper>
      <CustomPagination totalPages={total} />
    </>
  );
};

export default Supplier;
