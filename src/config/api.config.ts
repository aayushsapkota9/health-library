const apiRoutes = {
  auth: {
    login: '/auth/login',
    profile: '/auth/user/me',
    changePassword: '/auth/change-password',
  },
  doctors: {
    doctors: '/doctors',
    doctorById: (id: string | number) => `/doctors/${id}`,
    getAllDoctors: (params?: string) => `/doctors?${params}`,
  },
  diseases: {
    diseases: '/diseases',
    diseaseById: (id: string | number) => `/diseases/${id}`,
    getAllDiseases: (params?: string) => `/diseases?${params}`,
  },
};

export default apiRoutes;
