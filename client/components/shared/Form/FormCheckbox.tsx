"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

interface Props {
  name: string;

  label: string;
}

export default function FormCheckbox({
  name,

  label,
}: Props) {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
      }) => (
        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={
              !!field.value
            }
            onChange={(e) =>
              field.onChange(
                e.target.checked
              )
            }
          />

          <span className="text-sm text-zinc-300">
            {label}
          </span>

        </label>
      )}
    />
  );
}