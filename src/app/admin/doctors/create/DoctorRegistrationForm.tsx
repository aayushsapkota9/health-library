'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { FileInput, PasswordInput, SimpleGrid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect } from 'react';

export interface ISupplierFromValue {
  fullName: string;
  fullAddress: string;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword?: string;
  organization: string;
  documentFront: File | string;
  documentBack: File | string;
}
export interface FormProps {
  values: ISupplierFromValue;
}

export const DoctorRegistrationFrom = ({
  submitTitle,
  handleFormSubmit,
  id,
}: {
  submitTitle: string;
  handleFormSubmit: ({
    values, // eslint-disable-line no-unused-vars
  }: FormProps) => void;
  id?: string;
}) => {
  const form = useForm<ISupplierFromValue>({
    initialValues: {
      fullName: '',
      fullAddress: '',
      phoneNo: '',
      email: '',
      password: '',
      confirmPassword: '',
      organization: '',
      documentFront: '',
      documentBack: '',
    },
    validate: {
      fullName: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      fullAddress: (value) =>
        value.length < 2 ? 'Address must have at least 2 letters' : null,
      phoneNo: (value) =>
        value.length < 7 ? 'Phone must have at least 7 letters' : null,
      password: (value) =>
        value.length < 8 && !id
          ? 'Password must have at least 8 letters'
          : null,
      confirmPassword: (value, values) =>
        value != values.password && !id ? 'Password does not match' : null,
      organization: (value) =>
        value.length < 2 && !id
          ? 'Organization must have at least 2 letters'
          : null,
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.doctors.doctorById(id as string));
    const data = response.data;
    const defaultValues = {
      fullName: data.user.fullName,
      email: data.user.email,
      fullAddress: data.fullAddress,
      phoneNo: data.phoneNo,
      organization: data.organization,
      documentFront: data.documentFront,
      documentBack: data.documentBack,
    };
    response?.status === 200 && form.setValues(defaultValues);
  };

  const handleLocalFormSubmit = async () => {
    const response: any = await handleFormSubmit({
      values: form.values,
    });
    if (response?.status === 200 && !id) {
      form.reset();
    }
    if (
      response.statusCode === 400 &&
      response.errorFields &&
      response.errorFields.length >= 1
    ) {
      response.errorFields.forEach(
        (item: { field: string; message: string }) => {
          form.setFieldError(`${item.field}`, item.message);
        }
      );
    }
    showNotificationOnRes(response);
  };
  useEffect(() => {
    id && getFieldData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleLocalFormSubmit)}>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }}>
          <TextInput
            label="Full Name"
            placeholder="Enter your name"
            required
            withAsterisk
            {...form.getInputProps('fullName')}
          />{' '}
          <TextInput
            label="Address"
            placeholder="Enter your address"
            required
            withAsterisk
            {...form.getInputProps('fullAddress')}
          />
          <TextInput
            label="Organization"
            placeholder="Enter your organization"
            required
            withAsterisk
            {...form.getInputProps('organization')}
          />
          <TextInput
            label="Phone No"
            placeholder="98XXXXXXXX"
            required
            withAsterisk
            {...form.getInputProps('phoneNo')}
          />
          <TextInput
            label="Email"
            placeholder="johndoe@example.com"
            type="email"
            required
            withAsterisk
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required={!id}
            withAsterisk={!id}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required={!id}
            withAsterisk={!id}
            {...form.getInputProps('confirmPassword')}
          />
          <FileInput
            label="Document Front"
            required={!id}
            withAsterisk={!id}
            rightSection={
              <>
                <IconUpload></IconUpload>
              </>
            }
            {...form.getInputProps('documentFront')}
          />
          <FileInput
            label="Document Back"
            required={!id}
            withAsterisk={!id}
            rightSection={
              <>
                <IconUpload></IconUpload>
              </>
            }
            {...form.getInputProps('documentBack')}
          />
        </SimpleGrid>
        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
