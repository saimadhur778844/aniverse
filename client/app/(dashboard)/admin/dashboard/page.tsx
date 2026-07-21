"use client";

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Products
          </h3>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Categories
          </h3>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Users
          </h3>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>
      </div>
    </>
  );
}