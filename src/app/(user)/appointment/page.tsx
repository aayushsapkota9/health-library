import BlogCard from '@/src/components/Cards/BlogCard';
import { CustomPagination } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Box, Title } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IHospitalFromValue } from '../../admin/hospitals/create/HospitalRegistrationForm';
import { paginationConfig } from '@/src/config/pagination.config';
interface IHospitalExtends extends IHospitalFromValue {
  id: string;
}

const getTableData = async (page: string) => {
  const http = new HttpService();

  try {
    const response: any = await http
      .service()
      .get(
        apiRoutes.hospital.get(
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
    const data = response.data;

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};
const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const blogRawData: any = await getTableData(searchParams.page);
  const blogData: IHospitalExtends[] = blogRawData?.result;
  return (
    <>
      <div>
        <div className="bg-primary px-2 py-1 rounded-md flex justify-center xs:mb-3 sm:my-5 lg:my-8">
          <Title order={1} className="  text-textPrimary">
            Book An Appointment
          </Title>
        </div>
      </div>
      {blogData && blogData.length >= 1 ? (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 justify-center">
            {[...blogData].map((blog) => {
              return (
                <div key={blog.id}>
                  <Link href={`/appointment/${blog.id}`} className="py-0">
                    <BlogCard
                      id={blog.id}
                      title={blog.name}
                      imageUrl={blog.image as string}
                      imageAlt="Blog Image"
                      address={blog.address}
                    />
                  </Link>
                </div>
              );
            })}
          </Box>
          <div className="mt-4 ml-4">
            {blogData.length >= 10 ? (
              <CustomPagination totalPages={blogRawData.totalCount} />
            ) : null}{' '}
          </div>
        </section>
      ) : (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 mx-10">
            No Hospitals Found
          </Box>
        </section>
      )}
    </>
  );
};

export default page;
