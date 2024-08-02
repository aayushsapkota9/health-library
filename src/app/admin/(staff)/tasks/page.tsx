import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { PatientActionButtons } from './PatientListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import { paginationConfig } from '@/src/config/pagination.config';
import { IRecordsFormValues } from './create/TaskRegistrationForm';
import { getToken } from 'next-auth/jwt';
import { headers, cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  Avatar,
  Badge,
  SegmentedControl,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { Role } from '@/src/types/enums/Role.enums';
import {
  getColorByIndex,
  getColorByStatus,
  getColorByTime,
} from '@/src/helpers/Color.helper';
import Loading from '../../../loading';
import IndexWrapper from '@/src/components/wrappers/IndexWrapper';
import { Gender } from '@/src/types/enums/gender.enums';
import {
  calculateRemainingTime,
  formatTimestampToDateTime,
} from '@/src/helpers/DateHelper';
import { TaskStatus } from '@/src/types/enums/status.enums';
import CustomSegmentedControl from './SegmentedControl';
interface Department {
  id: string;
  name: string;
  value: string;
}
interface Element extends Omit<IRecordsFormValues, 'patient'> {
  id: string;
  createdAt: string;
  symptoms: Array<string>;

  record: {
    id: string;
    status: string;
    patient: {
      id: string;
      name: string;
      email: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
}
const getTableData = async ({
  page = 1,
  status = TaskStatus.PENDING,
}: {
  page: string | null | number;
  status: TaskStatus;
}) => {
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
      apiRoutes.tasks.getByStatus(
        status,
        `page=${page ? page : 1}&limit=${
          paginationConfig.limit
        }&sortBy=${'dueDate'}&sortOrder=${'ASC'}`
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
  searchParams: { page: string; status: TaskStatus };
}) => {
  const { tableData, total } = await getTableData({
    page: searchParams.page,
    status: searchParams.status,
  });

  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Records', href: '/admin/records' },
  ];

  return (
    <>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader
        title={'Task/Visit'}
        href={'/admin/tasks/create'}
      ></IndexHeader>
      <IndexWrapper>
        <CustomSegmentedControl></CustomSegmentedControl>
        <div>
          <Suspense fallback={<Loading></Loading>}>
            <Table>
              <TableThead>
                <TableTr>
                  <TableTh>Index</TableTh>
                  <TableTh>Task Name</TableTh>
                  <TableTh>Patient Name</TableTh>
                  <TableTh>Status</TableTh>
                  <TableTh>Created At</TableTh>
                  <TableTh>Due Date</TableTh>
                  <TableTh>Due Time</TableTh>
                  <TableTh>Remaining Time</TableTh>
                  <TableTh>Actions</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {tableData.length >= 1 ? (
                  tableData.map((item) => {
                    return (
                      <TableTr key={item.index}>
                        <TableTd>{item.index}</TableTd>
                        <TableTd>{item.name}</TableTd>
                        <TableTd>{`${item?.record?.patient?.name}-${item.record.patient.user.email}`}</TableTd>
                        <TableTd>
                          <Badge color={getColorByStatus(item.status)}>
                            {item.status}
                          </Badge>
                        </TableTd>
                        <TableTd>
                          {formatTimestampToDateTime(item.createdAt)}
                        </TableTd>
                        <TableTd>{item.dueDate}</TableTd>
                        <TableTd>{item.dueTime}</TableTd>
                        <TableTd>
                          <Badge
                            color={getColorByTime(
                              calculateRemainingTime(item.dueDate, item.dueTime)
                                .remainingHours
                            )}
                          >
                            {' '}
                            {
                              calculateRemainingTime(item.dueDate, item.dueTime)
                                .displayValue
                            }
                          </Badge>{' '}
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
