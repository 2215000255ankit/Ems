import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserLayout() {
    const { logout } = useAuth();

    const linkClass = ({ isActive }) =>
        `block px-3 py-2 rounded ${isActive ? "bg-purple-600" : "hover:bg-purple-600"
        }`;

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-700 text-white p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-10">User Panel</h2>
                    <nav className="space-y-3">
                        <NavLink to="/user/home" className={linkClass}>🏠 Home</NavLink>
                        <NavLink to="/user/apply-leave" className={linkClass}>✉️ Apply Leave</NavLink>
                        <NavLink to="/user/my-requests" className={linkClass}>📋 My Requests</NavLink>
                        <NavLink to="/user/dashboard" className={linkClass}>📊 Dashboard</NavLink>
                    </nav>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-300 hover:text-white"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                </button>
            </aside>

            {/* Main area */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
