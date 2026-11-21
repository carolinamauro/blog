import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  t,
  langFromPathname,
  localizedHref,
  stripLangPrefix,
  type Lang,
} from "@/src/lib/i18n";

export default function LangSwitch() {
  const base = "px-2.5 py-1 text-xs font-bold transition-colors rounded-full";
  const on = "bg-ink text-bg";
  const off = "text-muted hover:text-ink";

  const pathname = usePathname();
  const lang: Lang = langFromPathname(pathname);
  const canonical = stripLangPrefix(pathname);
  const isBlog = canonical === "/blog" || canonical.startsWith("/blog/");
  const esHref = canonical;
  const enHref = isBlog ? "/en" : localizedHref(canonical, "en");

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line bg-surface-2 p-0.5"
      aria-label={t("Idioma", lang)}
    >
      <Link href={esHref} className={`${base} ${lang === "es" ? on : off}`} aria-current={lang === "es"}>
        ES
      </Link>
      <Link href={enHref} className={`${base} ${lang === "en" ? on : off}`} aria-current={lang === "en"}>
        EN
      </Link>
    </div>
  );
}
