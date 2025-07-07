import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { token, role } = useAuth();
    const location = useLocation();

    if (!token) return <Navigate to="/" state={{ from: location }} replace />;
    if (allowedRoles && !allowedRoles.includes(role))
        return <Navigate to="/" replace />;

    return children;
}
