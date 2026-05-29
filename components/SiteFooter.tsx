"use client";

import { Container, Typography } from "@troisi/ui";

export function SiteFooter() {
	return (
		<footer className="site-footer">
			<Container>
				<Typography variant="small" tone="muted" as="p">
					© {new Date().getFullYear()} Ian Troisi. Built with Next.js and Troisi
					UI.
				</Typography>
			</Container>
		</footer>
	);
}
