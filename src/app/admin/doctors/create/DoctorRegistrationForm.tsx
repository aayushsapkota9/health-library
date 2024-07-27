'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
import { DepartmentValue } from '@/src/types/enums/department.enums';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  AspectRatio,
  FileInput,
  Flex,
  PasswordInput,
  rem,
  Select,
  SimpleGrid,
  TextInput,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export interface IDoctorFormValues {
  fullName: string;
  fullAddress: string;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword?: string;
  organization: string;
  documentFront: File | string;
  documentBack: File | string;
  hospital: string;
  departments: string[];
}
export interface FormProps {
  values: IDoctorFormValues;
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
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const form = useForm<IDoctorFormValues>({
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
      hospital: '',
      departments: [],
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
  const getHospitalData = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(
        apiRoutes.hospital.get(
          `page=${1}&limit=${0}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
        ),
        {
          next: {
            cache: 'no-store',
          },
        }
      );
    const transformedData = response?.data?.result.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setHospitals(transformedData);
  };
  const getDepartmentDataForHospital = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(apiRoutes.hospital.getById(`${form.values.hospital}`), {
        next: {
          cache: 'no-store',
        },
      });
    const filterDepartments = (departmentNames: any) => {
      return DEPARTMENTS.filter(
        (department) =>
          departmentNames?.includes(department?.name?.toLowerCase())
      );
    };
    const availableDepartments = response?.data?.departments.map(
      (item: any) => item.value
    );

    const departments = filterDepartments(availableDepartments);
    if (availableDepartments?.length >= 1) {
      setDepartments(departments as any);
    }
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

  const handleLocalFormSubmit = async () => {
    const response: any = await handleFormSubmit({
      values: form.values,
    });
    if (response?.status === 200 && !id) {
      form.reset();
      setDepartments([]);
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
    getHospitalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getDepartmentDataForHospital();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.hospital]);

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
            label="College/Organization"
            placeholder="Enter your college/organization"
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
        <SimpleGrid>
          <Select
            label="Select the hospital"
            placeholder="eg. Kantipur Hospital"
            required
            withAsterisk
            data={hospitals}
            {...form.getInputProps('hospital')}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }} className="mt-2">
          {departments.map((item: any) => {
            return (
              <div
                className={`flex justify-between px-2 rounded-lg w-full py-2 hover:cursor-pointer bg-gray-50 ${
                  form.values.departments.includes(item.value)
                    ? 'border-2 border-gray-500'
                    : 'bg-primary'
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
          })}
        </SimpleGrid>
        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
