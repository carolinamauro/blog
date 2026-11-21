import type { ProjectStatus } from "./projects";

/** Shared colours for project status badges (theme-aware tokens). */
export const statusStyle: Record<ProjectStatus, { chip: string; dot: string }> = {
  "En progreso": { chip: "text-accent border-accent/30 bg-ball/15", dot: "bg-ball animate-pulse" },
  Iterando: { chip: "text-clay border-clay/30 bg-clay/10", dot: "bg-clay" },
  Completado: { chip: "text-court border-court/30 bg-court/10", dot: "bg-court" },
  Pausado: { chip: "text-muted border-line bg-surface-2", dot: "bg-faint" },
};
