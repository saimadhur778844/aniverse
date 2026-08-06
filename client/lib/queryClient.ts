import {
  QueryClient,
} from "@tanstack/react-query";

const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          5 * 60 * 1000,

        gcTime:
          10 * 60 * 1000,

        retry: (
          failureCount,
          error: any
        ) => {
          const status =
            error?.response?.status;

          if (
            status === 401 ||
            status === 403 ||
            status === 404
          ) {
            return false;
          }

          return failureCount < 2;
        },

        refetchOnWindowFocus:
          false,

        refetchOnReconnect:
          true,

        refetchOnMount: false,

        networkMode: "online",
      },

      mutations: {
        retry: (
          failureCount,
          error: any
        ) => {
          const status =
            error?.response?.status;

          if (
            status === 400 ||
            status === 401 ||
            status === 403 ||
            status === 404
          ) {
            return false;
          }

          return failureCount < 1;
        },

        networkMode: "online",
      },
    },
  });

export default queryClient;