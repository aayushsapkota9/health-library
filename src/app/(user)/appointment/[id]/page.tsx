'use client';
/* eslint-disable */
import { IDoctorFormValues } from '@/src/app/admin/doctors/create/DoctorRegistrationForm';
import apiRoutes from '@/src/config/api.config';
import { DEPARTMENTS } from '@/src/constants/Departments';
import { HttpService } from '@/src/services';
import {
  AspectRatio,
  Button,
  Flex,
  Group,
  rem,
  SimpleGrid,
  Stepper,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
interface IDoctor extends IDoctorFormValues {
  id: string;
}
const page = () => {
  const [active, setActive] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const form = useForm({
    initialValues: {
      department: '',
      doctor: '',
      date: '',
      fullName: '',
      phoneNo: '',
      condition: '',
    },
  });
  const params = useParams();
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const getDepartmentDataForHospital = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(apiRoutes.hospital.getById(`${params.id}`), {
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
  const getDoctorsFromDepartment = async () => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(
        apiRoutes.doctors.getDoctorByDepartment(
          params.id as string,
          form.values.department
        ),
        {
          next: {
            cache: 'no-store',
          },
        }
      );
    setDoctors(response?.data);
  };
  const handleCreateFormSubmit = async (values: any) => {
    const http = new HttpService();
    values.hospitalId = params.id;
    const response: any = await http
      .service()
      .post(apiRoutes.appointment.base, values);
    if (response.status === 200) {
      nextStep();
    }
  };

  useEffect(() => {
    params.id && getDepartmentDataForHospital();
  }, [params.id]);

  useEffect(() => {
    if (active === 1) {
      getDoctorsFromDepartment();
    }
  }, [form.values.department, active]);
  return (
    <>
      <form onSubmit={form.onSubmit(handleCreateFormSubmit)}>
        <Stepper
          className="mt-5"
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="First step" description="Select a department">
            <div className="bg-primary px-2 py-1 rounded-md flex justify-center xs:mb-3 sm:my-5 lg:my-8">
              <Title order={1} className="  text-textPrimary">
                Select a department
              </Title>
            </div>
            <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }} className="mt-2">
              {departments.map((item: any) => {
                return (
                  <div
                    className={`flex justify-between px-2 rounded-lg w-full py-2 hover:cursor-pointer bg-gray-50 ${
                      form.values.department === item.value
                        ? 'border-2 border-gray-500'
                        : 'bg-primary'
                    }`}
                    key={item.value}
                    onClick={() => form.setFieldValue('department', item.value)}
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
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select a doctor">
            <Title order={1} className="  text-textPrimary text-center">
              Select a doctor
            </Title>
            <div className="bg-primary px-2 py-1 rounded-md flex justify-center xs:mb-3 sm:my-5 lg:my-8 ">
              {doctors && doctors.length >= 1 ? (
                doctors.map((item: IDoctor) => {
                  return (
                    <div
                      className={`flex justify-between px-2 rounded-lg w-full py-2 hover:cursor-pointer bg-gray-50 ${
                        form.values.doctor === item.id
                          ? 'border-2 border-gray-500'
                          : 'bg-primary'
                      }`}
                      key={item.id}
                      onClick={() => form.setFieldValue('doctor', item.id)}
                    >
                      <div className="flex gap-4 flex-1">
                        <AspectRatio
                          ratio={240 / 347}
                          style={{ flex: `0 0 ${rem(100)}` }}
                          maw={'34px'}
                        >
                          <img src="https://api.mero.doctor/images/doctor_male.png" />
                        </AspectRatio>

                        <Flex direction={'column'} wrap={'nowrap'}>
                          <Text className="text-textPrimary font-display text-md font-bold">
                            {item.fullName} - {item.fullAddress}
                          </Text>
                          <Text className="text-textPrimary font-display text-md font-bold">
                            {item.phoneNo}
                          </Text>
                        </Flex>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No doctors found for this department</div>
              )}
            </div>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Fill up details">
            <Title order={1} className="  text-textPrimary text-center">
              Fill up details
            </Title>
            <TextInput
              label="Full Name"
              placeholder="Enter your name"
              required
              withAsterisk
              {...form.getInputProps('fullName')}
            />
            <TextInput
              label="Address"
              placeholder="Enter your phone number"
              required
              withAsterisk
              {...form.getInputProps('phoneNo')}
            />
            <TextInput
              type="date"
              label="Date of Visit"
              placeholder="Enter the date of visit"
              required
              withAsterisk
              {...form.getInputProps('date')}
            />

            <Textarea
              label="Describe your condition in brief"
              placeholder="eg. headache "
              required
              withAsterisk
              {...form.getInputProps('condition')}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <Title order={1} className="  text-textPrimary text-center">
              Completed, Thanks for booking appointment with us{' '}
            </Title>
          </Stepper.Completed>
        </Stepper>

        {active <= 2 ? (
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button
              type={`${active === 2 ? 'submit' : 'button'}`}
              onClick={() => {
                if (active !== 2) {
                  nextStep();
                }
              }}
              disabled={
                !form.values.department || (active === 1 && !form.values.doctor)
              }
            >
              Next step
            </Button>
          </Group>
        ) : (
          <Group justify="center" mt="xl">
            <Link href={'/'}>
              {' '}
              <Button>Go to home</Button>
            </Link>
          </Group>
        )}
      </form>
    </>
  );
};

export default page;
