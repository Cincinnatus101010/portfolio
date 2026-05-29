"use client";

import { Badge, Grid, Stack, Typography } from "@troisi/ui";
import { skillGroups } from "@/lib/resume";
import { Section } from "./Section";

export function Skills() {
	return (
		<Section id="skills" title="Skills">
			<Grid cols={2} gap={6} className="site-skills-grid">
				{skillGroups.map((g) => (
					<Stack key={g.title} gap={3}>
						<Typography variant="h3">{g.title}</Typography>
						<div className="site-skill-list">
							{g.items.map((s) => (
								<Badge key={s}>{s}</Badge>
							))}
						</div>
					</Stack>
				))}
			</Grid>
		</Section>
	);
}
