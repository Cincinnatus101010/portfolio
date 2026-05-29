interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	href: string;
}

export const projects: Project[] = [
	{
		id: "troisi-ui",
		title: "Troisi UI",
		description:
			"Open-source React component library with a from-scratch CSS design system, no Tailwind. Tokens, light/dark themes, 60+ components.",
		tags: ["React", "TypeScript", "Design system", "Bun"],
		href: "https://github.com/Cincinnatus101010/TroisiUI",
	},
	{
		id: "clipper-bot",
		title: "Clipper Discord Bot",
		description:
			"TypeScript Discord bot with Docker deployment. Automation and polish aimed at real server ops, not demo scripts.",
		tags: ["TypeScript", "Discord", "Docker"],
		href: "https://github.com/Cincinnatus101010/Clipper-Discord-Bot-",
	},
	{
		id: "portfolio",
		title: "This portfolio",
		description:
			"Static Next.js site on GitHub Pages, styled entirely with Troisi UI. Showcases the library in production.",
		tags: ["Next.js", "GitHub Pages", "Troisi UI"],
		href: "https://github.com/Cincinnatus101010/portfolio",
	},
];

export const troisiUiRepo =
	projects.find((p) => p.id === "troisi-ui")?.href ??
	"https://github.com/Cincinnatus101010/TroisiUI";
