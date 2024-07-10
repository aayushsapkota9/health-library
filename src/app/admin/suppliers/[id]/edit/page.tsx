import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { FormProps, SupplierFrom } from '../../create/SupplierFormComponent';

const handleEditFormSubmit = async ({ values, params }: FormProps) => {
  'use server';
  const http = new HttpService();
  const response: any = await http
    .service()
    .update(apiRoutes.suppliers.suppliersById(params.id), values);
  return response;
};

export default function Page() {
  return (
    <FormWrapper headerTitle="Edit Supplier">
      <SupplierFrom
        submitTitle={FormTitles.update}
        handleFormSubmit={handleEditFormSubmit}
      />{' '}
    </FormWrapper>
  );
}
