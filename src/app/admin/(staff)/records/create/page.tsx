'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';

import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import {
  IRecordsFormValues,
  RecordsRegistrationForm,
} from './PatientRegistrationForm';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IRecordsFormValues;
}) => {
  const http = new HttpService();

  const response: any = await http
    .service()
    .post(apiRoutes.records.base, values);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Records', href: '/admin/records' },
  { title: 'Create', href: '/admin/records/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Admit a patient">
        <RecordsRegistrationForm
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
