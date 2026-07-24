"use client";

import { MapPin } from "lucide-react";

import SectionCard from "@/components/shared/SectionCard";
import TextField, { TextArea } from "@/components/shared/TextField";

type Props = {
  form: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function ShippingAddress({
  form,
  onChange,
}: Props) {
  return (
    <SectionCard className="relative overflow-hidden">

      <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">

        <div className="mb-8 flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">

            <MapPin className="text-purple-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Shipping Address
            </h2>

            <p className="text-sm text-gray-400">
              Tell us where your collectibles should be delivered.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <TextArea
            rows={4}
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="House No., Street, Area, Landmark..."
          />

          <div className="grid gap-5 md:grid-cols-2">

            <TextField
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="City"
            />

            <TextField
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder="State"
            />

            <TextField
              name="pincode"
              value={form.pincode}
              onChange={onChange}
              placeholder="Pincode"
              className="md:col-span-2"
            />

          </div>

        </div>

      </div>

    </SectionCard>
  );
}