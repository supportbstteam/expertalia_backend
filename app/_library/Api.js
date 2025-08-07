import axios from "axios";
const baseURL = process.env.API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  //timeout: 20000,  
});
axiosInstance.interceptors.request.use(function (config) {
  //config.headers["Content-Type"] = "application/json";   
  let access_token = localStorage.getItem(process.env.APP_PREFIX + 'access_token') ?? '';
  config.headers["Authorization"] = "Bearer " + access_token;
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (typeof response !== "undefined" && response.status === 401) {
        localStorage.removeItem(process.env.APP_PREFIX + 'access_token');
        localStorage.removeItem(process.env.APP_PREFIX + 'user_id');
      }
      return response
    } catch (err) {
      console.error('err:', err);
    }
    if (error) {

      let code = error.code ?? '' // ERR_NETWORK
      let name = error.name ?? '' // AxiosError
      let message = error.message ?? '' // Network Error    

    }
  }
);

let json_header = {
  "Content-Type": "application/json",
}

let form_header = {
  "Content-Type": "multipart/form-data",
}

const api = {
  // === authentication apis ===
  login: async (obj) => {
    return await axiosInstance.post(
      "/auth/login",
      {
        'email': obj.email,
        'password': obj.password,
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  register: async (obj) => {
    return await axiosInstance.post(
      "/auth/register",
      {
        'role_id': obj.role_id,
        'name': obj.name,
        'email': obj.email,
        'password': obj.password,
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  verifyemail: async (obj) => {
    return await axiosInstance.post(
      "/auth/verifyemail",
      {
        'token': obj.token,
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  forgot_password: async (obj) => {
    return await axiosInstance.post(
      "/auth/forgot-password",
      {
        'email': obj.email,
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  reset_password: async (obj) => {
    return await axiosInstance.post(
      "/auth/reset-password",
      {
        'token': obj.token,
        'password': obj.password
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== my profile ===
  me: async () => {
    return await axiosInstance.get(
      "/private/me/",
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  logout: async () => {
    return await axiosInstance.get(
      "/private/logout",
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_profile: async (obj) => {
    return await axiosInstance.patch(
      "/private/profile/" + obj._id,
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_password: async (obj) => {
    return await axiosInstance.patch(
      "/private/profile-password/" + obj._id + "/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== users ===
  users: async (obj) => {
    return await axiosInstance.get(
      `/private/users/${obj.page ? '?page=' + obj.page : ''}`,
      {
        params: {
          name: obj.name ?? '',
          email: obj.email ?? '',
          phone: obj.phone ?? '',
          status: obj.status ?? '',
          page_number: obj.page_number ?? '',
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== pages ===
  pages: async (obj) => {
    return await axiosInstance.get(
      `/private/pages/`,
      {
        params: {
          _id: obj._id,
          page: obj.page,
          name: obj.name,
          slug: obj.slug,
          status: obj.status,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_page: async (obj) => {
    return await axiosInstance.post(
      "/private/pages/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_page: async (obj) => {
    return await axiosInstance.patch(
      "/private/pages/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  delete_page: async (obj) => {
    return await axiosInstance.delete(
      "/private/pages/",
      {
        params: {
          _id: obj._id,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== settings ===
  settings: async (obj) => {
    return await axiosInstance.get(
      `/private/settings`,
      {
        params: {
          page: obj.page,
          name: obj.name,
          slug: obj.slug,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_setting: async (obj) => {
    return await axiosInstance.post(
      "/private/settings/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_setting: async (obj) => {
    return await axiosInstance.patch(
      "/private/settings/" + obj._id + "/",
      {
        'value': obj.value,
      },
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== company-user ===
  company_users_list: async (obj) => {
    return await axiosInstance.get(
      `/private/company-users/list/`,
      {
        params: {
          search_text: obj.search_text,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  company_users: async (obj) => {
    return await axiosInstance.get(
      `/private/company-users/`,
      {
        params: {
          _id: obj._id,
          page: obj.page,
          first_name: obj.first_name,
          last_name: obj.last_name,
          email: obj.email,
          phone: obj.phone,
          status: obj.status,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_company_user: async (obj) => {
    return await axiosInstance.post(
      "/private/company-users/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_company_user: async (obj) => {
    return await axiosInstance.patch(
      "/private/company-users/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  delete_company_user: async (obj) => {
    return await axiosInstance.delete(
      "/private/company-users/",
      {
        params: {
          _id: obj._id,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== companies ===
  companies: async (obj) => {
    return await axiosInstance.get(
      `/private/companies/`,
      {
        params: {
          _id: obj._id,
          page: obj.page,
          name: obj.name,
          email: obj.email,
          zipCode: obj.zipCode,
          status: obj.status,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_company: async (obj) => {
    return await axiosInstance.post(
      "/private/companies/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_company: async (obj) => {
    return await axiosInstance.patch(
      "/private/companies/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  delete_company: async (obj) => {
    return await axiosInstance.delete(
      "/private/companies/",
      {
        params: {
          _id: obj._id,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  //=== service_category ===
  service_categories_list: async (obj) => {
    return await axiosInstance.get(
      `/private/service-category/list/`,
      {
        params: {
          search_text: obj.search_text,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  service_categories: async (obj) => {
    return await axiosInstance.get(
      `/private/service-category/`,
      {
        params: {
          _id: obj._id,
          page: obj.page,
          name: obj.name,
          status: obj.status,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_service_category: async (obj) => {
    return await axiosInstance.post(
      "/private/service-category/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_service_category: async (obj) => {
    return await axiosInstance.patch(
      "/private/service-category/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  delete_service_category: async (obj) => {
    return await axiosInstance.delete(
      "/private/service-category/",
      {
        params: {
          _id: obj._id,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },

  //=== services ===
  service_list: async (obj) => {
    return await axiosInstance.get(
      `/private/services/list/`,
      {
        params: {
          search_text: obj.search_text,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  services: async (obj) => {
    return await axiosInstance.get(
      `/private/services/`,
      {
        params: {
          _id: obj._id,
          page: obj.page,
          name: obj.name,
          category_name: obj.category_name,
          status: obj.status,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  create_service: async (obj) => {
    return await axiosInstance.post(
      "/private/services/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  update_service: async (obj) => {
    return await axiosInstance.patch(
      "/private/services/",
      obj.formData,
      { headers: form_header }
    )
      .catch((err) => { console.log('err', err); });
  },
  delete_service: async (obj) => {
    return await axiosInstance.delete(
      "/private/services/",
      {
        params: {
          _id: obj._id,
        }
      },
      { headers: json_header }
    )
      .catch((err) => { console.log('err', err); });
  },

};

export default api;
export { axiosInstance };

