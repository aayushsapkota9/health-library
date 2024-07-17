const apiRoutes = {
  auth: {
    login: '/auth/login',
  },
  doctors: {
    doctors: '/doctors',
    doctorById: (id: string | number) => `/doctors/${id}`,
    getAllDoctors: (params?: string) => `/doctors?${params}`,
    searchSuppliers: `/doctors/find/`,
  },
};

export default apiRoutes;
