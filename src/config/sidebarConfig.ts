import { Role } from '../types/enums/Role.enums';

interface ISidebarConfig {
  label: string;
  key: string;
  link: string;
  roles: Role[];
}
export const sidebarConfig = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    link: '/admin/dashboard',
    roles: [Role.ADMIN, Role.STAFF, Role.SUPER_ADMIN],
  },
  {
    label: 'Staff',
    key: 'staff',
    link: '/admin/staff',
    roles: [Role.ADMIN],
  },
  {
    label: 'Diseases',
    key: 'diseases',
    link: '/admin/diseases',
    roles: [Role.SUPER_ADMIN],
  },
  {
    label: 'Hospitals',
    key: 'hospitals',
    link: '/admin/hospitals',
    roles: [Role.SUPER_ADMIN],
  },
];
