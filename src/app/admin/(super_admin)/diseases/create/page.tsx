'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { IDiseasesFormValue, DoctorRegistrationFrom } from './DiseasesForm';
import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IDiseasesFormValue;
}) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .post(apiRoutes.diseases.diseases, values);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Diseases', href: '/admin/diseases' },
  { title: 'Create', href: '/admin/diseases/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Write about a Disease">
        <DoctorRegistrationFrom
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
