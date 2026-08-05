"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { load } from "@cashfreepayments/cashfree-js";

import { useCart } from "@/context/CartContext/CartContext";

import { createPaymentSession } from "@/services/paymentService";
import couponService from "@/services/couponService";
import orderService from "@/services/orderService";

import CheckoutHeader from "@/components/store/checkout/CheckoutHeader";
import CustomerInformation from "@/components/store/checkout/CustomerInformation";
import ShippingAddress from "@/components/store/checkout/ShippingAddress";
import PaymentMethod from "@/components/store/checkout/PaymentMethod";
import OrderSummary from "@/components/store/checkout/OrderSummary";

import { notify } from "@/utils/toast";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const { items, subtotal, isEmpty } =
    useCart();

  const [loading, setLoading] =
    useState(false);

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [
    appliedCoupon,
    setAppliedCoupon,
  ] = useState("");

  const [
    couponLoading,
    setCouponLoading,
  ] = useState(false);

  const [form, setForm] =
    useState<CheckoutForm>({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  useEffect(() => {
    if (isEmpty) {
      router.replace("/cart");
    }
  }, [isEmpty, router]);

  const shipping = useMemo(() => {
    return subtotal >= 1999 ? 0 : 99;
  }, [subtotal]);

  const total =
    subtotal +
    shipping -
    discount;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const validate = () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      notify.error(
        "Please fill all fields."
      );
      return false;
    }

    return true;
  };

  const applyCoupon =
    async () => {
      if (!couponCode.trim()) {
        notify.error(
          "Enter a coupon code."
        );
        return;
      }

      const loadingToast =
        notify.loading(
          "Validating coupon..."
        );

      try {
        setCouponLoading(true);

        const result =
          await couponService.validateCoupon(
            couponCode,
            subtotal
          );

        notify.dismiss(
          loadingToast
        );

        setDiscount(
          result.discount
        );

        setAppliedCoupon(
          result.coupon.code
        );

        notify.success(
          "Coupon applied successfully."
        );
      } catch (error: any) {
        notify.dismiss(
          loadingToast
        );

        notify.error(
          error?.message ??
            "Invalid coupon."
        );
      } finally {
        setCouponLoading(false);
      }
    };

  const removeCoupon = () => {
    setCouponCode("");

    setAppliedCoupon("");

    setDiscount(0);

    notify.info(
      "Coupon removed."
    );
  };

  const handleCheckout =
    async () => {
      if (loading) return;

      if (!validate()) return;

      const loadingToast =
        notify.loading(
          "Preparing secure checkout..."
        );

      try {
        setLoading(true);

        /*
        ----------------------------------
        Create Order
        ----------------------------------
        */

        const order =
          await orderService.createOrder({
            couponCode:
              appliedCoupon ||
              undefined,

            items: items.map(
              (item: any) => ({
                product:
                  item.product._id,
                quantity:
                  item.quantity,
              })
            ),

            shippingAddress: {
              fullName:
                form.fullName,
              email:
                form.email,
              phone:
                form.phone,
              address:
                form.address,
              city: form.city,
              state:
                form.state,
              pincode:
                form.pincode,
            },
          });

        /*
        ----------------------------------
        Store pending order
        ----------------------------------
        */

        sessionStorage.setItem(
          "pendingOrder",
          order.order._id
        );

        /*
        ----------------------------------
        Create Payment Session
        ----------------------------------
        */

        const payment =
          await createPaymentSession(
            order.order._id
          );

        /*
        ----------------------------------
        Load Cashfree
        ----------------------------------
        */

        const cashfree =
          await load({
            mode:
              process.env
                .NEXT_PUBLIC_CASHFREE_ENV ===
              "PRODUCTION"
                ? "production"
                : "sandbox",
          });

        if (!cashfree) {
          throw new Error(
            "Unable to initialize Cashfree."
          );
        }

        notify.dismiss(
          loadingToast
        );

        /*
        ----------------------------------
        Open Cashfree Checkout
        ----------------------------------
        */

        await cashfree.checkout({
          paymentSessionId:
            payment.payment_session_id,

          redirectTarget:
            "_self",
        });

        /*
        Browser will redirect.
        Nothing below this line
        will execute.
        */

      } catch (error: any) {
  console.log("========== CHECKOUT ERROR ==========");

  console.log(error);

  console.log("Status:", error?.status);

  console.log("Message:", error?.message);

  console.log("Data:", error?.data);

  console.log("===================================");

  notify.dismiss(loadingToast);

  notify.error(
    error?.message ??
      "Unable to start payment."
  );
} finally {
  setLoading(false);
}
    };

  if (isEmpty) return null;

  return (
    <main className="min-h-screen bg-[#09090f] px-6 py-14">
      <div className="mx-auto max-w-7xl">

        <CheckoutHeader />

        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          <div className="space-y-8 lg:col-span-2">

            <CustomerInformation
              form={form}
              onChange={onChange}
            />

            <ShippingAddress
              form={form}
              onChange={onChange}
            />

            <PaymentMethod />

          </div>

          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}

            couponCode={couponCode}
            couponLoading={couponLoading}
            appliedCoupon={appliedCoupon}

            onCouponChange={
              setCouponCode
            }

            onApplyCoupon={
              applyCoupon
            }

            onRemoveCoupon={
              removeCoupon
            }

            total={total}

            loading={loading}

            onCheckout={
              handleCheckout
            }
          />

        </div>
      </div>
    </main>
  );
}