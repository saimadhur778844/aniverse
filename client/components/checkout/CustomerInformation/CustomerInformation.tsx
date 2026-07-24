"use client";

import SectionCard from "@/components/shared/SectionCard";
import TextField from "@/components/shared/TextField";
import { User } from "lucide-react";

type Props = {
  form: {
    fullName: string;
    email: string;
    phone: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function CustomerInformation({
  form,
  onChange,
}: Props) {
  return (
    <SectionCard className="relative overflow-hidden">

      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative">

        <div className="mb-8 flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">

            <User className="text-pink-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Customer Information
            </h2>

            <p className="text-sm text-gray-400">
              We'll use these details for order updates.
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <TextField
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full Name"
          />

          <TextField
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email Address"
          />

          <TextField
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone Number"
            className="md:col-span-2"
          />

        </div>

      </div>

    </SectionCard>
  );
}