import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", role: "user" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success("Signup successful. Please login.");
                navigate("/");
            } else {
                const err = await res.json();
                toast.error(err.message || "Signup failed");
            }
        } catch {
            toast.error("Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" required />
                <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Sign Up</button>
                <p className="text-sm text-center">
                    Already have an account? <Link to="/" className="text-blue-500 underline">Log in</Link>
                </p>
            </form>
        </div>
    );
}
