"use client";

import { Badge, Button, Card, Icon, Stack } from "@troisi/ui";
import NextLink from "next/link";
import { GitHubIcon } from "@/components/icons";
import { external } from "@/lib/external";
import { projects } from "@/lib/projects";
import { Section } from "./Section";

export function Projects() {
	return (
		<Section id="projects" title="Projects" gap={6}>
			<div className="site-grid">
				{projects.map((p) => (
					<Card
						key={p.id}
						className="site-project-card"
						title={p.title}
						description={p.description}
					>
						<Stack gap={4} className="site-project-card__body">
							<Stack direction="row" gap={2}>
								{p.tags.map((t) => (
									<Badge key={t}>{t}</Badge>
								))}
							</Stack>
							<div className="site-project-card__actions">
								{p.showcaseHref ? (
									<NextLink
										href={p.showcaseHref}
										className="troisi-button troisi-button--primary troisi-button--sm"
									>
										Open showcase
									</NextLink>
								) : null}
								<Button
									variant="secondary"
									size="sm"
									className="site-btn-with-icon"
									onClick={() => window.open(p.href, external.target)}
								>
									<Icon size="sm">
										<GitHubIcon />
									</Icon>
									View repo
								</Button>
							</div>
						</Stack>
					</Card>
				))}
			</div>
		</Section>
	);
}
