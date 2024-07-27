import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Image } from '@mantine/core';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
interface Disease {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedDate: string | null;
  slug: string;
  name: string;
  html: string;
  references: string;
}

const getTableData = async (id: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.diseases.diseaseById(id)}`, {
        next: {
          cache: 'no-store',
        },
      });
    if (response.status === 404) {
      redirect('/404');
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};

const page = async ({ params }: { params: { id: string } }) => {
  const blogData: Disease = await getTableData(params.id);
  if (!blogData) {
    redirect('/404');
  }
  return (
    <>
      {blogData && (
        <section className="relative bottom-1 mx-2 text-textPrimary">
          <article className="mt-2 flex flex-col  md:block gap-1">
            <div className="mt-2">
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: blogData.html,
                }}
              />
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default page;
