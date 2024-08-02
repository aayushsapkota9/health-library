'use client';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
import { COLOR } from '@/src/types/enums/colors.enums';
import { Gender } from '@/src/types/enums/gender.enums';
import { HeightUnits } from '@/src/types/enums/height.enums';
import { POSITION } from '@/src/types/enums/position.enums';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  FileInput,
  PasswordInput,
  Select,
  SimpleGrid,
  TextInput,
  MultiSelect,
  Autocomplete,
  TagsInput,
  Textarea,
  Button,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCirclePlus, IconPlus, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export interface IRecordsFormValues {
  patient: string;
  weight: number;
  height: number;
  heightUnit: HeightUnits;
  warningMessage: string;
  remarks: string;
  symptoms: Array<string>;
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
  const [patients, setPatients] = useState([]);
  const form = useForm<IRecordsFormValues>({
    initialValues: {
      patient: '',
      weight: 0,
      height: 0,
      heightUnit: HeightUnits.FT,
      warningMessage: '',
      remarks: '',
      symptoms: [],
    },
    validate: {
      patient: (value) => (value ? null : 'Please select patient'),
      weight: (value) => (value > 0 ? null : 'Please enter valid weight'),
      height: (value) => (value > 0 ? null : 'Please enter valid height'),
      heightUnit: (value) => (value ? null : 'Please select height unit'),
      symptoms: (value) =>
        value?.length > 0 ? null : 'Please select symptoms',
    },
  });
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.records.byId(id as string));
    const data = response.data;
    const defaultValues = {
      patient: data.patient.id,
      wight: data.wight,
      height: data.height,
      heightUnit: data.heightUnit,
      warningMessage: data.warningMessage,
      remarks: data.remarks,
      symptoms: data.symptoms,
    };
    response?.status === 200 && form.setValues(defaultValues);
  };
  const getAllPatients = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(
        apiRoutes.patients.get(
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
        label: `${item.name}-${item.user.email}`,
      };
    });
    setPatients(data);
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
    getAllPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleLocalFormSubmit)}>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }}>
          <Select
            searchable
            label="Select a patient"
            placeholder="Choose a patient to admit"
            data={patients}
            withAsterisk
            required
            limit={5}
            {...form.getInputProps('patient')}
          />
          <NumberInput
            label="Weight(IN KG)"
            placeholder="eg. 120 kg"
            required
            withAsterisk
            {...form.getInputProps('weight')}
          />
          <NumberInput
            label="Height"
            placeholder="eg. 5.5"
            required
            withAsterisk
            {...form.getInputProps('height')}
          />
          <Select
            label="Height Units"
            placeholder="eg. CM"
            data={Object.values(HeightUnits) as Array<HeightUnits>}
            required
            withAsterisk
            {...form.getInputProps('heightUnit')}
          />
          <TagsInput
            label="Symptoms"
            placeholder='eg. "Fever", "Cough"'
            required
            withAsterisk
            {...form.getInputProps('symptoms')}
          />
          <TextInput
            label="Warning Message"
            placeholder="eg. Don't give this patient Mirocine B"
            {...form.getInputProps('warningMessage')}
          />
        </SimpleGrid>
        <SimpleGrid>
          <Textarea
            label="Remarks"
            placeholder="Enter some remarks about patient"
            rows={5}
            {...form.getInputProps('remarks')}
          />
        </SimpleGrid>

        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
