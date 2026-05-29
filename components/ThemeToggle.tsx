"use client";

import { Switch, useTheme } from "@troisi/ui";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const dark = mounted && resolvedTheme === "dark";

	return (
		<Switch
			id="theme-toggle"
			label={dark ? "Dark" : "Light"}
			checked={dark}
			onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
			aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
		/>
	);
}
