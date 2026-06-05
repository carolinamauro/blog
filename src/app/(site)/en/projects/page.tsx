import type { Metadata } from "next";
import ProjectsView from "../../../../components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects · Carolina Mauro",
  description: "Personal and professional projects I'm building.",
};

export default function ProjectsPageEn() {
  return <ProjectsView lang="en" />;
}
