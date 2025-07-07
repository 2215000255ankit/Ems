import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="relative group cursor-pointer">
            <UserCircleIcon className="w-8 h-8" />
            <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg p-4 rounded right-0 mt-2 w-48 z-10">
                <p className="font-bold">Admin</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">admin@example.com</p>
                <button
                    onClick={handleLogout}
                    className="mt-3 w-full text-left text-red-500 hover:underline"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminProfile;
