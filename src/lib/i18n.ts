import en from "./translations/en.json";

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

/** Spanish is the default locale and lives at the root (no prefix). */
export const DEFAULT_LANG: Lang = "es";

/**
 * Translation tables. Spanish is the source language, so its strings live
 * directly in the components — there is no `es` table. English is a flat
 * map of "Spanish phrase" -> "English phrase".
 */
const tables: Record<Lang, Record<string, string>> = {
  es: {},
  en: en as Record<string, string>,
};

/**
 * Translate a Spanish source string into the active language.
 * - In Spanish, returns the string unchanged.
 * - In English, returns the mapping from en.json, or the original string
 *   (a sensible fallback) when no translation exists yet.
 */
export function t(text: string, lang: Lang): string {
  if (lang === "es") return text;
  return tables[lang][text] ?? text;
}

/** Derive the active language from a pathname (English lives under /en). */
export function langFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/**
 * Build an href for a given language. `path` is always the canonical
 * (Spanish) path, e.g. "/" or "/projects". Spanish keeps the bare path;
 * English gets an /en prefix.
 */
export function localizedHref(path: string, lang: Lang): string {
  if (lang !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Strip the /en prefix from a pathname to get the canonical (Spanish) path. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
