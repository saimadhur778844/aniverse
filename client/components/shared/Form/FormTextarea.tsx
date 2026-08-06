"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import Textarea from "@/components/shared/Input/Textarea";
import FormError from "./FormError";

interface Props {
  name: string;

  label: string;

  placeholder?: string;
}

export default function FormTextarea({
  name,

  label,

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
          <Textarea
            {...field}
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