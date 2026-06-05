import type { Metadata } from "next";
import { projects, getProjectBySlug } from "../../../../../lib/projects";
import ProjectDetailView from "../../../../../components/views/ProjectDetailView";
import { t } from "../../../../../lib/i18n";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${t(project.title, "en")} · Carolina Mauro`,
    description: t(project.description, "en"),
  };
}

export default async function ProjectDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} lang="en" />;
}
