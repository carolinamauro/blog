export type Course = {
  id: string;
  title: string;
  institution: string;
  description: string;
  topics: string[];
  date: string;
  status: "completed" | "upcoming";
  certificate?: string;
};

// All visible copy stays in Spanish and is translated at render time with t().
export const courses: Course[] = [
  {
    id: "utn-professional-course",
    title: "Curso de formación profesional",
    institution: "Universidad Tecnológica Nacional (UTN)",
    description: "Aprendí a desarrollar aplicaciones con IA, incluyendo Open Source, ChatGPT y otros LLMs, y a integrar estas tecnologías en soluciones prácticas.",
    topics: ["Formación continua", "Desarrollo profesional"],
    date: "Finalizado",
    status: "completed",
    certificate: "/certificates/Curso_de_Desarrollo_de_Aplicaciones_con_IA__Open_Source__ChatGPT_y_otros_LLMs.pdf",
  },
  // {
  //   id: "aws-cloud",
  //   title: "Cloud & AWS",
  //   institution: "Próximo objetivo",
  //   description: "Profundizar en arquitectura cloud, servicios fundamentales de AWS y buenas prácticas para construir soluciones escalables.",
  //   topics: ["Arquitectura cloud", "Servicios de AWS"],
  //   date: "Próximamente",
  //   status: "upcoming",
  // },
  // {
  //   id: "ai-agents",
  //   title: "Agentes de IA",
  //   institution: "Próximo objetivo",
  //   description: "Aprender a diseñar agentes, conectarlos con herramientas y evaluar sistemas de IA que resuelvan problemas reales.",
  //   topics: ["LLMs", "Uso de herramientas", "Evaluación"],
  //   date: "En planificación",
  //   status: "upcoming",
  // },
];
