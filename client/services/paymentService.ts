import api from "./api";

import type { Order } from "@/types/order";

export interface PaymentSessionResponse {
  success: boolean;
  payment_session_id: string;
  order_id: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  order: Order;
}

class PaymentService {
  /*
  |--------------------------------------------------------------------------
  | Create Cashfree Session
  |--------------------------------------------------------------------------
  */

  async createPaymentSession(
    orderId: string
  ): Promise<PaymentSessionResponse> {
    const { data } = await api.post(
      "/payments/create-session",
      {
        orderId,
      }
    );

    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Verify Payment
  |--------------------------------------------------------------------------
  */

  async verifyPayment(
    gatewayOrderId: string
  ): Promise<PaymentVerificationResponse> {
    const { data } = await api.get(
      `/payments/verify/${gatewayOrderId}`
    );

    return data;
  }
}

const paymentService =
  new PaymentService();

export const createPaymentSession =
  paymentService.createPaymentSession.bind(
    paymentService
  );

export default paymentService;