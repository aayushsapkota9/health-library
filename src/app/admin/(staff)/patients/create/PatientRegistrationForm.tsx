'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
import { Gender } from '@/src/types/enums/gender.enums';
import { POSITION } from '@/src/types/enums/position.enums';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  FileInput,
  PasswordInput,
  Select,
  SimpleGrid,
  TextInput,
  MultiSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export interface IPatientFormValues {
  name: '';
  phone: '';
  dateOfBirth: '';
  gender: Gender;
  email: '';
  password: '';
  confirmPassword: '';
}
export interface FormProps {
  values: IPatientFormValues;
}

export const PatientRegistrationForm = ({
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
  const form = useForm<IPatientFormValues>({
    initialValues: {
      name: '',
      phone: '',
      dateOfBirth: '',
      gender: Gender.MALE,
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      dateOfBirth: (value) => (value ? null : 'Date of birth is required'),
      phone: (value) =>
        value.length < 7 ? 'Phone must have at least 7 letters' : null,
      password: (value) =>
        value.length < 8 && !id
          ? 'Password must have at least 8 letters'
          : null,
      confirmPassword: (value, values) =>
        value != values.password && !id ? 'Password does not match' : null,
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.patients.byId(id as string));
    const data = response.data;
    const defaultValues = {
      name: data.name,
      position: data.position,
      phone: data.phone,
      email: data.user.email,
      departments: data.departments.map((d: any) => d.id),
    };
    response?.status === 200 && form.setValues(defaultValues);
  };

  const getHospitalInfo = async () => {
    const http = new HttpService();
    const response: any = await http.service().get(apiRoutes.auth.profile, {
      next: {
        cache: 'no-store',
      },
    });
    form.setFieldValue('hospital', response?.data?.hospitalId);
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
    getHospitalInfo();
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
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Phone No"
            placeholder="98XXXXXXXX"
            required
            withAsterisk
            {...form.getInputProps('phone')}
          />{' '}
          <TextInput
            label="Date of Birth(For age)"
            placeholder="DD/MM/YYYY"
            type="date"
            required
            withAsterisk
            {...form.getInputProps('dateOfBirth')}
          />
          <Select
            label="Gender"
            placeholder="Select a gender"
            data={[
              { label: 'Male', value: Gender.MALE },
              { label: 'Female', value: Gender.FEMALE },
              { label: 'Other', value: Gender.OTHER },
            ]}
            withAsterisk
            required
            {...form.getInputProps('gender')}
          ></Select>
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
        </SimpleGrid>

        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
