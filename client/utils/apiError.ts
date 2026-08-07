import axios from "axios";

export function getApiError(
  error: unknown
): string {
  if (
    axios.isAxiosError(error)
  ) {
    return (
      error.response?.data?.message ||
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}