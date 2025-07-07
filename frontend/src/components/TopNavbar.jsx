import React, { useEffect, useState } from "react";
import AdminProfile from "./AdminProfile";
import DarkToggleButton from "./DarkModeToggle";

function TopNavbar() {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-blue-800 dark:text-yellow-300">
                {greeting}, Admin!
            </h1>
            <div className="flex items-center gap-4">
                <DarkToggleButton />
                <AdminProfile />
            </div>
        </div>
    );
}

export default TopNavbar;
