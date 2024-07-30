'use client';
import ErrorText from '@/src/components/Error/ErrorText';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
import { DepartmentValue } from '@/src/types/enums/department.enums';
import { User } from '@/src/types/user';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  AspectRatio,
  FileInput,
  Flex,
  PasswordInput,
  rem,
  SimpleGrid,
  TextInput,
  Text,
  NumberInput,
  Fieldset,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect } from 'react';
interface IUser {
  fullName?: string;
  email: string;
}
export interface IHospitalFromValue {
  name: string;
  address: string;
  phone: string;
  noOfBeds: number;
  logo: File | string;
  departments: DepartmentValue[];
  user?: User;
}
export interface FormProps {
  values: IHospitalFromValue;
}

export const HospitalRegistrationForm = ({
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
  const form = useForm<IHospitalFromValue>({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      noOfBeds: 0,
      logo: '',
      departments: [],
    },
    validate: {
      name: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
      phone: (value) =>
        value.length < 7 ? 'Phone must have at least 7 letters' : null,
      address: (value) =>
        value.length < 2 ? 'Address must have at least 2 letters' : null,
      departments: (value) =>
        value.length < 1 ? 'Please select at least 1 department' : null,
      logo: (value) =>
        typeof value === 'string' && !id ? 'Please select logo' : null,
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.hospital.getById(id as string));
    const data = response.data;
    console.log(data.departments);
    const defaultValues = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      noOfBeds: data.noOfBeds,
      logo: data.logo,
      departments: data.departments.map((item: any) => item.value),
    };
    response?.status === 200 && form.setValues(defaultValues);
  };

  const handleLocalFormSubmit = async () => {
    const response: any = await handleFormSubmit({
      values: form.values,
    });
    if (response?.status === 200 && !id) {
      // form.reset();
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
  const handleDepartment = (departmentValue: DepartmentValue) => {
    const isSelected = form.values.departments.includes(departmentValue);
    if (isSelected) {
      // Remove the department
      form.setFieldValue(
        'departments',
        form.values.departments.filter((value) => value !== departmentValue)
      );
    } else {
      // Add the department
      form.setFieldValue('departments', [
        ...form.values.departments,
        departmentValue,
      ]);
    }
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
            label="Name of hospital"
            placeholder="eg. Kantipur Hospital"
            required
            withAsterisk
            {...form.getInputProps('name')}
          />{' '}
          <TextInput
            label="Address"
            placeholder="Enter hospital's address"
            required
            withAsterisk
            {...form.getInputProps('address')}
          />
          <TextInput
            label="Phone No"
            placeholder="98XXXXXXXX"
            required
            withAsterisk
            {...form.getInputProps('phone')}
          />
          <NumberInput
            label="No. of Beds"
            placeholder="eg. 99"
            required
            withAsterisk
            {...form.getInputProps('noOfBeds')}
          />
          <FileInput
            label="Hospitals's logo"
            required={!id}
            withAsterisk={!id}
            rightSection={
              <>
                <IconUpload></IconUpload>
              </>
            }
            {...form.getInputProps('logo')}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="eg. admin@kantipur.com"
            required
            withAsterisk
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter a Secure Password"
            required
            withAsterisk
            {...form.getInputProps('password')}
          />
        </SimpleGrid>
        <div className="my-4">
          <Text>
            Select the departments <span className="text-red-600">*</span>
          </Text>
          {form.errors.departments && (
            <ErrorText message={form.errors.departments as string}></ErrorText>
          )}
          <Fieldset>
            <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }} className="mt-4">
              {DEPARTMENTS.map((item: any) => {
                return (
                  <div
                    className={`flex justify-between px-2 rounded-lg w-full py-2 hover:cursor-pointer bg-gray-50 ${
                      form.values.departments.includes(item.value)
                        ? 'border-2 border-gray-500'
                        : 'bg-gray-100'
                    }`}
                    key={item.value}
                    onClick={() => handleDepartment(item.value)}
                  >
                    <div className="flex gap-4 flex-1">
                      <AspectRatio
                        ratio={240 / 347}
                        style={{ flex: `0 0 ${rem(100)}` }}
                        maw={'34px'}
                      >
                        <img src={item.image} alt={item.name} />
                      </AspectRatio>

                      <Flex direction={'column'} wrap={'nowrap'}>
                        <Text className="text-textPrimary font-display text-md font-bold">
                          {item.name}
                        </Text>
                      </Flex>
                    </div>
                  </div>
                );
              })}{' '}
            </SimpleGrid>
          </Fieldset>
        </div>

        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
