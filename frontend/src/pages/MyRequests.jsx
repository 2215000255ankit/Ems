// src/pages/MyRequests.jsx
import React from "react";

function MyRequests() {
    // You'll fetch actual data later
    const requests = [
        { id: 1, from: "2025-06-01", to: "2025-06-05", status: "Approved" },
        { id: 2, from: "2025-07-10", to: "2025-07-12", status: "Pending" },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Leave Requests</h2>
            <div className="bg-white dark:bg-gray-900 rounded shadow p-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-2">From</th>
                            <th className="p-2">To</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="text-center">
                                <td className="p-2">{req.from}</td>
                                <td className="p-2">{req.to}</td>
                                <td className="p-2">{req.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyRequests;
