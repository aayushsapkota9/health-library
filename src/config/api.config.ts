const apiRoutes = {
  auth: {
    login: '/auth/login',
    profile: '/auth/user/me',
    changePassword: '/auth/change-password',
  },
  diseases: {
    diseases: '/diseases',
    diseaseById: (id: string | number) => `/diseases/${id}`,
    getAllDiseases: (params?: string) => `/diseases?${params}`,
    search: (params?: string) => `/diseases/item/search?${params}`,
    searchByAlphabet: (params?: string) =>
      `/diseases/item/search/alphabet?${params}`,
  },
  hospital: {
    base: '/hospital',
    getById: (id: string | number) => `/hospital/${id}`,
    get: (params?: string) => `/hospital?${params}`,
  },
  appointment: {
    base: '/appointment',
    get: (params?: string) => `/appointment?${params}`,
  },
  staff: {
    base: '/staff',
    get: (params?: string) => `/staff?${params}`,
    byId: (id: string | number) => `/staff/${id}`,
  },
};

export default apiRoutes;
