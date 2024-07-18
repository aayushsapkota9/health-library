enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
interface ISidebarConfig {
  label: string;
  key: string;
  link: string;
  roles: ROLE[];
}
export const sidebarConfig = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    link: '/admin/dashboard',
    roles: [ROLE.ADMIN],
  },
  {
    label: 'Doctors',
    key: 'doctors',
    link: '/admin/doctors',
    roles: [ROLE.ADMIN],
  },
  {
    label: 'Diseases',
    key: 'diseases',
    link: '/admin/diseases',
    roles: [ROLE.ADMIN],
  },
];
