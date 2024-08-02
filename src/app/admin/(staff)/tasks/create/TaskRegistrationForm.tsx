'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { formatTimestampToDateTime } from '@/src/helpers/DateHelper';
import { HttpService } from '@/src/services';
import { HeightUnits } from '@/src/types/enums/height.enums';
import { TaskStatus } from '@/src/types/enums/status.enums';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Select,
  SimpleGrid,
  TextInput,
  TagsInput,
  Textarea,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

export interface IRecordsFormValues {
  name: string;
  status: TaskStatus;
  description: string;
  recordId: string;
  staffId: string;
  dueDate: string;
  dueTime: string;
}
export interface FormProps {
  values: IRecordsFormValues;
}

export const RecordsRegistrationForm = ({
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
  const [records, setRecords] = useState([]);
  const [staff, setStaff] = useState([]);

  const form = useForm<IRecordsFormValues>({
    initialValues: {
      name: '',
      status: TaskStatus.PENDING,
      description: '',
      recordId: '',
      staffId: '',
      dueDate: '',
      dueTime: '',
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      recordId: (value) => (value ? null : 'Patient is required'),
      staffId: (value) => (value ? null : 'Staff is required'),
      dueDate: (value) => (value ? null : 'Due date is required'),
      dueTime: (value) => (value ? null : 'Due time is required'),
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.tasks.byId(id as string));
    const data = response.data;
    const defaultValues = {
      name: data.name,
      description: data.description,
      recordId: data.record.id,
      staffId: data.staff.id,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
    };
    response?.status === 200 && form.setValues(defaultValues);
  };
  const getAllRecords = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(
        apiRoutes.records.get(
          `page=${1}&limit=${0}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
        ),
        {
          next: {
            cache: 'no-store',
          },
        }
      );
    const data = response?.data?.result.map((item: any) => {
      return {
        value: `${item.id}`,
        label: `${item.patient.name}-${formatTimestampToDateTime(
          item.createdAt
        )}-${item.status}`,
      };
    });
    setRecords(data);
  };
  const getAllStaff = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(
        apiRoutes.staff.get(
          `page=${1}&limit=${0}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}`
        ),
        {
          next: {
            cache: 'no-store',
          },
        }
      );
    const data = response?.data?.result.map((item: any) => {
      return {
        value: `${item.id}`,
        label: `${item.name}-${item.user.email}-${item.position}`,
      };
    });
    setStaff(data);
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
    getAllRecords();
    getAllStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleLocalFormSubmit)}>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }}>
          <TextInput
            label="Task Name"
            placeholder="eg. Get blood sample"
            required
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Select
            label="Status"
            placeholder='eg. "Pending"'
            data={Object.values(TaskStatus) as Array<TaskStatus>}
            required
            withAsterisk
            {...form.getInputProps('status')}
          ></Select>
          <TextInput
            type="date"
            label="Date"
            placeholder="Choose a date"
            withAsterisk
            required
            {...form.getInputProps('dueDate')}
          />
          <TextInput
            type="time"
            label="Time"
            placeholder="eg 19:20"
            withAsterisk
            required
            {...form.getInputProps('dueTime')}
          />
          <Select
            searchable
            label="Select a record associated with this task"
            placeholder="Choose a record"
            data={records}
            withAsterisk
            required
            limit={5}
            {...form.getInputProps('recordId')}
          />
          <Select
            searchable
            label="Select a staff associated with this task"
            placeholder="Choose a staff"
            data={staff}
            withAsterisk
            required
            limit={5}
            {...form.getInputProps('staffId')}
          />
        </SimpleGrid>
        <SimpleGrid>
          <Textarea
            label="Task Description"
            placeholder="eg. Get blood sample"
            required
            withAsterisk
            rows={5}
            {...form.getInputProps('description')}
          />
        </SimpleGrid>

        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
