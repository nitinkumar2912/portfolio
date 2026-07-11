import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import {
  CertificationsSection,
  ContactSection,
  GithubContributionsSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <GithubContributionsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
