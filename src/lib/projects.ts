export type ProjectStatus = "En progreso" | "Iterando" | "Completado" | "Pausado";

export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  stack: string[];
  highlights: string[];
  sections: ProjectSection[];
  links?: { label: string; href: string }[];
  period: string;
  context?: string;
}

export const projects: Project[] = [
  {
    slug: "blog",
    title: "Personal Blog & Portfolio",
    tagline: "Este mismo sitio — mi espacio en internet.",
    description:
      "Portfolio y blog técnico para documentar aprendizaje, stack y proyectos.",
    status: "En progreso",
    progress: 65,
    period: "2025 – actualidad",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    highlights: [
      "Blog con categorías y filtros",
      "Timeline profesional interactiva",
      "Animaciones espaciales con Canvas",
      "Posts en MDX con frontmatter",
    ],
    sections: [
      {
        title: "Por qué lo hice",
        content:
          "Quería un lugar propio donde documentar lo que aprendo, mostrar mis proyectos y tener una presencia profesional real. La mayoría de los portfolios que veía eran o muy genéricos o muy aburridos, así que decidí hacer uno que refleje cómo pienso y qué me gusta.",
      },
      {
        title: "Decisiones técnicas",
        content:
          "Elegí Next.js por el App Router y el soporte nativo de MDX para el blog. Tailwind para el CSS porque me permite iterar muy rápido en el diseño. Las animaciones del fondo (starfield, nebulas) las hice con Canvas API y CSS keyframes puras para no agregar dependencias innecesarias.",
      },
      {
        title: "Qué falta",
        content:
          "Quiero agregar un sistema de búsqueda en el blog, mejorar el SEO con metadatos dinámicos por post, y eventualmente agregar una sección de notas cortas (TILs). También quiero seguir refinando el diseño espacial.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/carolinamauro/blog" },
    ],
  },
  {
    slug: "garrahan",
    title: "Sistema de Prescripción Oncológica",
    tagline: "Automatizando recetas médicas en el Hospital Garrahan.",
    description:
      "Plataforma web para prescripción pediátrica oncológica con cálculo automático de dosis y trazabilidad de medicamentos.",
    status: "Completado",
    progress: 100,
    period: "2024 – 2025",
    context: "Trabajo Profesional · FIUBA · Hospital Garrahan",
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "OracleDB",
      "HL7 FHIR",
      "Docker",
      "JWT",
    ],
    highlights: [
      "Cálculo automático de dosis por peso y superficie corporal",
      "Generación de recetas en PDF (múltiples formatos: obra social, banco)",
      "Sistema de alertas cuando se aproxima el vencimiento de una receta",
      "Integración con el hospital vía HL7 FHIR",
      "Arquitectura distribuida con contenedores Docker",
      "Autenticación JWT con roles (médico / administrador)",
    ],
    sections: [
      {
        title: "El problema",
        content:
          "Los médicos oncólogos del Hospital Garrahan dedican una parte significativa de su día a calcular manualmente dosis de medicación para pacientes pediátricos y completar recetas en papel. Este proceso es tedioso, propenso a errores de cálculo, y no tiene ningún mecanismo que recuerde al médico cuándo emitir la próxima receta. El resultado: riesgo de interrupciones en tratamientos críticos y carga administrativa que podría estar automatizada.",
      },
      {
        title: "La solución",
        content:
          "Desarrollamos una aplicación web que automatiza el flujo completo de prescripción. El médico ingresa al sistema (autenticado desde el portal institucional La Lunita), selecciona un paciente, y el sistema le muestra el protocolo oncológico asignado, el ciclo actual y la medicación correspondiente. Con un clic genera la receta, el sistema calcula las dosis automáticamente basándose en el peso y la superficie corporal del paciente, selecciona las presentaciones disponibles, y exporta el documento en PDF listo para firmar.",
      },
      {
        title: "Arquitectura",
        content:
          "El sistema tiene tres capas bien separadas: la Web App (Next.js + React) que funciona como interfaz de usuario, la API App (Node.js + Express) que concentra toda la lógica de negocio, y la Base de Datos (OracleDB) como repositorio único. Todo desplegado en contenedores Docker independientes. La comunicación con el sistema del hospital se hace vía HL7 FHIR, usando endpoints tipo GET /fhir/Patient/:id para obtener datos clínicos del paciente en tiempo real.",
      },
      {
        title: "Mi rol",
        content:
          "Fui responsable del desarrollo frontend. Diseñé e implementé la interfaz de usuario en Next.js y React, desde el panel de pacientes hasta el flujo completo de generación de recetas. Trabajé en coordinación permanente con el equipo médico del Garrahan para validar que la UI reflejara correctamente los flujos clínicos reales. También participé en el diseño del modelo de datos y en la integración con el backend.",
      },
      {
        title: "Desafíos técnicos",
        content:
          "El mayor desafío fue mapear correctamente los protocolos oncológicos, que son esquemas muy complejos con ramificaciones según la respuesta del paciente. Tuvimos que diseñar un modelo de datos que representara ciclos, regímenes y ramificaciones de forma flexible. También fue complejo definir el protocolo de integración con el sistema del hospital (on-premise, sin acceso directo) — lo resolvimos especificando claramente los contratos de API e implementando un mock FHIR para desarrollo.",
      },
      {
        title: "Trabajos futuros",
        content:
          "El sistema fue entregado como Etapa 1 (prescripción automatizada). Las próximas etapas planificadas son: Etapa 2 — traducir la receta en un plan visual de aplicación de tratamiento (qué medicamentos, en qué fechas, en qué dosis), y Etapa 3 — sistema de control de stock y trazabilidad de medicamentos oncológicos que compare lo prescripto con lo efectivamente entregado.",
      },
    ],
    links: [
      {
        label: "Frontend (GitHub)",
        href: "https://github.com/carolinamauro/garrahan-prescription-system",
      },
      {
        label: "Backend (GitHub)",
        href: "https://github.com/ttomasbenitez/API-Garrahan",
      },
      {
        label: "Demo (video)",
        href: "https://drive.google.com/file/d/1Pln_Afht8X4Xx04berK-FVv96-DyzhVv/view?usp=sharing",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
