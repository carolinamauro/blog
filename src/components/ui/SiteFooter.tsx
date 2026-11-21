import Link from "next/link";
import { t, localizedHref, type Lang } from "@/src/lib/i18n";

const words = ["Software Engineer", "🎾", "Tenis", "🏃‍♀️", "Hyrox", "☁️", "AWS", "🤖", "IA", "🏖️", "Playa", "⛰️", "Lagos", "👩‍🏫", "FIUBA"];

export default function SiteFooter({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-surface">
      {/* marquee */}
      <div className="marquee-paused overflow-hidden border-b border-line py-4" aria-hidden>
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-3xl font-extrabold tracking-tight text-ink/80 sm:text-5xl">
          {[...words, ...words].map((w, i) => (
            <span key={i} className={i % 2 ? "" : "text-ink"}>
              {t(w, lang)}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            caro<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {t("Hecho con mate, raquetas y Next.js desde Buenos Aires, Argentina 🇦🇷", lang)}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <li><Link className="hover:text-accent" href={localizedHref("/projects", lang)}>{t("Proyectos", lang)}</Link></li>
            <li><Link className="hover:text-accent" href={localizedHref("/courses", lang)}>{t("Cursos", lang)}</Link></li>
            <li><Link className="hover:text-accent" href="/blog">Blog</Link></li>
            <li>
              <a className="hover:text-accent" href="https://www.linkedin.com/in/carolina-mauro-78751a220" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-faint">
            © {year} Carolina Lucia Mauro · {t("psst… probá", lang)}{" "}
            <kbd className="rounded border border-line px-1">↑↑↓↓←→←→BA</kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
