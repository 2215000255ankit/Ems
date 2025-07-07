// src/pages/EmployeeList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  /* ───────────────── fetch employees ───────────────── */
  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((res) => res.json())
      .then(setEmployees)
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  /* ───────────────── delete ───────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ───────────────── search + sort ───────────────── */
  const filtered = employees
    .filter((e) =>
      (e.name + e.department).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  /* ───────────────── render ───────────────── */
  return (
    <div className="p-6">
      {/* header & search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-yellow-300">
          Employee List
        </h1>
        <input
          type="text"
          placeholder="Search name or department…"
          className="border p-2 rounded w-full sm:w-72 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded">
        <table className="min-w-full text-sm text-left border dark:border-gray-700">
          <thead className="bg-blue-600 text-white dark:bg-gray-700">
            <tr>
              {["name", "email", "department", "salary"].map((f) => (
                <th
                  key={f}
                  className="p-3 cursor-pointer hover:underline"
                  onClick={() => toggleSort(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {sortField === f && (sortOrder === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filtered.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">₹ {emp.salary}</td>
                <td className="p-3 space-x-3">
                  {/* ✅ absolute admin path */}
                  <Link
                    to={`/admin/edit/${emp._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!filtered.length && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500 dark:text-gray-300">
                  No matching employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
