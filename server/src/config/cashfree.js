import axios from "axios";

const baseURL =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com";

const cashfree = axios.create({
  baseURL,

  headers: {
    "Content-Type": "application/json",

    "x-client-id":
      process.env.CASHFREE_APP_ID,

    "x-client-secret":
      process.env.CASHFREE_SECRET_KEY,

    "x-api-version": "2025-01-01",
  },

  timeout: 30000,
});

cashfree.interceptors.request.use(
  (config) => {
    console.log(
      "\n========== CASHFREE REQUEST =========="
    );

    console.log(
      config.method?.toUpperCase(),
      config.baseURL + config.url
    );

    console.dir(config.data, {
      depth: null,
    });

    return config;
  }
);

cashfree.interceptors.response.use(
  (response) => {
    console.log(
      "\n========== CASHFREE RESPONSE =========="
    );

    console.dir(response.data, {
      depth: null,
    });

    return response;
  },

  (error) => {
    console.log(
      "\n========== CASHFREE ERROR =========="
    );

    console.dir(
      error.response?.data ??
        error.message,
      {
        depth: null,
      }
    );

    return Promise.reject(error);
  }
);

export default cashfree;