"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  t,
  langFromPathname,
  localizedHref,
  stripLangPrefix,
} from "@/src/lib/i18n";
import LangSwitch from "../LangSwitch";
import ThemeToggle from "./ThemeToggle";

export const OPEN_PALETTE_EVENT = "caro:open-palette";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  // Close the drawer whenever the route changes (adjusting state during render
  // avoids an extra effect pass).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lang = langFromPathname(pathname);
  const canonical = stripLangPrefix(pathname);

  const navigation = [
    { name: t("Inicio", lang), href: localizedHref("/", lang), pathname: "/" },
    { name: t("Proyectos", lang), href: localizedHref("/projects", lang), pathname: "/projects" },
    { name: t("Cursos", lang), href: localizedHref("/courses", lang), pathname: "/courses" },
    { name: t("Blog", lang), href: "/blog", pathname: "/blog" },
  ];

  function isActive(p: string) {
    if (p === "/") return canonical === "/";
    return canonical.startsWith(p);
  }

  const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border px-3 pl-5 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "border-line bg-surface/85 shadow-card backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          href={localizedHref("/", lang)}
          className="group flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink"
          aria-label="Caro — inicio"
        >
          caro
          <span className="tennis-ball h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-180" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = isActive(item.pathname);
            return (
              <li key={item.pathname}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-ink text-bg"
                      : "text-muted hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs font-semibold text-muted transition hover:text-ink sm:inline-flex"
            aria-label={t("Abrir buscador rápido", lang)}
          >
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </button>
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <ThemeToggle label={t("Cambiar tema claro/oscuro", lang)} />
          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t("Cerrar menú", lang) : t("Abrir menú", lang)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="size-6">
              {isMenuOpen ? (
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in-up mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-surface p-3 shadow-card md:hidden"
        >
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.pathname}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 font-display text-lg font-bold ${
                    isActive(item.pathname) ? "bg-ball text-ball-ink" : "text-ink hover:bg-surface-2"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-line px-2 pt-3">
            {/* Clicks bubble up from the ES/EN links, so choosing a language also closes the drawer. */}
            <div onClick={() => setIsMenuOpen(false)}>
              <LangSwitch />
            </div>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openPalette();
              }}
              className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-muted"
            >
              🔎 {t("Buscar", lang)}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
