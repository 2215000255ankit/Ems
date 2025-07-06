import React from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Correct hook

export default function UserDashboard() {
    const { role, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome, {role === "user" ? "User" : role}</h1>
                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                        You are now logged in to your dashboard.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Logout
                        </button>
                        <a
                            href="/user/home"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Go to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
