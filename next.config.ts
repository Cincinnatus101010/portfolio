import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const troisiUiRoot = path.resolve(rootDir, "../TroisiUI");

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/portfolio" : "";

const nextConfig: NextConfig = {
	output: "export",
	basePath,
	assetPrefix: basePath ? `${basePath}/` : undefined,
	trailingSlash: true,
	images: { unoptimized: true },
	transpilePackages: ["@troisi/ui"],
	// Bun `file:` installs symlink the package; Turbopack cannot follow those nested links.
	turbopack: {
		resolveAlias: {
			"@troisi/ui": path.join(troisiUiRoot, "dist/index.js"),
			"@troisi/ui/styles.css": path.join(
				troisiUiRoot,
				"dist/styles/troisi-ui.css",
			),
		},
	},
};

export default nextConfig;
