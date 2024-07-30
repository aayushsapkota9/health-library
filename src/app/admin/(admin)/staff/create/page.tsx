'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';

import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import {
  IStaffFormValues,
  StaffRegistrationForm,
} from './StaffRegistrationForm';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: IStaffFormValues;
}) => {
  const http = new HttpService();
  let formData = objectToFormData(values);

  const response: any = await http
    .service()
    .postFormData(apiRoutes.staff.base, formData);
  return response;
};
const breadCrumps = [
  { title: 'Admin', href: '/admin/dashboard' },
  { title: 'Staff', href: '/admin/staff' },
  { title: 'Create', href: '/admin/staff/create' },
];

export default function Page() {
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Register Staff">
        <StaffRegistrationForm
          submitTitle={FormTitles.create}
          handleFormSubmit={handleCreateFormSubmit}
        />{' '}
      </FormWrapper>
    </div>
  );
}
