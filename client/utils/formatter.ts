export function formatPrice(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function formatDate(
  value: string | Date
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
    }
  ).format(new Date(value));
}

export function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
}