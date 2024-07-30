import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { SupplierActionButton } from './StaffListActionButtons';
import IndexHeader from '@/src/components/heading/indexHeader';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import { Suspense } from 'react';
import { paginationConfig } from '@/src/config/pagination.config';
import { IStaffFormValues } from './create/StaffRegistrationForm';
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
interface Department {
  id: string;
  name: string;
  value: string;
}
interface Element extends Omit<IStaffFormValues, 'departments'> {
  id: string;
  user: {
    id: string;
    role: Role;
    email: string;
  };
  departments: Department[];
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
      apiRoutes.staff.get(
        `page=${page}&limit=${paginationConfig.limit}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
      ),
      jwt.token,
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
    { title: 'Staff', href: '/admin/staff' },
  ];

  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <IndexHeader title={'Staff'} href={'/admin/staff/create'}></IndexHeader>
      <Suspense fallback={<Loading></Loading>}>
        <Table>
          <TableThead>
            <TableTr>
              <TableTh>Index</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Phone</TableTh>
              <TableTh>Email</TableTh>
              <TableTh>Position</TableTh>
              <TableTh>Photo</TableTh>
              <TableTh>Department</TableTh>
              <TableTh>Actions</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {tableData.map((item) => {
              return (
                <TableTr key={item.index}>
                  <TableTd>{item.index}</TableTd>
                  <TableTd>{item.name}</TableTd>
                  <TableTd>{item.phone}</TableTd>
                  <TableTd>{item.user.email}</TableTd>
                  <TableTd>{item.position}</TableTd>
                  <TableTd>
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.photo}`}
                    ></Avatar>
                  </TableTd>
                  <TableTd>
                    {item.departments?.map((item, index) => {
                      return (
                        <Badge color={getColorByIndex(index)} key={index}>
                          {item.value}
                        </Badge>
                      );
                    })}
                  </TableTd>
                  <TableTd>
                    <SupplierActionButton id={item.id}></SupplierActionButton>
                  </TableTd>
                </TableTr>
              );
            })}
          </TableTbody>
        </Table>
      </Suspense>
      <CustomPagination totalPages={total} />
    </div>
  );
};

export default Supplier;
