import type { Metadata } from "next";
import CoursesView from "../../../../components/views/CoursesView";

export const metadata: Metadata = {
  title: "Courses & certifications · Carolina Mauro",
  description: "Completed courses, certificates and upcoming learning goals.",
};

export default function CoursesPageEn() {
  return <CoursesView lang="en" />;
}
