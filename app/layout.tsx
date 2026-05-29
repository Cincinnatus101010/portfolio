import "@troisi/ui/styles.css";
import type { Metadata } from "next";
import { ClientRoot } from "./ClientRoot";
import "./globals.css";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t!=="dark"&&t!=="light")return;document.documentElement.setAttribute("data-troisi-theme",t);var sync=function(){if(document.body)document.body.setAttribute("data-troisi-theme",t);};if(document.body)sync();else document.addEventListener("DOMContentLoaded",sync);}catch(e){}})();`;

export const metadata: Metadata = {
	title: "Ian Troisi | Full Stack Engineer",
	description:
		"Portfolio of Ian Troisi — full-stack developer building open-source UI, bots, and production web apps.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
			</head>
			<body className="troisi-root" suppressHydrationWarning>
				<ClientRoot>{children}</ClientRoot>
			</body>
		</html>
	);
}
