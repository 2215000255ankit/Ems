import React, { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import DepartmentSearch from "../components/DepartmentSearch";
import DepartmentPieChart from "../components/DepartmentPieChart";

function Dashboard() {
    const [employeeStats, setEmployeeStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        avgSalary: 0,
        departmentCounts: [],
    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/employees")
            .then((res) => res.json())
            .then((data) => {
                const departments = {};
                let totalSalary = 0;

                data.forEach((emp) => {
                    departments[emp.department] = (departments[emp.department] || 0) + 1;
                    totalSalary += emp.salary;
                });

                setEmployeeStats({
                    totalEmployees: data.length,
                    totalDepartments: Object.keys(departments).length,
                    avgSalary: data.length > 0 ? (totalSalary / data.length).toFixed(2) : 0,
                    departmentCounts: Object.entries(departments).map(([name, value]) => ({
                        name,
                        value,
                    })),
                });
            })
            .catch((err) => console.error("Failed to fetch stats", err));
    }, []);

    const filteredDepartments = employeeStats.departmentCounts.filter((dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <StatsCards
                totalEmployees={employeeStats.totalEmployees}
                totalDepartments={employeeStats.totalDepartments}
                avgSalary={employeeStats.avgSalary}
            />
            <DepartmentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DepartmentPieChart data={filteredDepartments} />
        </div>
    );
}

export default Dashboard;
