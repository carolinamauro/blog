import type { Metadata } from "next";
import ProjectsView from "../../../components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Proyectos · Carolina Mauro",
  description: "Proyectos personales y profesionales que estoy construyendo.",
};

export default function ProjectsPage() {
  return <ProjectsView lang="es" />;
}
