"use client";

import {
	Button,
	Container,
	Icon,
	Stack,
	ToastProvider,
	Typography,
} from "@troisi/ui";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { external } from "@/lib/external";
import { troisiUiRepo } from "@/lib/projects";
import { SHOWCASE_NAV, type ShowcaseSectionId } from "@/lib/showcase-nav";
import { TroisiUIShowcase } from "./TroisiUIShowcase";

const NAV = SHOWCASE_NAV;
type SectionId = ShowcaseSectionId;

function scrollOffset() {
	const nav = getComputedStyle(document.documentElement).getPropertyValue(
		"--site-nav-height",
	);
	return (Number.parseFloat(nav) || 0) + 24;
}

function getActiveSection(): SectionId {
	const marker = scrollOffset() + 8;
	const docBottom = document.documentElement.scrollHeight;
	const viewBottom = window.scrollY + window.innerHeight;

	if (viewBottom >= docBottom - 8) {
		return NAV[NAV.length - 1][0];
	}

	let current: SectionId = NAV[0][0];
	for (const [id] of NAV) {
		const el = document.getElementById(id);
		if (el && el.getBoundingClientRect().top <= marker) current = id;
	}
	return current;
}

function scrollToSection(id: SectionId) {
	const el = document.getElementById(id);
	if (!el) return;
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset();
	window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

function readHashSection(): SectionId {
	if (typeof window === "undefined") return NAV[0][0];
	const hash = window.location.hash.slice(1) as SectionId;
	return NAV.some(([id]) => id === hash) ? hash : NAV[0][0];
}

export function TroisiUIPage() {
	const router = useRouter();
	const pathname = usePathname();
	const [active, setActive] = useState<SectionId>(readHashSection);
	const lock = useRef(false);
	const activeRef = useRef(active);
	activeRef.current = active;

	const go = useCallback((id: SectionId) => {
		lock.current = true;
		setActive(id);
		scrollToSection(id);
		window.setTimeout(() => {
			lock.current = false;
		}, 800);
	}, []);

	useEffect(() => {
		const initial = readHashSection();
		if (initial !== NAV[0][0]) {
			lock.current = true;
			scrollToSection(initial);
			window.setTimeout(() => {
				lock.current = false;
			}, 800);
		}

		let ticking = false;
		const onScroll = () => {
			if (ticking || lock.current) return;
			ticking = true;
			requestAnimationFrame(() => {
				const next = getActiveSection();
				if (next !== activeRef.current) setActive(next);
				ticking = false;
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	useEffect(() => {
		const hash = `#${active}`;
		if (window.location.hash === hash) return;
		router.replace(`${pathname}${hash}`, { scroll: false });
	}, [active, pathname, router]);

	return (
		<ToastProvider>
			<div className="site-page-troisiui">
				<SiteHeader />
				<div className="troisi-showcase-layout">
					<aside className="troisi-showcase-sidebar">
						<nav aria-labelledby="troisi-showcase-nav-title">
							<h2
								id="troisi-showcase-nav-title"
								className="troisi-showcase-sidebar__label"
							>
								On this page
							</h2>
							<ul className="troisi-showcase-sidebar__list">
								{NAV.map(([id, label]) => (
									<li key={id}>
										<a
											href={`#${id}`}
											className={`troisi-showcase-sidebar__link${active === id ? " troisi-showcase-sidebar__link--active" : ""}`}
											aria-current={active === id ? "location" : undefined}
											onClick={(e) => {
												e.preventDefault();
												go(id);
											}}
										>
											{label}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</aside>

					<main className="troisi-showcase-main">
						<div className="troisi-showcase-content">
							<Container>
								<header className="troisi-showcase-hero">
									<div className="troisi-showcase-hero__head">
										<Stack gap={4} className="troisi-showcase-hero__copy">
											<Typography variant="display" as="h1">
												Troisi UI
											</Typography>
											<Typography
												variant="body"
												tone="muted"
												className="troisi-showcase-hero__lead"
											>
												Open-source React components with a from-scratch CSS
												design system — light, dark, and system themes.
											</Typography>
										</Stack>
										<Button
											variant="secondary"
											size="sm"
											className="troisi-showcase-hero__github"
											onClick={() => window.open(troisiUiRepo, external.target)}
										>
											<Icon size="sm">
												<GitHubIcon />
											</Icon>
											View on GitHub
										</Button>
									</div>
								</header>
							</Container>

							<TroisiUIShowcase />
						</div>
					</main>
				</div>
				<SiteFooter />
			</div>
		</ToastProvider>
	);
}
