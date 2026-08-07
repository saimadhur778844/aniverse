import { toast } from "sonner";

const notify = {
  success(message: string) {
    toast.success(message);
  },

  error(message: string) {
    toast.error(message);
  },

  warning(message: string) {
    toast.warning(message);
  },

  info(message: string) {
    toast.info(message);
  },

  loading(message: string) {
    return toast.loading(message);
  },

  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};

export default notify;