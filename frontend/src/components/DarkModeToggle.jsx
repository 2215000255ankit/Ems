import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function DarkToggleButton() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    const toggleDarkMode = () => {
        const nextMode = !darkMode;
        setDarkMode(nextMode);
        localStorage.setItem("theme", nextMode ? "dark" : "light");
    };

    useEffect(() => {
        const classList = document.documentElement.classList;
        darkMode ? classList.add("dark") : classList.remove("dark");
    }, [darkMode]);

    return (
        <button
            onClick={toggleDarkMode}
            className="transition duration-300 ease-in-out"
            title="Toggle Theme"
        >
            {darkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-180" />
            ) : (
                <MoonIcon className="w-6 h-6 text-blue-900 transition-transform duration-300 rotate-0 hover:-rotate-180" />
            )}
        </button>
    );
}

export default DarkToggleButton;
