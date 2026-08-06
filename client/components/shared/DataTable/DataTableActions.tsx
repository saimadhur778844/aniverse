import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DataTableActions({
  children,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-2">
      {children}
    </div>
  );
}