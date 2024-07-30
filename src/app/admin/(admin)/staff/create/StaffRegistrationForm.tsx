'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
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

export interface IStaffFormValues {
  name: '';
  position: '';
  phone: '';
  email: '';
  password: '';
  confirmPassword: '';
  photo: File | string;
  hospital: string;
  departments: string[];
}
export interface FormProps {
  values: IStaffFormValues;
}

export const StaffRegistrationForm = ({
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
  const form = useForm<IStaffFormValues>({
    initialValues: {
      name: '',
      position: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      photo: '',
      hospital: '',
      departments: [],
    },
    validate: {
      name: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
      position: (value) =>
        value.length < 2 ? 'Please select a position' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) =>
        value.length < 7 ? 'Phone must have at least 7 letters' : null,
      password: (value) =>
        value.length < 8 && !id
          ? 'Password must have at least 8 letters'
          : null,
      confirmPassword: (value, values) =>
        value != values.password && !id ? 'Password does not match' : null,
      photo: (value) =>
        typeof value === 'string' && !id ? 'Please select logo' : null,
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.staff.byId(id as string));
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
    console.log(response);
    const transformedData = response?.data?.result.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setHospitals(transformedData);
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
  const getDepartmentDataForHospital = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(apiRoutes.hospital.getById(`${form.values.hospital}`), {
        next: {
          cache: 'no-store',
        },
      });
    const transformedData = response?.data?.departments.map((item: any) => {
      const filtered = DEPARTMENTS.filter(
        (department) => department.value === item.value
      );
      return {
        label: `${filtered[0].name}`,
        value: item.id,
      };
    });
    setDepartments(transformedData);
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
    getHospitalInfo();
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
            {...form.getInputProps('name')}
          />{' '}
          <Select
            label="Position"
            placeholder="eg. Doctor"
            required
            withAsterisk
            data={Object.keys(POSITION) as Array<keyof typeof POSITION>}
            {...form.getInputProps('position')}
          />
          <TextInput
            label="Phone No"
            placeholder="98XXXXXXXX"
            required
            withAsterisk
            {...form.getInputProps('phone')}
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
            label="Photo"
            required={!id}
            withAsterisk={!id}
            rightSection={
              <>
                <IconUpload></IconUpload>
              </>
            }
            {...form.getInputProps('photo')}
          />
          <Select
            label="Select the hospital"
            placeholder="eg. Kantipur Hospital"
            required
            withAsterisk
            data={hospitals}
            disabled
            {...form.getInputProps('hospital')}
          />
          <MultiSelect
            label="Select the departments"
            placeholder="eg. Oncology"
            data={departments}
            value={form.values.departments}
            withAsterisk
            {...form.getInputProps('departments')}
          ></MultiSelect>
        </SimpleGrid>

        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
