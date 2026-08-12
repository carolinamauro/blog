import type { Metadata } from "next";
import CoursesView from "../../../components/views/CoursesView";

export const metadata: Metadata = {
  title: "Cursos y certificaciones · Carolina Mauro",
  description: "Pequeño registro de los cursos que he realizado, los caminos que completé y los temas que quiero explorar a continuación.",
};

export default function CoursesPage() {
  return <CoursesView lang="es" />;
}
