"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import {Input} from "@/components/shared/Input";
import FormError from "./FormError";

interface Props {
  name: string;

  label: string;

  type?: string;

  placeholder?: string;
}

export default function FormInput({
  name,

  label,

  type = "text",

  placeholder,
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

        fieldState,
      }) => (
        <div>
          <Input
            {...field}
            type={type}
            label={label}
            placeholder={
              placeholder
            }
          />

          <FormError
            message={
              fieldState.error
                ?.message
            }
          />
        </div>
      )}
    />
  );
}