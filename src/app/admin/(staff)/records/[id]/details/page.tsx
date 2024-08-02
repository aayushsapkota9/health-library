'use client';
import FormWrapper from '@/src/components/wrappers/CreateWrapper';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { FormTitles } from '@/src/types/enums/formTitles.enums';
import { objectToFormData } from '@/src/utils/formdata.append';
import { CustomBreadCrumps } from '@/src/components/mantine/BreadCrumps/CustomBreadCrumps';

import { useParams } from 'next/navigation';
import {
  IRecordsFormValues,
  RecordsRegistrationForm,
} from '../../create/PatientRegistrationForm';
import {
  Avatar,
  Text,
  Paper,
  Burger,
  Title,
  Divider,
  Blockquote,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCirclePlus,
  IconCirclePlus2,
  IconExclamationCircle,
} from '@tabler/icons-react';

export default function Page() {
  const params = useParams();
  const handleCreateFormSubmit = async ({
    values,
  }: {
    values: IRecordsFormValues;
  }) => {
    const http = new HttpService();
    let formData = objectToFormData(values);
    const response: any = await http
      .service()
      .patchFormData(apiRoutes.staff.byId(params.id as string), formData);
    return response;
  };
  const breadCrumps = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Records', href: '/admin/records' },
    { title: 'Details', href: `/admin/records/${params.id}/details` },
  ];
  return (
    <div>
      <CustomBreadCrumps items={breadCrumps}></CustomBreadCrumps>
      <div className="grid grid-cols-10 gap-2 pt-4">
        <div className="col-span-7 flex flex-col gap-2">
          <Title>Task 1</Title>
          <SimpleGrid cols={2}>
            {' '}
            <div className=" create-box-styles  ">
              <div className="flex  justify-around ">
                <Title order={4}>Blood Oxygen</Title>
                <Button variant="transparent">
                  <IconCirclePlus></IconCirclePlus>
                </Button>
              </div>
              <Divider></Divider>
            </div>{' '}
            <div className=" create-box-styles ">
              <div className="flex  justify-around ">
                <Title order={4}>Blood Oxygen</Title>
                <Button variant="transparent">
                  <IconCirclePlus></IconCirclePlus>
                </Button>
              </div>
              <Divider></Divider>
            </div>
          </SimpleGrid>

          <div></div>
        </div>
        <Paper className="col-span-3  create-box-styles">
          <div></div>
          <div className="flex items-center flex-col gap-3 ">
            <Avatar
              size={'xl'}
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdueakGImGactugJLkm9szSZD4KDT_BtlQ&s'
              }
            ></Avatar>
            <Title order={3} className="text-secondary">
              Monika Wrobel
            </Title>
            <p>35 years</p>
          </div>
          <div className="flex justify-around text-center mt-2">
            <div className="">
              <div>Blood</div>
              <div className="text-secondary">A Rh+</div>
            </div>
            <Divider orientation="vertical"></Divider>
            <div>
              <div>Height</div>
              <div className="text-secondary">183 cm</div>
            </div>{' '}
            <Divider orientation="vertical"></Divider>
            <div>
              <div>Weight</div>
              <div className="text-secondary">52 kg</div>
            </div>
          </div>
          <Blockquote
            className="mx-3"
            color="red"
            cite="Warning Message"
            icon={<IconExclamationCircle></IconExclamationCircle>}
            mt="xl"
          >
            This patient is nice.
          </Blockquote>

          <Blockquote className="mx-3" color="blue" cite="Remarks" mt="xl">
            This patient is nice.
          </Blockquote>
        </Paper>
      </div>
    </div>
  );
}
