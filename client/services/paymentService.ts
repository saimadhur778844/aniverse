import api from "./api";

import type { Order } from "@/types/order";

/*
|--------------------------------------------------------------------------
| Response Types
|--------------------------------------------------------------------------
*/

export interface PaymentSessionResponse {
  success: boolean;

  payment_session_id: string;

  gateway_order_id: string;
}

export interface PaymentVerificationResponse {
  success: boolean;

  order: Order;
}

/*
|--------------------------------------------------------------------------
| Payment Service
|--------------------------------------------------------------------------
*/

class PaymentService {
  /*
  |--------------------------------------------------------------------------
  | Create Payment Session
  |--------------------------------------------------------------------------
  */

  async createPaymentSession(
    orderId: string
  ): Promise<PaymentSessionResponse> {
    try {
      const { data } = await api.post(
        "/payments/create-session",
        {
          orderId,
        }
      );

      return data;
    } catch (error: any) {
      console.error(
        "Create Payment Session Error:"
      );

      console.error(error);

      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Retry Payment
  |--------------------------------------------------------------------------
  */

  async retryPayment(
    orderId: string
  ): Promise<PaymentSessionResponse> {
    try {
      const { data } = await api.post(
        `/payments/retry/${orderId}`
      );

      return data;
    } catch (error: any) {
      console.error(
        "Retry Payment Error:"
      );

      console.error(error);

      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Verify Payment
  |--------------------------------------------------------------------------
  */

  async verifyPayment(
    gatewayOrderId: string
  ): Promise<PaymentVerificationResponse> {
    try {
      const { data } = await api.get(
        `/payments/verify/${gatewayOrderId}`
      );

      return data;
    } catch (error: any) {
      console.error(
        "Verify Payment Error:"
      );

      console.error(error);

      throw error;
    }
  }
}

/*
|--------------------------------------------------------------------------
| Singleton
|--------------------------------------------------------------------------
*/

const paymentService =
  new PaymentService();

/*
|--------------------------------------------------------------------------
| Named Exports
|--------------------------------------------------------------------------
*/

export const createPaymentSession =
  paymentService.createPaymentSession.bind(
    paymentService
  );

export const retryPayment =
  paymentService.retryPayment.bind(
    paymentService
  );

export const verifyPayment =
  paymentService.verifyPayment.bind(
    paymentService
  );

export default paymentService;