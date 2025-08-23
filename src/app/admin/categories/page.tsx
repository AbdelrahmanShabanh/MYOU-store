"use client";
import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      setCategories(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory.trim() }),
        }
      );
      if (!res.ok) throw new Error("Failed to add category");
      setNewCategory("");
      fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete category");
      fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Manage Categories</h1>
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700"
          disabled={loading}
        >
          Add
        </button>
      </form>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <ul className="divide-y divide-gray-200">
        {categories.map((cat) => (
          <li key={cat._id} className="flex justify-between items-center py-2">
            <span>{cat.name}</span>
            <button
              onClick={() => handleDeleteCategory(cat._id)}
              className="text-sm text-red-600 hover:underline"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 