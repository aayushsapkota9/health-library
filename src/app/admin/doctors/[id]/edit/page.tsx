'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';
import {
  IDoctorFormValues,
  DoctorRegistrationFrom,
} from '../../create/DoctorRegistrationForm';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();

  const handleCreateFormSubmit = async ({
    values,
  }: {
    values: IDoctorFormValues;
  }) => {
    const http = new HttpService();
    let formData = objectToFormData(values);
    const response: any = await http
      .service()
      .patchFormData(
        apiRoutes.doctors.doctorById(params.id as string),
        formData
      );
    return response;
  };
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Doctors', href: '/admin/doctors' },
    { title: 'Edit', href: `/admin/doctors/${params.id}/edit` },
  ];
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <FormWrapper headerTitle="Edit Doctor">
        <DoctorRegistrationFrom
          submitTitle={FormTitles.update}
          handleFormSubmit={handleCreateFormSubmit}
          id={params.id as string}
        />{' '}
      </FormWrapper>
    </div>
  );
}
