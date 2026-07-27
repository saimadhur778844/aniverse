declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeOptions {
    mode?: "sandbox" | "production";
    appId?: string;
    orderToken?: string;
    paymentSessionId?: string;
    redirectTarget?: string;
    onSuccess?: (data: unknown) => void;
    onFailure?: (data: unknown) => void;
    onClose?: () => void;
  }

  export function load(options?: CashfreeOptions): Promise<{
    init: (options: CashfreeOptions) => void;
    checkout: (options: CashfreeOptions) => void;
  }>;
}
