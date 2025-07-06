import React from "react";

function StatsCards({ totalEmployees, totalDepartments, avgSalary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <h2 className="text-xl font-semibold">Total Employees</h2>
                <p className="text-3xl mt-2 text-blue-700 dark:text-blue-300">
                    {totalEmployees}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <h2 className="text-xl font-semibold">Departments</h2>
                <p className="text-3xl mt-2 text-green-700 dark:text-green-300">
                    {totalDepartments}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <h2 className="text-xl font-semibold">Avg. Salary</h2>
                <p className="text-3xl mt-2 text-yellow-600 dark:text-yellow-300">
                    ₹ {avgSalary}
                </p>
            </div>
        </div>
    );
}

export default StatsCards;
