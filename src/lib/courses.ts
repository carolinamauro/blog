export type Course = {
  id: string;
  title: string;
  institution: string;
  description: string;
  topics: string[];
  date: string;
  status: "completed" | "studying" | "upcoming";
  certificate?: string;
};

// All visible copy stays in Spanish and is translated at render time with t().
export const courses: Course[] = [
  {
    id: "utn-professional-course",
    title: "Curso de Desarrollo de Aplicaciones con IA (Open Source, ChatGPT y otros LLMs)",
    institution: "Universidad Tecnológica Nacional (UTN)",
    description: "Aprendí a desarrollar aplicaciones con IA, incluyendo Open Source, ChatGPT y otros LLMs, y a integrar estas tecnologías en soluciones prácticas.",
    topics: ["IA", "Open Source", "ChatGPT", "LLMs", "Desarrollo de aplicaciones", "Agentes", "RAG", "Lang Chain"],
    date: "Finalizado",
    status: "completed",
    certificate: "/certificates/Curso_de_Desarrollo_de_Aplicaciones_con_IA__Open_Source__ChatGPT_y_otros_LLMs.pdf",
  },
  {
    id: "electronic-circuit-design",
    title: "Curso de Diseño de circuitos electrónicos (PCB)",
    institution: "Universidad Tecnológica Nacional (UTN)",
    description: "Abordar los fundamentos del diseño y la fabricación de circuitos impresos (PCB), desde las primeras etapas de desarrollo hasta la obtención de una placa funcional.",
    topics: ["PCB", "Diseño electrónico"],
    date: "17 de agosto de 2026",
    status: "studying",
  },
  {
    id: "aws-cloud",
    title: "Cloud & AWS",
    institution: "Universidad Tecnológica Nacional (UTN)",
    description: "Profundizar en arquitectura cloud, servicios fundamentales de AWS y buenas prácticas para construir soluciones escalables.",
    topics: ["Arquitectura cloud", "Servicios de AWS"],
    date: "Próximamente",
    status: "upcoming",
  },
];
