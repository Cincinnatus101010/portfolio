"use client";

import { Card, Stack, Typography } from "@troisi/ui";
import { certifications, education } from "@/lib/resume";
import { Section } from "./Section";

export function Education() {
	return (
		<Section id="education" title="Education">
			<Stack gap={4}>
				{education.map((e) => (
					<Card key={e.school} title={e.program} description={e.period}>
						<Typography variant="body" tone="muted">
							{e.school} · {e.location}
						</Typography>
					</Card>
				))}
			</Stack>
			<Stack gap={3}>
				<Typography variant="h3">Certifications</Typography>
				{certifications.map((c) => (
					<Typography key={c} variant="small" tone="muted">
						{c}
					</Typography>
				))}
			</Stack>
		</Section>
	);
}
