"use client";

import { Container, Stack, type StackGap, Typography } from "@troisi/ui";
import type { ReactNode } from "react";

export function Section({
	id,
	title,
	intro,
	gap = 8,
	children,
}: {
	id: string;
	title: string;
	intro?: ReactNode;
	gap?: StackGap;
	children: ReactNode;
}) {
	return (
		<section id={id} className="site-section">
			<Container>
				<Stack gap={gap}>
					<Typography variant="h2">{title}</Typography>
					{intro}
					{children}
				</Stack>
			</Container>
		</section>
	);
}
