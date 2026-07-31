"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/admin/shared/PageHeader";
import PageToolbar from "@/components/admin/shared/PageToolbar";
import Pagination from "@/components/admin/shared/Pagination";

import CustomerTable from "@/components/admin/customers/CustomerTable";
import CustomerDetailsDrawer from "@/components/admin/customers/CustomerDetailsDrawer";

import customerService from "@/services/customerService";

import type {
  Customer,
  CustomerDetails,
} from "@/types/customer";

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);

  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  async function loadCustomers() {
    try {
      setLoading(true);

      const data =
        await customerService.getCustomers({
          page,
          limit: 10,
          search,
        });

      setCustomers(data.customers);
      setPages(data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleViewCustomer(
    id: string
  ) {
    try {
      const customer =
        await customerService.getCustomer(id);

      setSelectedCustomer(customer);

      setDrawerOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Customers"
        description="Manage your customers and their orders."
      />

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        onRefresh={loadCustomers}
      />

      <CustomerTable
        customers={customers}
        loading={loading}
        onView={handleViewCustomer}
      />

      <Pagination
        page={page}
        pages={pages}
        onChange={setPage}
      />

      <CustomerDetailsDrawer
        open={drawerOpen}
        customer={selectedCustomer}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </div>
  );
}