export const SHOWCASE_NAV = [
	["typography", "Typography"],
	["layout", "Layout"],
	["forms", "Forms"],
	["navigation", "Navigation"],
	["feedback", "Feedback"],
	["data", "Data"],
	["media", "Media"],
] as const;

export type ShowcaseSectionId = (typeof SHOWCASE_NAV)[number][0];
