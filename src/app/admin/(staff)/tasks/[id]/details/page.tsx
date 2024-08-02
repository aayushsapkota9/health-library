'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';

import { useParams } from 'next/navigation';
import {
  IRecordsFormValues,
  RecordsRegistrationForm,
} from '../../create/TaskRegistrationForm';

export default function Page() {
  const params = useParams();

  const handleCreateFormSubmit = async ({
    values,
  }: {
    values: IRecordsFormValues;
  }) => {
    const http = new HttpService();
    let formData = objectToFormData(values);
    const response: any = await http
      .service()
      .patchFormData(apiRoutes.staff.byId(params.id as string), formData);
    return response;
  };
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Records', href: '/admin/records' },
    { title: 'Edit', href: `/admin/records/${params.id}/details` },
  ];
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
    </div>
  );
}
