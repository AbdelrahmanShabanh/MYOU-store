"use client";

import { useEffect, useState } from "react";

export default function AdminPromoCodesPage() {
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "percent",
    minOrder: "",
    expiry: "",
    usageLimit: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/promocodes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch promo codes");
      setCodes(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/promocodes/${editingId}`
      : `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/promocodes`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          discount: Number(form.discount),
          minOrder: form.minOrder ? Number(form.minOrder) : 0,
          usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
          expiry: form.expiry ? new Date(form.expiry) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to save promo code");
      setForm({
        code: "",
        discount: "",
        type: "percent",
        minOrder: "",
        expiry: "",
        usageLimit: "",
        description: "",
      });
      setEditingId(null);
      fetchCodes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (code: any) => {
    setForm({
      code: code.code,
      discount: code.discount.toString(),
      type: code.type,
      minOrder: code.minOrder?.toString() || "",
      expiry: code.expiry ? code.expiry.slice(0, 10) : "",
      usageLimit: code.usageLimit?.toString() || "",
      description: code.description || "",
    });
    setEditingId(code._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this promo code?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/promocodes/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete promo code");
      fetchCodes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Promo Codes
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Code"
          required
          className="px-4 py-2 border rounded"
        />
        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
          type="number"
          min="0"
          required
          className="px-4 py-2 border rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="px-4 py-2 border rounded"
        >
          <option value="percent">Percent (%)</option>
          <option value="fixed">Fixed (EGP)</option>
        </select>
        <input
          name="minOrder"
          value={form.minOrder}
          onChange={handleChange}
          placeholder="Min Order (optional)"
          type="number"
          min="0"
          className="px-4 py-2 border rounded"
        />
        <input
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          placeholder="Expiry Date (YYYY-MM-DD)"
          type="date"
          className="px-4 py-2 border rounded"
        />
        <input
          name="usageLimit"
          value={form.usageLimit}
          onChange={handleChange}
          placeholder="Usage Limit (optional)"
          type="number"
          min="0"
          className="px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="px-4 py-2 border rounded md:col-span-2"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {editingId ? "Update" : "Add"} Promo Code
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Min Order</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2">Usage Limit</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code._id}>
                <td className="px-4 py-2 font-mono">{code.code}</td>
                <td className="px-4 py-2">{code.discount}</td>
                <td className="px-4 py-2">{code.type}</td>
                <td className="px-4 py-2">{code.minOrder}</td>
                <td className="px-4 py-2">
                  {code.expiry ? code.expiry.slice(0, 10) : ""}
                </td>
                <td className="px-4 py-2">{code.usageLimit}</td>
                <td className="px-4 py-2">{code.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(code)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(code._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
