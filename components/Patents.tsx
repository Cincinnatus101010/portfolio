"use client";

import { Badge, Card, Link, Stack, Typography } from "@troisi/ui";
import { external } from "@/lib/external";
import { patents, patentsProfileUrl } from "@/lib/resume";
import { Section } from "./Section";

const granted = patents.filter((p) => p.status === "granted");
const published = patents.filter((p) => p.status === "published");

const groups = [
	["Granted", "success", granted],
	["Published applications", "default", published],
] as const;

export function Patents() {
	return (
		<Section
			id="patents"
			title="Patents"
			intro={
				<>
					<Typography variant="body" tone="muted">
						U.S. patents and published applications as inventor Ian Davies
						Troisi.
					</Typography>
					<Link href={patentsProfileUrl} variant="subtle" {...external}>
						View full listing on Justia
					</Link>
				</>
			}
		>
			{groups.map(([title, variant, items]) => (
				<Stack key={title} gap={4}>
					<Stack direction="row" gap={2} align="center">
						<Typography variant="h3">{title}</Typography>
						<Badge variant={variant}>{items.length}</Badge>
					</Stack>
					<div className="site-grid">
						{items.map((p) => (
							<Card
								key={p.number}
								title={p.number}
								description={`${p.issued} · ${p.assignee}`}
							>
								<Stack gap={3}>
									<Typography variant="body" tone="muted">
										{p.title}
									</Typography>
									<Link href={p.href} variant="subtle" {...external}>
										View on Justia
									</Link>
								</Stack>
							</Card>
						))}
					</div>
				</Stack>
			))}
		</Section>
	);
}
