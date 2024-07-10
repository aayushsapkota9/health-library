const apiRoutes = {
  auth: {
    login: '/auth/login',
  },
  suppliers: {
    supplier: '/supplier',
    suppliersById: (id: any) => `/supplier/${id}`,
    getAllSuppliers: (params?: string) => `/supplier?${params}`,
    searchSuppliers: `/supplier/find/`,
  },
};

export default apiRoutes;
