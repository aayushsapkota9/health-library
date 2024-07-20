'use client';
import TinyMceEditorWithTemplate from '@/src/components/Editor/TinyMceWithTemplate/TinyMceTemplate';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef } from 'react';

export interface ISupplierFromValue {
  title: string;
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
      title: '',
    },
    validate: {
      title: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
    },
  });
  const editorRef = useRef(null);
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.doctors.doctorById(id as string));
    const data = response.data;
    const defaultValues = {
      title: data.title,
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
        <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }} className="mb-4">
          <TextInput
            label="Title"
            placeholder="eg. Jaundice"
            required
            withAsterisk
            {...form.getInputProps('fullName')}
          />
        </SimpleGrid>
        <TinyMceEditorWithTemplate
          editorRef={editorRef}
        ></TinyMceEditorWithTemplate>
        <Textarea
          label="References"
          placeholder="eg. https://www.who.int/emergencies/diseases"
          required
          withAsterisk
          {...form.getInputProps('fullName')}
        />
        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
