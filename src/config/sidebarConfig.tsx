import {
  IconBookmarkPlus,
  IconCalendarPlus,
  IconClipboardHeart,
  IconClipboardList,
  IconDashboard,
  IconDevicesPause,
  IconFirstAidKit,
  IconHospital,
  IconMicroscope,
  IconUsersGroup,
  IconVirus,
  TablerIconsProps,
} from '@tabler/icons-react';
import { Role } from '../types/enums/Role.enums';
import { ReactNode } from 'react';

interface ISidebarConfig {
  label: string;
  key: string;
  link: string;
  description: string;
  roles: Role[];
  icon: ReactNode;
}
export const sidebarConfig: ISidebarConfig[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    link: '/admin/dashboard',
    description: 'Dashboard',
    roles: [Role.ADMIN, Role.STAFF, Role.SUPER_ADMIN],
    icon: <IconDashboard />,
  },
  {
    label: 'Staff',
    key: 'staff',
    link: '/admin/staff',
    description: 'Staff',
    roles: [Role.ADMIN],
    icon: <IconUsersGroup></IconUsersGroup>,
  },
  {
    label: 'Diseases',
    key: 'diseases',
    link: '/admin/diseases',
    description: 'Diseases',
    roles: [Role.SUPER_ADMIN],
    icon: <IconVirus></IconVirus>,
  },
  {
    label: 'Hospitals',
    key: 'hospitals',
    link: '/admin/hospitals',
    description: 'Hospitals',
    roles: [Role.SUPER_ADMIN],
    icon: <IconHospital></IconHospital>,
  },
  {
    label: 'Patients',
    key: 'patients',
    link: '/admin/patients',
    description: 'All Patients',
    roles: [Role.STAFF],
    icon: <IconUsersGroup></IconUsersGroup>,
  },
  {
    label: 'Records',
    key: 'records',
    link: '/admin/records',
    description: 'Records and Admissions ',
    roles: [Role.STAFF],
    icon: <IconBookmarkPlus></IconBookmarkPlus>,
  },
  {
    label: 'Tasks',
    key: 'tasks',
    link: '/admin/tasks',
    description: 'Tasks and Visits',
    roles: [Role.STAFF],
    icon: <IconClipboardList></IconClipboardList>,
  },
  // {
  //   label: 'Tests',
  //   key: 'tests',
  //   link: '/admin/tests',
  //   description: 'Tests and Reports',
  //   roles: [Role.STAFF],
  //   icon: <IconMicroscope></IconMicroscope>,
  // },
];
