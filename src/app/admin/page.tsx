"use client";

import { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const statsRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/api/admin/analytics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const statsData = await statsRes.json();
        setStats(statsData);
        // Fetch all products and filter for low stock
        const productsRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/api/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const products = await productsRes.json();
        setLowStockProducts(
          products
            .filter((p: any) => typeof p.stock === "number" && p.stock < 3)
            .map((p: any) => ({ ...p, id: p._id, threshold: 3 }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <select
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="year">Last 12 months</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FiDollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span
              className={`text-sm font-medium ${
                stats?.revenue?.change >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stats?.revenue?.change >= 0 ? "+" : ""}
              {stats?.revenue?.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${stats?.revenue?.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats?.revenue?.period}
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span
              className={`text-sm font-medium ${
                stats?.orders?.change >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stats?.orders?.change >= 0 ? "+" : ""}
              {stats?.orders?.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Orders
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.orders?.total}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats?.orders?.period}
          </p>
        </div>

        {/* Customers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span
              className={`text-sm font-medium ${
                stats?.customers?.change >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stats?.customers?.change >= 0 ? "+" : ""}
              {stats?.customers?.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Customers
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.customers?.total}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats?.customers?.period}
          </p>
        </div>

        {/* Products Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
              <FiPackage className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <span
              className={`text-sm font-medium ${
                stats?.products?.change >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stats?.products?.change >= 0 ? "+" : ""}
              {stats?.products?.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Products
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.products?.total}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats?.products?.period}
          </p>
        </div>
      </div>

      {/* Recent Orders and Low Stock Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Low Stock Products
            </h2>
            <Link
              href="/admin/products"
              className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Threshold
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.threshold}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock <= 0
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : product.stock < product.threshold
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {product.stock <= 0
                          ? "Out of Stock"
                          : product.stock < product.threshold
                          ? "Low Stock"
                          : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full mr-4">
              <FiPackage className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Add New Product
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Create a new product listing
              </p>
            </div>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
              <FiShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Orders
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View and process orders
              </p>
            </div>
          </Link>
          <Link
            href="/admin/users"
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
              <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Users
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View and manage user accounts
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
