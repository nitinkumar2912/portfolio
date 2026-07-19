import { personal, footerMeta } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="container border-t border-white/10 py-6 text-center text-sm text-zinc-600">
      <p>© 2026 {personal.name}. {footerMeta.source}</p>
      <a href="#about" className="mt-4 inline-block text-zinc-400 transition hover:text-zinc-100" aria-label="Back to top of page">
        Back to top
      </a>
    </footer>
  );
}
