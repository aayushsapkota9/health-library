'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Card,
  CardSection,
  FileInput,
  NumberInput,
  PasswordInput,
  TextInput,
  Title,
  LoadingOverlay, // Import LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      fullName: '',
      fullAddress: '',
      phoneNo: '',
      email: '',
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
        value.length < 7 ? 'Phone must have at least 7 digits' : null,
      organization: (value) =>
        value.length < 2 ? 'Organization must have at least 2 letters' : null,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    values.phoneNo = +values.phoneNo; // Fixed phone_no to phoneNo
    const response: any = await http
      .service()
      .update(`${apiRoutes.auth.profile}`, values);

    showNotificationOnRes(response);
    setLoading(false);
  };

  const getProfile = async () => {
    setLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const http = new HttpService();
    const response: any = await http
      .service()
      .get(`${apiRoutes.auth.profile}`, {
        next: {
          cache: 'no-store',
        },
      });

    form.setFieldValue('fullName', response.data.user.fullName);
    form.setFieldValue('fullAddress', response.data.fullAddress);
    form.setFieldValue('organization', response.data.organization);
    form.setFieldValue('email', response.data.user.email);
    form.setFieldValue('phoneNo', response.data.phoneNo);
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="text-textPrimary xs:mx-4 sm:mx-16 md:mx-32">
      <Card
        shadow="sm"
        px={'lg'}
        py={'sm'}
        radius="md"
        className="bg-tertiary text-textPrimary"
      >
        <LoadingOverlay visible={loading} /> {/* Loading overlay */}
        <CardSection
          px={10}
          py={10}
          className="flex flex-col gap-3 justify-around"
        >
          <div className="flex gap-4 items-center">
            <Title order={2}>Profile</Title>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              label="Full Name"
              placeholder="Enter your name"
              required
              withAsterisk
              {...form.getInputProps('fullName')}
            />
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
            <Button loading={loading} type="submit" className="mt-4">
              Save
            </Button>
          </form>
        </CardSection>
      </Card>
    </div>
  );
};

export default Page;
