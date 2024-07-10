import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { SupplierFrom, SupplierFromValue } from './SupplierFormComponent';

const handleCreateFormSubmit = async ({
  values,
}: {
  values: SupplierFromValue;
}) => {
  'use server';
  const http = new HttpService();
  const response: any = await http
    .service()
    .push(apiRoutes.suppliers.supplier, values);
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
