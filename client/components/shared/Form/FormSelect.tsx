"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import FormError from "./FormError";

interface Option {
  label: string;

  value: string;
}

interface Props {
  name: string;

  label: string;

  options: Option[];
}

export default function FormSelect({
  name,

  label,

  options,
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
        <div className="space-y-2">

          <label className="text-sm font-medium text-zinc-300">
            {label}
          </label>

          <select
            {...field}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-white outline-none transition focus:border-pink-500"
          >
            {options.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              )
            )}
          </select>

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