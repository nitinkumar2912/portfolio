import { footerMeta, personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="container border-t border-white/10 py-9 text-center text-sm text-zinc-600">
      <p>© 2026 {personal.name}. {footerMeta.stack}</p>
      <p className="mt-2">{footerMeta.source}</p>
      <a href="#home" className="mt-4 inline-block text-zinc-400 transition hover:text-zinc-100">
        Back to top
      </a>
    </footer>
  );
}
