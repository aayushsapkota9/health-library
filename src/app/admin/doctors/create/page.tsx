'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { ISupplierFromValue, SupplierFrom } from './DoctorRegistrationForm';
import { objectToFormData } from '@/src/utils/formdata.append';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: ISupplierFromValue;
}) => {
  const http = new HttpService();
  let formData = objectToFormData(values);

  const response: any = await http
    .service()
    .postFormData(apiRoutes.doctors.doctors, formData);
  return response;
};

export default function Page() {
  return (
    <FormWrapper headerTitle="Create Supplier">
      <SupplierFrom
        submitTitle={FormTitles.create}
        handleFormSubmit={handleCreateFormSubmit}
      />{' '}
    </FormWrapper>
  );
}
