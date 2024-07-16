'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import {
  ISupplierFromValue,
  SupplierFrom,
} from '../../create/DoctorRegistrationForm';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: ISupplierFromValue;
}) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .update(apiRoutes.doctors.doctors, values);
  return response;
};

export default function Page() {
  return (
    <FormWrapper headerTitle="Edit Supplier">
      <SupplierFrom
        submitTitle={FormTitles.update}
        handleFormSubmit={handleCreateFormSubmit}
      />{' '}
    </FormWrapper>
  );
}
