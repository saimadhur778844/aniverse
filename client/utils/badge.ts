export function getStatusVariant(
  status: string
):
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "primary"
  | "secondary" {
  switch (
    status.toLowerCase()
  ) {
    case "delivered":

    case "paid":

    case "active":

    case "completed":

      return "success";

    case "cancelled":

    case "failed":

    case "inactive":

    case "out of stock":

      return "danger";

    case "pending":

    case "packed":

      return "warning";

    case "shipped":

    case "processing":

      return "info";

    case "admin":

    case "manager":

      return "primary";

    default:
      return "secondary";
  }
}