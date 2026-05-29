"use client";

import { useEffect } from "react";
import { profile } from "@/lib/resume";

const STORAGE_KEY = "portfolio-hire-console";
const W = 48;

function center(text: string) {
	if (text.length >= W) return text.slice(0, W);
	const pad = W - text.length;
	const left = Math.floor(pad / 2);
	return `${" ".repeat(left)}${text}${" ".repeat(pad - left)}`;
}

function row(text: string) {
	return `  ║ ${text.padEnd(W)} ║`;
}

function rowCenter(text: string) {
	return `  ║ ${center(text)} ║`;
}

export function HireMeConsole() {
	useEffect(() => {
		if (sessionStorage.getItem(STORAGE_KEY)) return;
		sessionStorage.setItem(STORAGE_KEY, "1");

		const rule = `  ╔${"═".repeat(W + 2)}╗`;
		const foot = `  ╚${"═".repeat(W + 2)}╝`;

		console.log(
			[
				"",
				rule,
				row(""),
				rowCenter("If you're reading this..."),
				row(""),
				rowCenter("HIRE ME"),
				row(""),
				rowCenter(profile.name),
				rowCenter("Full stack · Python · Rust · Next.js"),
				row(""),
				row(profile.email),
				row(profile.github.replace("https://", "")),
				row(profile.linkedin.replace("https://www.", "")),
				row(""),
				rowCenter("Thanks for snooping. You're my kind of people."),
				row(""),
				foot,
				"",
			].join("\n"),
		);
	}, []);

	return null;
}
