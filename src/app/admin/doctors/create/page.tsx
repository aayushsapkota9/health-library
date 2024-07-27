'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import {
  IDoctorFormValues,
  DoctorRegistrationFrom,
} from './DoctorRegistrationForm';
import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IDoctorFormValues;
}) => {
  const http = new HttpService();
  let formData = objectToFormData(values);

  const response: any = await http
    .service()
    .postFormData(apiRoutes.doctors.doctors, formData);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Doctors', href: '/admin/doctors' },
  { title: 'Create', href: '/admin/doctors/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Create Doctor">
        <DoctorRegistrationFrom
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
