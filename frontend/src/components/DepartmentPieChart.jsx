import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0522d"];

function DepartmentPieChart({ data }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">
                Employees by Department
            </h2>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center text-gray-400 dark:text-gray-300">
                    No departments found.
                </p>
            )}
        </div>
    );
}

export default DepartmentPieChart;
