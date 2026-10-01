import type { Lang } from "../data/profile";

export const ui = {
  es: {
    htmlLang: "es-EC",
    ogLocale: "es_EC",
    title: "Diego Francisco Granda Zhingre · Desarrollador de Software",
    description:
      "Portafolio de Diego Francisco Granda Zhingre, desarrollador backend y full-stack en Cuenca, Ecuador: facturación electrónica SRI, nómina IESS, MES textil, visión por computador y DevSecOps.",
    skip: "Saltar al contenido",
    nav: { projects: "Proyectos", experience: "Experiencia", skills: "Habilidades", certifications: "Certificaciones", contact: "Contacto" },
    navLabel: "Secciones",
    switchLang: "English",
    switchLangLabel: "Ver el sitio en inglés",
    themeToggle: "Cambiar tema claro u oscuro",
    heroCta: "Ver proyectos",
    stats: { projects: "proyectos en 2026", certifications: "certificaciones verificables", availability: "disponibilidad" },
    availabilityValue: "Inmediata",
    projectsTitle: "Proyectos destacados",
    projectsIntro: "Cada proyecto parte de fuentes oficiales, tiene pruebas automatizadas, CI con escaneo de secretos y se levanta con Docker.",
    code: "Código",
    demo: "Demo en vivo",
    otherProjects: "Otros proyectos",
    experienceTitle: "Experiencia y formación",
    education: "Formación",
    skillsTitle: "Habilidades",
    certificationsTitle: "Certificaciones",
    certificationsIntro: "Cada enlace abre la verificación oficial del emisor.",
    verify: "verificar",
    contactTitle: "¿Hablamos?",
    contactText: "Busco mi primer empleo como desarrollador backend o full-stack. Escríbeme por LinkedIn.",
    contactCta: "Escribir por LinkedIn",
    footer: "Sitio estático hecho con Astro, sin rastreadores ni cookies.",
    notFoundTitle: "Página no encontrada",
    notFoundText: "La dirección no existe o cambió.",
    backHome: "Volver al inicio",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Diego Francisco Granda Zhingre · Software Developer",
    description:
      "Portfolio of Diego Francisco Granda Zhingre, backend and full-stack developer in Cuenca, Ecuador: e-invoicing, payroll, garment MES, computer vision and DevSecOps projects.",
    skip: "Skip to content",
    nav: { projects: "Projects", experience: "Experience", skills: "Skills", certifications: "Certifications", contact: "Contact" },
    navLabel: "Sections",
    switchLang: "Español",
    switchLangLabel: "View the site in Spanish",
    themeToggle: "Toggle light or dark theme",
    heroCta: "See projects",
    stats: { projects: "projects in 2026", certifications: "verifiable certifications", availability: "availability" },
    availabilityValue: "Immediate",
    projectsTitle: "Featured projects",
    projectsIntro: "Every project starts from official sources and ships with automated tests, CI with secret scanning and a one-command Docker setup.",
    code: "Code",
    demo: "Live demo",
    otherProjects: "Other projects",
    experienceTitle: "Experience & education",
    education: "Education",
    skillsTitle: "Skills",
    certificationsTitle: "Certifications",
    certificationsIntro: "Each link opens the issuer's official verification page.",
    verify: "verify",
    contactTitle: "Let's talk",
    contactText: "I am looking for my first role as a backend or full-stack developer. Message me on LinkedIn.",
    contactCta: "Message me on LinkedIn",
    footer: "Static site built with Astro, with no trackers or cookies.",
    notFoundTitle: "Page not found",
    notFoundText: "This address does not exist or has moved.",
    backHome: "Back to home",
  },
} as const;

export type UiStrings = (typeof ui)[Lang];

export function t(lang: Lang): UiStrings {
  return ui[lang];
}

/** Ruta de la página de inicio en cada idioma (el español es el idioma por defecto). */
export function homePath(lang: Lang): string {
  return lang === "es" ? "/" : `/${lang}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

/** Une URL absolutas sin duplicar ni perder barras. */
export function absoluteUrl(site: string, path: string): string {
  return new URL(path, site.endsWith("/") ? site : `${site}/`).toString();
}
