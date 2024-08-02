'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';

import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import {
  IPatientFormValues,
  PatientRegistrationForm,
} from './PatientRegistrationForm';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IPatientFormValues;
}) => {
  const http = new HttpService();

  const response: any = await http
    .service()
    .post(apiRoutes.patients.base, values);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Patients', href: '/admin/patients' },
  { title: 'Create', href: '/admin/patients/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Register Patients">
        <PatientRegistrationForm
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
