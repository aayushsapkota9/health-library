'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { SimpleGrid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export interface SupplierFromValue {
  name: string;
  address: string;
  phone: string;
}
export interface FormProps {
  values: SupplierFromValue;
  params: { id: string };
}

export const SupplierFrom = ({
  submitTitle,
  handleFormSubmit,
}: {
  submitTitle: string;
  handleFormSubmit: ({
    values, // eslint-disable-line no-unused-vars
    params, // eslint-disable-line no-unused-vars
  }: FormProps) => void;
}) => {
  const params = useParams<{ id: string }>();
  const form = useForm<SupplierFromValue>({
    initialValues: {
      name: '',
      address: '',
      phone: '',
    },
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      address: (value) =>
        value.length < 2 ? 'Address must have at least 2 letters' : null,
      phone: (value) =>
        value.length < 7 ? 'Phone must have at least 7 letters' : null,
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.suppliers.suppliersById(params.id));
    response?.status === 200 && form.setValues(response.data);
  };

  const handleLocalFormSubmit = async () => {
    const response: any = await handleFormSubmit({
      values: form.values,
      params,
    });
    if (response?.status === 200 && !params.id) {
      form.reset();
    }
    showNotificationOnRes(response);
  };
  useEffect(() => {
    params.id && getFieldData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleLocalFormSubmit)}>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            required
            withAsterisk
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Address"
            placeholder="Enter your address"
            required
            withAsterisk
            {...form.getInputProps('address')}
          />

          <TextInput
            label="Phone"
            placeholder="Enter your phone number"
            required
            withAsterisk
            {...form.getInputProps('phone')}
          />
        </SimpleGrid>
        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
