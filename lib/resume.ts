export const profile = {
	name: "Ian Troisi",
	email: "troisiian@gmail.com",
	github: "https://github.com/Cincinnatus101010",
	linkedin: "https://www.linkedin.com/in/ian-troisi-a1a4b3412/",
	summary:
		"Builds production systems from the ground up: Python and Rust backends, Next.js frontends, and React Native / Expo apps with Expo UI. Two granted U.S. patents (Imagine Technologies) for EEG wearables and smart-environment control.",
};

type PatentEntry = {
	number: string;
	title: string;
	status: "granted" | "published";
	issued: string;
	assignee: string;
	href: string;
};

export const patents: PatentEntry[] = [
	{
		number: "US 11,816,266",
		title:
			"Method of developing a database of controllable objects in an environment",
		status: "granted",
		issued: "November 14, 2023",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/11816266",
	},
	{
		number: "US 11,500,463",
		title:
			"Wearable electroencephalography sensor and device control methods using same",
		status: "granted",
		issued: "November 15, 2022",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/11500463",
	},
	{
		number: "US 2024/0036650",
		title:
			"Method of developing a database of controllable objects in an environment",
		status: "published",
		issued: "February 1, 2024",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/20240036650",
	},
	{
		number: "US 2023/0018742",
		title:
			"Method of developing a database of controllable objects in an environment",
		status: "published",
		issued: "January 19, 2023",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/20230018742",
	},
	{
		number: "US 2022/0207281",
		title:
			"Method of developing a database of controllable objects in an environment",
		status: "published",
		issued: "June 30, 2022",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/20220207281",
	},
	{
		number: "US 2022/0206576",
		title:
			"Wearable electroencephalography sensor and device control methods using same",
		status: "published",
		issued: "June 30, 2022",
		assignee: "Imagine Technologies",
		href: "https://patents.justia.com/patent/20220206576",
	},
];

export const patentsProfileUrl =
	"https://patents.justia.com/inventor/ian-davies-troisi";

export const education = [
	{
		program: "Robotics Engineering (2 years)",
		period: "2019 to 2021",
		school: "Widener University",
		location: "Philadelphia, PA",
	},
	{
		program: "High School Diploma",
		period: "2017 to 2019",
		school: "Notre Dame Green Pond",
		location: "Easton, PA",
	},
];

export const certifications = [
	"Microsoft Office Specialist, Word & PowerPoint (2014 to Present)",
	"Bing Ads Certification",
	"U.S. Patents US 11,500,463, US 11,816,266 (Imagine Technologies)",
];

export const skillGroups = [
	{
		title: "Languages",
		items: ["Python", "JavaScript / TypeScript", "SQL", "Rust", "Ruby"],
	},
	{
		title: "Frontend",
		items: ["Next.js", "React", "HTML5", "CSS"],
	},
	{
		title: "Backend & APIs",
		items: ["REST APIs", "Granian", "NGINX", "Bun", "Rails"],
	},
	{
		title: "Mobile",
		items: ["React Native", "Expo", "Expo UI", "iOS", "Android"],
	},
	{
		title: "Databases",
		items: ["MySQL", "PostgreSQL", "SQL"],
	},
	{
		title: "Cloud & DevOps",
		items: [
			"AWS",
			"GCP",
			"Azure",
			"Docker",
			"Linux",
			"Git",
			"Traefik",
			"Caddy",
		],
	},
	{
		title: "Other",
		items: [
			"Patent portfolio management",
			"Technical leadership",
			"CI/CD",
			"Design systems",
		],
	},
];
