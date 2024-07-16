const apiRoutes = {
  auth: {
    login: '/auth/login',
  },
  doctors: {
    doctors: '/doctors',
    suppliersById: (id: any) => `/doctors/${id}`,
    getAllSuppliers: (params?: string) => `/doctors?${params}`,
    searchSuppliers: `/doctors/find/`,
  },
};

export default apiRoutes;
