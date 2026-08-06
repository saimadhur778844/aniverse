export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "outline";

export interface BadgeProps {
  children: React.ReactNode;

  variant?: BadgeVariant;

  rounded?: boolean;

  className?: string;
}