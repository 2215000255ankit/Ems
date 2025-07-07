import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
        joinDate: "",
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/employees/${id}`);
                const data = await res.json();
                setForm(data);
            } catch {
                toast.error("Failed to fetch employee");
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();
            toast.success("Employee updated!");
            navigate("/admin/employees"); // ✅ FIXED
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-yellow-300">Edit Employee</h2>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <div>
                    <label className="block font-medium mb-1 dark:text-white">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 dark:text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 dark:text-white">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 dark:text-white">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 dark:text-white">Join Date</label>
                    <input
                        type="date"
                        name="joinDate"
                        value={form.joinDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditEmployee;
