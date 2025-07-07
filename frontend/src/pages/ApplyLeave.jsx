// src/pages/ApplyLeave.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

function ApplyLeave() {
    const [form, setForm] = useState({
        fromDate: "",
        toDate: "",
        reason: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.fromDate || !form.toDate || !form.reason) {
            toast.error("Fill all fields");
            return;
        }

        // You will later post this to backend
        toast.success("Leave request submitted (mock)");
        setForm({ fromDate: "", toDate: "", reason: "" });
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">From</label>
                    <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} className="p-2 w-full border rounded dark:bg-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium">To</label>
                    <input type="date" name="toDate" value={form.toDate} onChange={handleChange} className="p-2 w-full border rounded dark:bg-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Reason</label>
                    <textarea name="reason" value={form.reason} onChange={handleChange} className="p-2 w-full border rounded dark:bg-gray-700" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </form>
        </div>
    );
}

export default ApplyLeave;
