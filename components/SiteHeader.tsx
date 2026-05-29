"use client";

import { Button, Navbar, Stack } from "@troisi/ui";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
	["#skills", "Skills"],
	["#patents", "Patents"],
	["#projects", "Projects"],
	["#education", "Education"],
	["/troisiui/", "Troisi UI"],
] as const;

function resolveNavHref(href: string, isHome: boolean) {
	if (href.startsWith("/")) return href;
	return isHome ? href : `/${href}`;
}

function MenuIcon({ open }: { open: boolean }) {
	return (
		<span
			className={`site-header-menu-icon${open ? " site-header-menu-icon--open" : ""}`}
			aria-hidden="true"
		>
			<span />
			<span />
			<span />
		</span>
	);
}

export function SiteHeader() {
	const menuId = useId();
	const pathname = usePathname();
	const isHome = pathname === "/";
	const ref = useRef<HTMLDivElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = useCallback(() => setMenuOpen(false), []);
	const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

	useEffect(() => {
		closeMenu();
	}, [pathname, closeMenu]);

	useEffect(() => {
		if (!menuOpen) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeMenu();
		};
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [menuOpen, closeMenu]);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const set = () =>
			document.documentElement.style.setProperty(
				"--site-nav-height",
				`${el.offsetHeight}px`,
			);
		set();
		const ro = new ResizeObserver(set);
		ro.observe(el);
		return () => ro.disconnect();
	}, [menuOpen]);

	const navLinks = nav.map(([href, label]) => (
		<NextLink
			key={href}
			href={resolveNavHref(href, isHome)}
			className="troisi-link troisi-link--subtle site-header-nav__link"
			onClick={closeMenu}
		>
			{label}
		</NextLink>
	));

	return (
		<div ref={ref} className="site-header-shell">
			<Navbar
				brand={
					<NextLink
						href="/"
						className="troisi-navbar__brand-link"
						onClick={closeMenu}
					>
						Ian Troisi
					</NextLink>
				}
				className="site-header-nav"
			>
				<nav className="site-header-nav__desktop" aria-label="Main">
					<Stack direction="row" gap={4} align="center">
						{navLinks}
						<ThemeToggle />
					</Stack>
				</nav>
				<div className="site-header-nav__mobile-bar">
					<ThemeToggle />
					<Button
						type="button"
						variant="icon"
						size="sm"
						className="site-header-menu-toggle"
						aria-expanded={menuOpen}
						aria-controls={menuId}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						onClick={toggleMenu}
					>
						<MenuIcon open={menuOpen} />
					</Button>
				</div>
			</Navbar>

			{menuOpen ? (
				<>
					<button
						type="button"
						className="site-header-backdrop"
						aria-label="Close menu"
						onClick={closeMenu}
					/>
					<nav id={menuId} className="site-header-menu" aria-label="Main">
						{navLinks}
					</nav>
				</>
			) : null}
		</div>
	);
}
