import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRedirecting = false;

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const currentPath = window.location.pathname;
      const isAdminRoute = currentPath.startsWith("/admin");

      if (
        !isRedirecting &&
        !currentPath.startsWith("/login") &&
        !currentPath.startsWith("/admin/login")
      ) {
        isRedirecting = true;
        window.location.href = isAdminRoute ? "/admin/login" : "/login";
      }
    }

    return Promise.reject({
      success: false,
      status: error.response?.status,
      message:
        error.response?.data?.message ??
        error.message ??
        "Something went wrong.",
      data: error.response?.data,
    });
  }
);

export default api;