import type { ImageMetadata } from "astro";

import contabilidad from "../assets/projects/contabilidad-api.jpg";
import crm from "../assets/projects/crm-ventas.jpg";
import facturador from "../assets/projects/facturador-sri.jpg";
import inventario from "../assets/projects/inventario-multibodega.jpg";
import nlp from "../assets/projects/nlp-tickets-es.jpg";
import nomina from "../assets/projects/nomina-ec.jpg";
import peuc from "../assets/projects/peuc.jpg";
import textrack from "../assets/projects/textrack.jpg";
import vision from "../assets/projects/vision-defectos-tela.jpg";
import vuln from "../assets/projects/vuln-manager.jpg";

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type Localized = Record<Lang, string>;

export const GITHUB = "https://github.com/DiegoFranciscoG";
export const LINKEDIN = "https://www.linkedin.com/in/diego-francisco-g-61b793254/";

export interface Project {
  slug: string;
  name: string;
  image: ImageMetadata;
  imageAlt: Localized;
  tagline: Localized;
  description: Localized;
  stack: string[];
  repo: string;
  demo?: string;
}

export interface Experience {
  role: Localized;
  organization: string;
  organizationDetail?: Localized;
  period: Localized;
  points: Record<Lang, string[]>;
  link?: string;
}

export interface SkillGroup {
  name: Localized;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  url?: string;
}

export interface CertificationGroup {
  name: Localized;
  items: Certification[];
}

export interface OtherProject {
  name: string;
  description: Localized;
  stack: string;
  repo: string;
}

const repo = (name: string) => `${GITHUB}/${name}`;

export const person = {
  name: "Diego Francisco Granda Zhingre",
  shortName: "Diego Granda",
  role: {
    es: "Desarrollador de Software · Backend y Full-Stack",
    en: "Software Developer · Backend & Full-Stack",
  },
  location: { es: "Cuenca, Ecuador", en: "Cuenca, Ecuador" },
  lead: {
    es: "Construyo software empresarial para Ecuador a partir de la norma oficial —SRI, IESS, Supercias y LOPDP— con pruebas automatizadas, integración continua y seguridad desde el primer commit.",
    en: "I build business software for Ecuador grounded in official regulations —tax authority, social security, companies regulator and data protection law— with automated tests, continuous integration and security from the first commit.",
  },
  availability: {
    es: "Disponibilidad inmediata · presencial, híbrido o remoto",
    en: "Available now · on-site, hybrid or remote",
  },
  languages: { es: "Español nativo · inglés técnico", en: "Spanish (native) · technical English" },
  photoAlt: { es: "Foto de Diego Francisco Granda Zhingre", en: "Photo of Diego Francisco Granda Zhingre" },
} as const;

export const projects: Project[] = [
  {
    slug: "textrack",
    name: "textrack",
    image: textrack,
    imageAlt: {
      es: "Tablero en vivo de textrack con OEE por módulo de costura y destajo por operario",
      en: "textrack live dashboard with OEE per sewing module and piece-rate pay per operator",
    },
    tagline: { es: "MES para plantas de confección", en: "Manufacturing execution system for garment plants" },
    description: {
      es: "Sigue cada prenda desde la orden de producción hasta el bulto con tickets QR firmados (HMAC), una app Android que escanea sin conexión, pago a destajo según el Código del Trabajo y OEE en vivo según ISO 22400-2.",
      en: "Tracks every garment from production order to bundle with HMAC-signed QR tickets, an offline-first Android scanner, piece-rate pay that follows Ecuador's Labor Code and live OEE per ISO 22400-2.",
    },
    stack: ["Java 25", "Spring Boot 4", "Angular 22", "Kotlin", "Jetpack Compose", "PostgreSQL"],
    repo: repo("textrack"),
  },
  {
    slug: "facturador-sri",
    name: "facturador-sri",
    image: facturador,
    imageAlt: {
      es: "Flujo de facturación electrónica: venta, XML, firma XAdES-BES, autorización del SRI y RIDE",
      en: "E-invoicing flow: sale, XML, XAdES-BES signature, SRI authorization and RIDE",
    },
    tagline: { es: "Punto de venta con facturación electrónica del SRI", en: "Point of sale with Ecuadorian e-invoicing" },
    description: {
      es: "Emite facturas y notas de crédito según el esquema offline del SRI: clave de acceso de 49 dígitos con módulo 11, XML validado con XSD, firma XAdES-BES, recepción, autorización y RIDE en PDF. 94 tests con el SRI simulado en WireMock.",
      en: "Issues invoices and credit notes under the SRI offline scheme: 49-digit access key with a mod-11 check digit, XSD-validated XML, XAdES-BES signature, submission, authorization and a PDF RIDE. 94 tests against a WireMock-simulated SRI.",
    },
    stack: ["Java", "Spring Boot 4", "Angular 22", "PostgreSQL", "WireMock", "Testcontainers"],
    repo: repo("facturador-sri"),
  },
  {
    slug: "vuln-manager",
    name: "vuln-manager",
    image: vuln,
    imageAlt: {
      es: "Tablero de vuln-manager con hallazgos priorizados por KEV, EPSS y plazos",
      en: "vuln-manager dashboard with findings prioritized by KEV, EPSS and deadlines",
    },
    tagline: { es: "Priorización de vulnerabilidades desde SBOM", en: "SBOM-driven vulnerability prioritization" },
    description: {
      es: "Ingesta SBOM CycloneDX, cruza cada componente con OSV.dev y lo enriquece con CISA KEV, SSVC, EPSS y NVD. Prioriza con una tabla de decisión explicable, calcula plazos según la BOD 26-04 y registra VEX con justificación.",
      en: "Ingests CycloneDX SBOMs, matches each component against OSV.dev and enriches it with CISA KEV, SSVC, EPSS and NVD. Prioritizes with an explainable decision table, computes BOD 26-04 deadlines and records justified VEX statements.",
    },
    stack: ["C#", ".NET 10", "Blazor", "EF Core", "PostgreSQL"],
    repo: repo("vuln-manager"),
  },
  {
    slug: "vision-defectos-tela",
    name: "vision-defectos-tela",
    image: vision,
    imageAlt: {
      es: "Inspección de tela con mapa de calor del defecto detectado",
      en: "Fabric inspection with a heat map of the detected defect",
    },
    tagline: { es: "Visión por computador para calidad textil", en: "Computer vision for textile quality control" },
    description: {
      es: "Detecta y localiza defectos en tela con PatchCore y los traduce a la decisión que usa la industria: 4 puntos ASTM D5430 por rollo y AQL ISO 2859-1 por lote. Entrenamiento reproducible, API con ONNX Runtime, MLflow y monitoreo de drift.",
      en: "Detects and localizes fabric defects with PatchCore and turns them into the decisions the industry uses: the ASTM D5430 four-point system per roll and ISO 2859-1 AQL per lot. Reproducible training, an ONNX Runtime API, MLflow and drift monitoring.",
    },
    stack: ["Python", "PyTorch", "ONNX Runtime", "FastAPI", "Streamlit", "MLflow"],
    repo: repo("vision-defectos-tela"),
  },
  {
    slug: "peuc",
    name: "PEUC",
    image: peuc,
    imageAlt: {
      es: "Pantallas de la app P.E.U.C.: inicio, pregunta resuelta y simulacro",
      en: "P.E.U.C. app screens: home, solved question and mock exam",
    },
    tagline: {
      es: "App para el examen de admisión de la Universidad de Cuenca",
      en: "Admission exam prep app for the University of Cuenca",
    },
    description: {
      es: "Las 2737 preguntas del banco oficial 2026 con respuestas verificadas, justificaciones y simulacros con la calificación real del examen. Funciona sin conexión en Android, iPhone y web.",
      en: "All 2,737 questions from the official 2026 bank with verified answers, explanations and mock exams scored like the real test. Works offline on Android, iPhone and the web.",
    },
    stack: ["Flutter", "Dart", "SQLite", "Python"],
    repo: repo("PEUC"),
    demo: "https://diegofranciscog.github.io/PEUC/",
  },
  {
    slug: "nlp-tickets-es",
    name: "nlp-tickets-es",
    image: nlp,
    imageAlt: {
      es: "Demo que clasifica un ticket en español y lo enruta al equipo de fraude",
      en: "Demo classifying a Spanish ticket and routing it to the fraud team",
    },
    tagline: { es: "Clasificación de tickets de soporte en español", en: "Spanish support ticket classification" },
    description: {
      es: "Predice intención, categoría, urgencia y sentimiento, sugiere el equipo destino y pide revisión humana cuando el modelo duda. Anonimiza cédulas, RUC, teléfonos y nombres antes de guardar (LOPDP) y busca casos parecidos con pgvector.",
      en: "Predicts intent, category, urgency and sentiment, suggests the target team and asks for human review when the model is unsure. Masks national IDs, tax IDs, phone numbers and names before storage and finds similar cases with pgvector.",
    },
    stack: ["Python", "FastAPI", "ONNX Runtime", "PostgreSQL", "pgvector", "Streamlit"],
    repo: repo("nlp-tickets-es"),
  },
  {
    slug: "crm-ventas",
    name: "crm-ventas",
    image: crm,
    imageAlt: {
      es: "Pipeline kanban del CRM con oportunidades por etapa",
      en: "CRM kanban pipeline with opportunities by stage",
    },
    tagline: { es: "CRM B2B con cumplimiento de la LOPDP", en: "B2B CRM built for data protection compliance" },
    description: {
      es: "Pipeline kanban, cotizaciones en PDF con IVA del SRI y forecast de ventas, con registro de consentimientos, derechos del titular y un log inmutable de accesos a datos personales.",
      en: "Kanban pipeline, PDF quotes with Ecuadorian VAT and sales forecasting, plus consent records, data-subject rights and an immutable access log for personal data.",
    },
    stack: ["Java 25", "Spring Boot 4", "Angular 22", "PostgreSQL"],
    repo: repo("crm-ventas"),
  },
  {
    slug: "contabilidad-api",
    name: "contabilidad-api",
    image: contabilidad,
    imageAlt: {
      es: "Estado de situación financiera generado por contabilidad-api",
      en: "Balance sheet generated by contabilidad-api",
    },
    tagline: { es: "Motor de contabilidad por partida doble", en: "Double-entry accounting engine" },
    description: {
      es: "Plan de cuentas de la Supercias, asientos que no se guardan si no cuadran, periodos que se cierran de verdad y estados financieros NIIF para las PYMES en Excel y PDF. Tests por propiedades con jqwik.",
      en: "Chart of accounts from Ecuador's companies regulator, journal entries rejected unless they balance, real period closing and IFRS for SMEs financial statements in Excel and PDF. Property-based tests with jqwik.",
    },
    stack: ["Java 25", "Spring Boot 4", "PostgreSQL", "jqwik", "Testcontainers"],
    repo: repo("contabilidad-api"),
  },
  {
    slug: "nomina-ec",
    name: "nomina-ec",
    image: nomina,
    imageAlt: {
      es: "Panel de nómina con costo del empleador y parámetros legales vigentes",
      en: "Payroll dashboard with employer cost and current legal parameters",
    },
    tagline: { es: "Rol de pagos ecuatoriano 2026", en: "Ecuadorian payroll 2026" },
    description: {
      es: "IESS, décimos, fondos de reserva, vacaciones e impuesto a la renta con parámetros legales versionados por fecha: si cambia el SBU se registra una vigencia nueva sin recompilar, con auditoría de cada cambio.",
      en: "Social security, 13th and 14th salaries, reserve funds, vacations and income tax with date-versioned legal parameters: a new minimum wage is a new record, not a redeploy, and every change is audited.",
    },
    stack: ["Java 21", "Spring Boot", "Angular 22", "PostgreSQL"],
    repo: repo("nomina-ec"),
  },
  {
    slug: "inventario-multibodega",
    name: "inventario-multibodega",
    image: inventario,
    imageAlt: {
      es: "Kárdex valorizado con costo promedio y transferencia entre bodegas",
      en: "Valued stock ledger with average cost and a transfer between warehouses",
    },
    tagline: { es: "WMS multibodega con kárdex valorizado", en: "Multi-warehouse WMS with a valued stock ledger" },
    description: {
      es: "Kárdex con costo promedio ponderado (NIC 2), lotes con despacho FEFO, transferencias atómicas entre bodegas, conteo cíclico aprobado por otra persona y lectura de códigos GS1 y QR. 89 tests con 85 % de cobertura.",
      en: "Weighted-average costing (IAS 2), FEFO lot picking, atomic transfers between warehouses, cycle counts approved by a different person and GS1/QR scanning. 89 tests with 85% coverage.",
    },
    stack: ["Java 25", "Spring Boot 4", "PostgreSQL", "Testcontainers"],
    repo: repo("inventario-multibodega"),
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: "HuellitasInteligentes",
    description: {
      es: "Proyecto de titulación: plataforma IoT para el cuidado de mascotas con app móvil, web y dispositivos ESP32.",
      en: "Capstone project: IoT pet-care platform with a mobile app, a web app and ESP32 devices.",
    },
    stack: "Spring Boot · Angular · Flutter · ESP32 · PostgreSQL",
    repo: repo("HuellitasInteligentes"),
  },
  {
    name: "athletesos",
    description: {
      es: "App personal de aprendizaje: calistenia, artes marciales, ajedrez, vocabulario y trivia.",
      en: "Personal learning app: calisthenics, martial arts, chess, vocabulary and trivia.",
    },
    stack: "Flutter · Spring Boot · PostgreSQL",
    repo: repo("athletesos"),
  },
  {
    name: "sistema-matricula-backend",
    description: { es: "API REST de matrícula estudiantil.", en: "Student enrollment REST API." },
    stack: "Spring Boot · JPA · MySQL",
    repo: repo("sistema-matricula-backend"),
  },
  {
    name: "ProyectoNube",
    description: {
      es: "Gestor de tareas con API REST documentada en OpenAPI.",
      en: "Task manager with an OpenAPI-documented REST API.",
    },
    stack: "Spring Boot · MongoDB · React",
    repo: repo("ProyectoNube"),
  },
  {
    name: "ServicioWEBSoapTaxi",
    description: {
      es: "Publicación y consumo de servicios web SOAP con contrato WSDL.",
      en: "Publishing and consuming SOAP web services with a WSDL contract.",
    },
    stack: "Java · SOAP · WSDL",
    repo: repo("ServicioWEBSoapTaxi"),
  },
];

export const experience: Experience[] = [
  {
    role: { es: "Practicante de desarrollo de software", en: "Software development intern" },
    organization: "RENAFIPSE",
    organizationDetail: {
      es: "Red Nacional de Finanzas Populares y Solidarias del Ecuador",
      en: "Ecuador's National Network of Popular and Solidarity Finance",
    },
    period: { es: "dic. 2025 – feb. 2026", en: "Dec 2025 – Feb 2026" },
    points: {
      es: ["Prácticas preprofesionales en bases de datos.", "Desarrollo de aplicaciones en Java con NetBeans."],
      en: ["Pre-professional internship in databases.", "Java application development with NetBeans."],
    },
  },
  {
    role: { es: "Proyecto de titulación · Huellitas Inteligentes", en: "Capstone project · Huellitas Inteligentes" },
    organization: "Instituto Superior Tecnológico del Azuay",
    period: { es: "2026", en: "2026" },
    points: {
      es: [
        "Plataforma IoT para el cuidado de mascotas: backend Spring Boot, web Angular, app Flutter y firmware ESP32.",
        "Desplegada en producción con la app Android distribuida desde el propio servidor.",
      ],
      en: [
        "IoT pet-care platform: Spring Boot backend, Angular web app, Flutter mobile app and ESP32 firmware.",
        "Deployed to production, with the Android app distributed from the project's own server.",
      ],
    },
    link: repo("HuellitasInteligentes"),
  },
];

export const education = {
  degree: { es: "Tecnólogo Superior en Desarrollo de Software", en: "Higher Technologist in Software Development" },
  school: "Instituto Superior Tecnológico del Azuay",
  detail: { es: "Cuenca · carrera culminada en 2026", en: "Cuenca · completed in 2026" },
} as const;

export const skills: SkillGroup[] = [
  { name: { es: "Backend", en: "Backend" }, items: ["Java", "Spring Boot", "C#", ".NET", "Python", "FastAPI", "REST", "SOAP"] },
  {
    name: { es: "Frontend y móvil", en: "Frontend & mobile" },
    items: ["Angular", "TypeScript", "Blazor", "Astro", "Flutter", "Kotlin", "Jetpack Compose"],
  },
  {
    name: { es: "Datos e IA", en: "Data & AI" },
    items: ["PostgreSQL", "pgvector", "MySQL", "MongoDB", "PyTorch", "ONNX Runtime", "Power BI"],
  },
  {
    name: { es: "Calidad y DevOps", en: "Quality & DevOps" },
    items: ["JUnit 5", "Testcontainers", "pytest", "Vitest", "Docker", "GitHub Actions"],
  },
  {
    name: { es: "Seguridad y nube", en: "Security & cloud" },
    items: ["OWASP Top 10", "gitleaks", "SBOM", "AWS", "Google Cloud"],
  },
];

export const certifications: CertificationGroup[] = [
  {
    name: { es: "Nube e infraestructura", en: "Cloud & infrastructure" },
    items: [
      { name: "AWS Technical Essentials", issuer: "AWS", year: 2026, url: "https://skillbuilder.aws/learn/K8C2FNZM6X/aws-technical-essentials-espaol-latam/2D4C2B2516" },
      { name: "AWS Cloud Practitioner (CLF-C02) official practice set", issuer: "AWS", year: 2026, url: "https://skillbuilder.aws/learn/E4W52ZKK6P/official-practice-question-set-aws-certified-cloud-practitioner-clfc02--espaol-latam/X5TCJA7KQV" },
      { name: "Essential Google Cloud Infrastructure: Core Services", issuer: "Google Cloud", year: 2024, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/8289377" },
      { name: "Getting Started with Google Kubernetes Engine", issuer: "Google Cloud", year: 2024, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/8335301" },
      { name: "Perform Foundational Infrastructure Tasks in Google Cloud", issuer: "Google Cloud", year: 2024, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/6942617" },
      { name: "Google Cloud Computing Foundations: Networking", issuer: "Google Cloud", year: 2023, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/6729527" },
      { name: "Google Cloud Computing Foundations: Infrastructure", issuer: "Google Cloud", year: 2023, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/6684924" },
      { name: "Google Cloud Computing Foundations: Cloud Computing Fundamentals", issuer: "Google Cloud", year: 2023, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/6604631" },
      { name: "Cloud Computing", issuer: "Google", year: 2023, url: "https://skillshop.exceedlms.com/student/award/8p8NWQ8m8qcptrZ25odujvMg" },
      { name: "Introduction to Generative AI", issuer: "Google Cloud", year: 2023, url: "https://www.cloudskillsboost.google/public_profiles/04c17f59-c775-4c12-b411-5f681170dfa7/badges/5986729" },
    ],
  },
  {
    name: { es: "Desarrollo de software y web", en: "Software & web development" },
    items: [
      { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", year: 2024, url: "https://freecodecamp.org/certification/woasous/javascript-algorithms-and-data-structures-v8" },
      { name: "Responsive Web Design", issuer: "freeCodeCamp", year: 2024, url: "https://freecodecamp.org/espanol/certification/woasous/responsive-web-design" },
      { name: "Java Fundamentals Course For Beginners", issuer: "Udemy", year: 2024, url: "https://www.udemy.com/certificate/UC-1baf6d53-8698-4557-a049-8031f9486556/" },
      { name: "Bootstrap & React Bootcamp with Hands-On Projects", issuer: "Udemy", year: 2024, url: "https://www.udemy.com/certificate/UC-585a9d40-28fa-4064-8f83-2118b43853c7/" },
      { name: "Python Demonstrations For Practice Course", issuer: "Udemy", year: 2024, url: "https://www.udemy.com/certificate/UC-7e472bf9-60f3-41e5-8f57-18fa44e1b52e/" },
      { name: "JavaScript", issuer: "Sololearn", year: 2025, url: "https://www.sololearn.com/certificates/CC-ZPM9DJ77" },
      { name: "CSS Avanzado", issuer: "Desafío Latam", year: 2024, url: "https://cursos.desafiolatam.com/certificates/p1br09o0fl" },
      { name: "Front End Development: HTML", issuer: "Great Learning", year: 2024, url: "https://www.mygreatlearning.com/certificate/KLXXUIGU" },
      { name: "Front End Development: CSS", issuer: "Great Learning", year: 2024, url: "https://www.mygreatlearning.com/certificate/NDSXKLTT" },
      { name: "Bases de Git y GitHub", issuer: "Desafío Latam", year: 2024, url: "https://cursos.desafiolatam.com/certificates/geovpuzfqx" },
      { name: "Microsoft Learn achievement", issuer: "Microsoft", year: 2024, url: "https://learn.microsoft.com/en-us/users/diegofranciscograndazhingre-5198/achievements/45qn8ack" },
      { name: "Introducción a las habilidades profesionales en el desarrollo de software", issuer: "LinkedIn Learning", year: 2023, url: "https://www.linkedin.com/learning/certificates/e58869164078c2d4f3cabd480691aea55c9543666259ea76615db55fa90714c5" },
      { name: "Fundamentos esenciales de la programación", issuer: "LinkedIn Learning", year: 2023, url: "https://www.linkedin.com/learning/certificates/039a47f82ef9805ee181b724df77d5c75bac6db0f7eb7ce37f9aebbde2a0fa61" },
      { name: "Fundamentos de la programación: más allá de lo básico", issuer: "LinkedIn Learning", year: 2023, url: "https://www.linkedin.com/learning/certificates/0aeb58980b70329f4c414e1ad70267848bb92fe917e0becb7d8f613c297dfb21" },
      { name: "Introducción al Desarrollo Web: HTML y CSS", issuer: "Google", year: 2022 },
    ],
  },
  {
    name: { es: "Datos y BI", en: "Data & BI" },
    items: [
      { name: "Scientific Computing with Python", issuer: "freeCodeCamp", year: 2025, url: "https://freecodecamp.org/certification/woasous/scientific-computing-with-python-v7" },
      { name: "Data Visualization with Power BI", issuer: "Great Learning", year: 2024, url: "https://www.mygreatlearning.com/certificate/HUUEZLFP" },
      { name: "Use Excel Spreadsheets with Python", issuer: "Udemy", year: 2024, url: "https://www.udemy.com/certificate/UC-ca0cacd7-6974-421f-9b88-ebfe99aa06a1/" },
      { name: "Introduction to Data Analytics", issuer: "Simplilearn", year: 2024, url: "https://simpli-web.app.link/e/f92o5YNRQIb" },
    ],
  },
  {
    name: { es: "Complementarias", en: "Additional" },
    items: [
      { name: "Ciberseguridad en la era digital: protección de datos y desafíos emergentes", issuer: "Desafío Latam", year: 2024, url: "https://cursos.desafiolatam.com/certificates/7ddvxsb4d5" },
      { name: "English for Developers & IT Professionals", issuer: "Desafío Latam", year: 2024, url: "https://cursos.desafiolatam.com/certificates/boad1qvy6b" },
      { name: "Introducción a IoT", issuer: "Cisco", year: 2023 },
      { name: "Advanced Microsoft Word", issuer: "Udemy", year: 2025 },
      { name: "Fundamentos de Marketing Digital", issuer: "Google", year: 2022 },
    ],
  },
];

export const certificationCount = certifications.reduce((total, group) => total + group.items.length, 0);
