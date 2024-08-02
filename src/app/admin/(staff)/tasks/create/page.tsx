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
} from './TaskRegistrationForm';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IRecordsFormValues;
}) => {
  const http = new HttpService();

  const response: any = await http.service().post(apiRoutes.tasks.base, values);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Tasks', href: '/admin/tasks' },
  { title: 'Create', href: '/admin/tasks/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Create and assign tasks">
        <RecordsRegistrationForm
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
