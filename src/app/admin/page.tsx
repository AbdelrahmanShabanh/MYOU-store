'use client';

import { useState } from 'react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiPackage } from 'react-icons/fi';
import Link from 'next/link';

// Mock data for dashboard
const mockData = {
  stats: {
    revenue: {
      total: 12500,
      change: 12.5,
      period: 'This Month'
    },
    orders: {
      total: 245,
      change: 8.2,
      period: 'This Month'
    },
    customers: {
      total: 120,
      change: 15.3,
      period: 'This Month'
    },
    products: {
      total: 85,
      change: 5.7,
      period: 'Total'
    }
  },
  recentOrders: [
    { id: '1001', customer: 'John Doe', date: '2023-06-15', amount: 125.50, status: 'Completed' },
    { id: '1002', customer: 'Jane Smith', date: '2023-06-14', amount: 75.25, status: 'Processing' },
    { id: '1003', customer: 'Robert Johnson', date: '2023-06-13', amount: 250.00, status: 'Completed' },
    { id: '1004', customer: 'Emily Davis', date: '2023-06-12', amount: 95.75, status: 'Shipped' },
    { id: '1005', customer: 'Michael Wilson', date: '2023-06-11', amount: 175.50, status: 'Completed' }
  ],
  lowStockProducts: [
    { id: 'P001', name: 'Floral Scarf', stock: 3, threshold: 5 },
    { id: 'P002', name: 'Silk Kimono', stock: 2, threshold: 5 },
    { id: 'P003', name: 'Cotton Hijab', stock: 4, threshold: 5 },
    { id: 'P004', name: 'Embroidered Shawl', stock: 1, threshold: 5 }
  ]
};

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
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
            <span className={`text-sm font-medium ${mockData.stats.revenue.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {mockData.stats.revenue.change >= 0 ? '+' : ''}{mockData.stats.revenue.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${mockData.stats.revenue.total.toLocaleString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockData.stats.revenue.period}</p>
        </div>

        {/* Orders Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`text-sm font-medium ${mockData.stats.orders.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {mockData.stats.orders.change >= 0 ? '+' : ''}{mockData.stats.orders.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Orders</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.stats.orders.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockData.stats.orders.period}</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className={`text-sm font-medium ${mockData.stats.customers.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {mockData.stats.customers.change >= 0 ? '+' : ''}{mockData.stats.customers.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Customers</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.stats.customers.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockData.stats.customers.period}</p>
        </div>

        {/* Products Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
              <FiPackage className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <span className={`text-sm font-medium ${mockData.stats.products.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {mockData.stats.products.change >= 0 ? '+' : ''}{mockData.stats.products.change}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Products</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.stats.products.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockData.stats.products.period}</p>
        </div>
      </div>

      {/* Recent Orders and Low Stock Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockData.recentOrders.map((order) => (
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
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
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Low Stock Products</h2>
            <Link href="/admin/products" className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Threshold
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockData.lowStockProducts.map((product) => (
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock <= 0
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : product.stock < product.threshold
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {product.stock <= 0 ? 'Out of Stock' : product.stock < product.threshold ? 'Low Stock' : 'In Stock'}
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
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/products/new" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full mr-4">
              <FiPackage className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Add New Product</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Create a new product listing</p>
            </div>
          </Link>
          <Link href="/admin/orders" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
              <FiShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Orders</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">View and process orders</p>
            </div>
          </Link>
          <Link href="/admin/users" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
              <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">View and manage user accounts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 