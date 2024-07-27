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
    getDoctorByDepartment: (hospitalId: string, departmentId: string) =>
      `/doctors/hospital/${hospitalId}/${departmentId}`,
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
};

export default apiRoutes;
