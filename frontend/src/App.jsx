// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin pages + layout
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

// User pages + layout
import UserLayout from "./layouts/UserLayout";
import UserHome from "./pages/UserHome";
import ApplyLeave from "./pages/ApplyLeave";
import MyRequests from "./pages/MyRequests";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const defaultPath = role === "admin" ? "/admin/dashboard"
    : role === "user" ? "/user/home"
      : "/";

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={
            token ? <Navigate to={defaultPath} replace /> : <Login />
          }
        />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add" element={<AddEmployee />} />
          <Route path="edit/:id" element={<EditEmployee />} />
        </Route>

        {/* User */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<UserHome />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="my-requests" element={<MyRequests />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
