// src/router/routes.ts

import { Role } from '../types/enums/Role.enums';
const SuperAdminRoutes = [
  {
    link: '/admin/hospitals',
    roles: [Role.SUPER_ADMIN],
  },
  {
    link: '/admin/hospitals/create',
    roles: [Role.SUPER_ADMIN],
  },
  {
    link: '/admin/hospitals/[id]/edit',
    roles: [Role.SUPER_ADMIN],
  },
  {
    link: '/admin/diseases',
    roles: [Role.SUPER_ADMIN],
  },
  {
    link: '/admin/diseases/create',
    roles: [Role.SUPER_ADMIN],
  },
  {
    link: '/admin/diseases/[id]/edit',
    roles: [Role.SUPER_ADMIN],
  },
];
const AdminRoutes = [
  {
    link: '/admin/staff',
    roles: [Role.ADMIN],
  },
  {
    link: '/admin/staff/create',
    roles: [Role.ADMIN],
  },
  {
    link: '/admin/staff/[id]/edit',
    roles: [Role.ADMIN],
  },
];
const StaffRoutes = [
  {
    link: '/admin/patients',
    roles: [Role.STAFF],
  },
];
const PatientRoutes = [
  {
    link: '/profile',
    roles: [Role.PATIENT],
  },
];

export const routeConfig = [
  {
    link: '/admin/dashboard',
    roles: [Role.ADMIN, Role.STAFF, Role.SUPER_ADMIN],
  },
  ...SuperAdminRoutes,
  ...AdminRoutes,
  ...StaffRoutes,
  ...PatientRoutes,
];
