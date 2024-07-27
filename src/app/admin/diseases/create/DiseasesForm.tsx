'use client';
import TinyMceEditorWithTemplate from '@/src/components/Editor/TinyMceWithTemplate/TinyMceTemplate';
import FormFooter from '@/src/components/layouts/formFooter';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { SimpleGrid, Textarea, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

export interface IDiseasesFormValue {
  name: string;
  html: string;
  references: string;
}
export interface FormProps {
  values: IDiseasesFormValue;
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
  const form = useForm<IDiseasesFormValue>({
    initialValues: {
      name: '',
      html: '',
      references: '',
    },
    validate: {
      name: (value) =>
        value.length < 4 ? 'Name must have at least 4 letters' : null,
      references: (value) =>
        value.length < 2 ? 'References must have at least 2 letters' : null,
    },
  });
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const getFieldData = async () => {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(apiRoutes.diseases.diseaseById(id as string));

    const data = response.data;
    const defaultValues = {
      name: data.name,
      html: data.html,
      references: data.references,
    };
    response?.status === 200 && form.setValues(defaultValues);
  };

  const handleLocalFormSubmit = async () => {
    form.setFieldValue('html', editorRef.current?.getContent() as string);
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
  useEffect(() => {
    id && getFieldData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleLocalFormSubmit)}>
        <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }} className="mb-4">
          <TextInput
            label="Name"
            placeholder="eg. Jaundice"
            required
            withAsterisk
            {...form.getInputProps('name')}
          />
        </SimpleGrid>
        <TinyMceEditorWithTemplate
          initialValue={form.values.html}
          editorRef={editorRef}
        ></TinyMceEditorWithTemplate>
        {form.errors.html && (
          <div className="text-red-500">{JSON.stringify(form.errors.html)}</div>
        )}
        <Textarea
          label="References"
          placeholder="eg. https://www.who.int/emergencies/diseases"
          required
          withAsterisk
          {...form.getInputProps('references')}
        />
        <Text className="text-red-500">
          IMP *There is an bug in this form where you need to click submit
          button twice for it to work
        </Text>
        <FormFooter title={submitTitle}></FormFooter>
      </form>
    </div>
  );
};
