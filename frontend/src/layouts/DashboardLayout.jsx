import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    ListBulletIcon,
    UserPlusIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import DarkModeToggle from "../components/DarkModeToggle"; // ✅ exact match

function DashboardLayout() {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    // helper for active link style
    const active = (path) =>
        location.pathname === path ? "bg-blue-600" : "";

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 dark:text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
                    <nav className="space-y-4">
                        <Link
                            to="/admin/dashboard"
                            className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-600 ${active("/admin/dashboard")}`}
                        >
                            <HomeIcon className="w-5 h-5" />
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/employees"
                            className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-600 ${active("/admin/employees")}`}
                        >
                            <ListBulletIcon className="w-5 h-5" />
                            Employee List
                        </Link>

                        <Link
                            to="/admin/add"
                            className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-600 ${active("/admin/add")}`}
                        >
                            <UserPlusIcon className="w-5 h-5" />
                            Add Employee
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center text-red-300 hover:text-white gap-2"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                </button>
            </aside>

            {/* Main area */}
            <main className="flex-1 p-6 overflow-auto">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        {location.pathname.startsWith("/admin/dashboard") && "Admin Dashboard"}
                        {location.pathname.startsWith("/admin/employees") && "Employee List"}
                        {location.pathname.startsWith("/admin/add") && "Add Employee"}
                        {location.pathname.startsWith("/admin/edit") && "Edit Employee"}
                    </h1>
                    <DarkModeToggle />
                </div>

                {/* nested route content */}
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
