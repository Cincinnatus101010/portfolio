"use client";

import { ThemeProvider } from "@troisi/ui";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { HireMeConsole } from "@/components/HireMeConsole";

const SiteBackground = dynamic(
	() => import("@/components/SiteBackground").then((m) => m.SiteBackground),
	{ ssr: false },
);

export function ClientRoot({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
			<HireMeConsole />
			{pathname === "/" && <SiteBackground />}
			<div className="site-content">{children}</div>
		</ThemeProvider>
	);
}
