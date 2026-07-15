import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import {
  CertificationsSection,
  ContactSection,
  GithubContributionsSection,
  ProjectsSection,
  SkillsSection,
  TechLogosRow,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <TechLogosRow />
      <GithubContributionsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
