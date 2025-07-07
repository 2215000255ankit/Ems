
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const departments = ["HR", "IT", "Finance", "Marketing", "Sales", "Operations"];

export default function AddEmployee() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    joinDate: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setForm({ name: "", email: "", department: "", salary: "", joinDate: "" });
    setImage(null);
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, department, salary, joinDate } = form;

    if (!name || !email || !department || !salary || !joinDate) {
      toast.error("Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Employee added successfully");
      navigate("/admin/employees");
    } catch {
      toast.error("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-yellow-300 mb-6">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-5">
        {/* Profile image preview */}
        <div className="text-center">
          {image ? (
            <img src={image} alt="Preview" className="mx-auto mb-2 w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter email"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">Salary</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="₹ Amount"
          />
        </div>

        {/* Join Date */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">Join Date</label>
          <input
            type="date"
            name="joinDate"
            value={form.joinDate}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? "Submitting…" : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-600 hover:underline dark:text-gray-300"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
