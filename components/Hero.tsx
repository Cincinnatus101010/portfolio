"use client";

import { Button, Container, Icon, Stack, Typography } from "@troisi/ui";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { external } from "@/lib/external";
import { profile } from "@/lib/resume";

export function Hero() {
	return (
		<section className="site-hero">
			<Container>
				<Stack gap={6}>
					<Stack gap={4}>
						<Typography variant="display" as="h1">
							{profile.name}
						</Typography>
						<Typography variant="h2" tone="muted">
							Full stack engineer
						</Typography>
						<Typography variant="body" tone="muted" className="site-hero__lead">
							{profile.summary}
						</Typography>
					</Stack>
					<Stack direction="row" gap={3}>
						<Button
							className="site-btn-with-icon"
							onClick={() => window.open(profile.github, external.target)}
						>
							<Icon size="sm">
								<GitHubIcon />
							</Icon>
							GitHub
						</Button>
						<Button
							variant="secondary"
							className="site-btn-with-icon"
							onClick={() => window.open(profile.linkedin, external.target)}
						>
							<Icon size="sm">
								<LinkedInIcon />
							</Icon>
							LinkedIn
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								document
									.getElementById("projects")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							View projects
						</Button>
					</Stack>
				</Stack>
			</Container>
		</section>
	);
}
