'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { Button, Card, CardSection, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import { useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 2 ? "Password can't be empty" : null,
      oldPassword: (value) =>
        value.length < 2 ? "Old password can't be empty" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .update(`${apiRoutes.auth.changePassword}`, {
        oldPassword: values.oldPassword,
        newPassword: values.password,
      });
    if (response.success) {
      form.reset();
    }

    showNotificationOnRes(response);
    setLoading(false);
  };
  return (
    <div className=" text-textPrimary  xs:mx-4 sm:mx-16 md:mx-32">
      <Card
        shadow="sm"
        px={'lg'}
        py={'sm'}
        radius="md"
        className="bg-tertiary text-textPrimary"
      >
        <CardSection
          px={10}
          py={10}
          className="flex flex-col gap-3 justify-around"
        >
          <div className="flex gap-4 items-center">
            <Title order={2}>Security</Title>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput
              leftSection={<IconLock></IconLock>}
              label="Current Password"
              placeholder="Enter your Current Password"
              withAsterisk
              required
              size="md"
              {...form.getInputProps('oldPassword')}
            />
            <PasswordInput
              leftSection={<IconLock></IconLock>}
              label="New Password"
              placeholder="Enter New Password"
              withAsterisk
              required
              size="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              leftSection={<IconLock></IconLock>}
              label="Confirm New Password"
              placeholder="Re-type New Password"
              withAsterisk
              required
              size="md"
              {...form.getInputProps('confirmPassword')}
            />
            <Button type="submit" className="mt-4" loading={loading}>
              Save
            </Button>
          </form>
        </CardSection>
      </Card>
    </div>
  );
};

export default Page;
