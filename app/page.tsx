import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { Patents } from "@/components/Patents";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";

export default function HomePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<Skills />
				<Patents />
				<Projects />
				<Education />
			</main>
			<SiteFooter />
		</>
	);
}
