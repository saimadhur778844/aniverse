import api from "./api";

import type { Coupon } from "@/types/coupon";

interface CouponResponse {
  success: boolean;
  coupon: Coupon;
}

interface CouponsResponse {
  success: boolean;
  coupons: Coupon[];
  total: number;
  page: number;
  pages: number;
}

export interface ValidateCouponResponse {
  success: boolean;
  coupon: Coupon;
  discount: number;
  finalAmount: number;
}

class CouponService {
  async getCoupons(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CouponsResponse> {
    const { data } = await api.get("/coupons", {
      params,
    });

    return data;
  }

  async getCoupon(id: string): Promise<Coupon> {
    const { data } =
      await api.get<CouponResponse>(
        `/coupons/${id}`
      );

    return data.coupon;
  }

  async createCoupon(
    payload: Partial<Coupon>
  ): Promise<Coupon> {
    const { data } =
      await api.post<CouponResponse>(
        "/coupons",
        payload
      );

    return data.coupon;
  }

  async updateCoupon(
    id: string,
    payload: Partial<Coupon>
  ): Promise<Coupon> {
    const { data } =
      await api.put<CouponResponse>(
        `/coupons/${id}`,
        payload
      );

    return data.coupon;
  }

  async deleteCoupon(id: string) {
    return api.delete(`/coupons/${id}`);
  }

  async toggleCoupon(
    id: string
  ): Promise<Coupon> {
    const { data } =
      await api.patch<CouponResponse>(
        `/coupons/${id}/toggle`
      );

    return data.coupon;
  }

  async validateCoupon(
    code: string,
    orderAmount: number
  ): Promise<ValidateCouponResponse> {
    const { data } =
      await api.post<ValidateCouponResponse>(
        "/coupons/validate",
        {
          code,
          orderAmount,
        }
      );

    return data;
  }
}

export default new CouponService();