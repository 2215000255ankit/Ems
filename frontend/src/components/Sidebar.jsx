import React from "react";
import { useNavigate } from "react-router-dom";
import {
    HomeIcon,
    ListBulletIcon,
    UserPlusIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-10">
                    <UserCircleIcon className="w-10 h-10 mr-3" />
                    <div>
                        <p className="font-bold text-lg">Admin</p>
                        <p className="text-sm text-gray-300">admin@example.com</p>
                    </div>
                </div>

                <nav className="space-y-4">
                    <a href="/dashboard" className="flex items-center hover:text-yellow-300">
                        <HomeIcon className="w-5 h-5 mr-2" /> Dashboard
                    </a>
                    <a href="/employees" className="flex items-center hover:text-yellow-300">
                        <ListBulletIcon className="w-5 h-5 mr-2" /> Employee List
                    </a>
                    <a href="/add" className="flex items-center hover:text-yellow-300">
                        <UserPlusIcon className="w-5 h-5 mr-2" /> Add Employee
                    </a>
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="mt-10 flex items-center text-red-300 hover:text-white"
            >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> Logout
            </button>
        </div>
    );
}

export default Sidebar;
