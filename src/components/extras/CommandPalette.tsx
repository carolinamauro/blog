"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { t, langFromPathname, localizedHref, stripLangPrefix } from "@/src/lib/i18n";
import { OPEN_PALETTE_EVENT } from "../ui/navBar";
import { setTheme } from "../ui/ThemeToggle";
import { OPEN_GAME_EVENT } from "./TennisGame";

type PostLite = { slug: string; title: string; category?: string };

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: string;
  run: () => void;
};

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function CommandPalette({ posts }: { posts: PostLite[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const lang = langFromPathname(pathname);

  useEffect(() => {
    const show = () => {
      setQuery("");
      setIndex(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (document.querySelector("[data-palette]")) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, []);

  const items = useMemo<Item[]>(() => {
    const home = localizedHref("/", lang);
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };
    const section = (hash: string) => () => {
      setOpen(false);
      if (stripLangPrefix(pathname) === "/") {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`${home}#${hash}`);
      }
    };
    const nav = t("Navegar", lang);
    const sections = t("Secciones", lang);
    const actions = t("Acciones", lang);
    const blog = "Blog";

    return [
      { id: "home", group: nav, label: t("Inicio", lang), icon: "🏠", run: go(home) },
      { id: "projects", group: nav, label: t("Proyectos", lang), icon: "🛠️", run: go(localizedHref("/projects", lang)) },
      { id: "courses", group: nav, label: t("Cursos", lang), icon: "🎓", run: go(localizedHref("/courses", lang)) },
      { id: "blog", group: nav, label: "Blog", icon: "📝", run: go("/blog") },
      { id: "s-about", group: sections, label: t("Sobre mí", lang), icon: "👋", run: section("about") },
      { id: "s-story", group: sections, label: t("Mi carrera", lang), icon: "🏆", run: section("story") },
      { id: "s-stack", group: sections, label: t("Mi bolso de raquetas", lang), icon: "🎒", run: section("stack") },
      { id: "s-contact", group: sections, label: t("Contacto", lang), icon: "📬", run: section("contact") },
      { id: "a-light", group: actions, label: t("Tema claro", lang), icon: "☀️", run: () => { setTheme("light"); setOpen(false); } },
      { id: "a-dark", group: actions, label: t("Tema oscuro", lang), icon: "🌙", run: () => { setTheme("dark"); setOpen(false); } },
      {
        id: "a-lang",
        group: actions,
        label: lang === "es" ? "Switch to English" : "Cambiar a español",
        icon: lang === "es" ? "🇬🇧" : "🇦🇷",
        run: go(lang === "es" ? localizedHref(stripLangPrefix(pathname).startsWith("/blog") ? "/" : stripLangPrefix(pathname), "en") : stripLangPrefix(pathname)),
      },
      {
        id: "a-email",
        group: actions,
        label: t("Copiar email", lang),
        hint: "carolinaluciamauro@gmail.com",
        icon: "✉️",
        run: () => {
          navigator.clipboard?.writeText("carolinaluciamauro@gmail.com").catch(() => {});
          setOpen(false);
        },
      },
      {
        id: "a-game",
        group: actions,
        label: t("Jugar un set 🎾", lang),
        hint: t("easter egg", lang),
        icon: "🕹️",
        run: () => {
          setOpen(false);
          window.dispatchEvent(new Event(OPEN_GAME_EVENT));
        },
      },
      ...posts.map((p) => ({
        id: `p-${p.slug}`,
        group: blog,
        label: p.title,
        hint: p.category,
        icon: "📄",
        run: go(`/blog/${p.slug}`),
      })),
    ];
  }, [lang, pathname, posts, router]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items.filter((i) => !i.id.startsWith("p-")).concat(items.filter((i) => i.id.startsWith("p-")).slice(0, 4));
    return items.filter((i) => normalize(`${i.label} ${i.hint ?? ""} ${i.group}`).includes(q));
  }, [items, query]);

  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${safeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [safeIndex]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((safeIndex + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((safeIndex - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[safeIndex]?.run();
    }
  };

  let lastGroup = "";

  return (
    <div
      data-palette
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={t("Buscador rápido", lang)}
    >
      <div className="animate-fade-in-up w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <span className="tennis-ball h-4 w-4 shrink-0" aria-hidden />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t("¿A dónde vamos? Buscá secciones, posts o acciones…", lang)}
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-faint focus-visible:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[safeIndex] ? `palette-${filtered[safeIndex].id}` : undefined}
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
        </div>
        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted">{t("Out! No encontré nada 🎾", lang)}</li>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id}>
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                    {header}
                  </p>
                )}
                <button
                  type="button"
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={i === safeIndex}
                  data-idx={i}
                  onMouseMove={() => setIndex(i)}
                  onClick={item.run}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                    i === safeIndex ? "bg-ball text-ball-ink" : "text-ink"
                  }`}
                >
                  <span aria-hidden className="w-5 text-center">{item.icon}</span>
                  <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>
                  {item.hint && (
                    <span className={`truncate text-xs ${i === safeIndex ? "text-ball-ink/70" : "text-faint"}`}>{item.hint}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
