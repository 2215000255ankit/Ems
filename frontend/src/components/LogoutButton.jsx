import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 🔐 Remove token
        localStorage.removeItem("token");

        // ✅ Navigate to login page (adjusted to your route)
        navigate("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
