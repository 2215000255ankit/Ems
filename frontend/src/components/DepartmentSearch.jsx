import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function DepartmentSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
                type="text"
                placeholder="Search departments..."
                className="border rounded p-2 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default DepartmentSearch;
