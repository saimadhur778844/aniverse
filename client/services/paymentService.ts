import api from "./api";

export interface PaymentSessionResponse {
  success: boolean;
  payment_session_id: string;
  order_id: string;
}

export const createPaymentSession = async (
  orderId: string
): Promise<PaymentSessionResponse> => {
  const { data } = await api.post("/payments/create-session", {
    orderId,
  });

  return data;
};