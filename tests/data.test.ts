import { describe, expect, it } from "vitest";
import {
  GITHUB,
  LANGS,
  LINKEDIN,
  certificationCount,
  certifications,
  experience,
  otherProjects,
  person,
  projects,
  skills,
  type Localized,
} from "../src/data/profile";

const filled = (value: Localized) => LANGS.every((lang) => value[lang].trim().length > 0);

describe("proyectos destacados", () => {
  it("tienen slug y nombre únicos", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.name)).size).toBe(projects.length);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s tiene textos completos en ambos idiomas", (_, project) => {
    expect(filled(project.tagline)).toBe(true);
    expect(filled(project.description)).toBe(true);
    expect(filled(project.imageAlt)).toBe(true);
    expect(project.stack.length).toBeGreaterThan(0);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s enlaza a un repo propio y su imagen es 16:10", (_, project) => {
    expect(project.repo.startsWith(`${GITHUB}/`)).toBe(true);
    if (project.demo) expect(project.demo).toMatch(/^https:\/\//);
    expect(project.image.width / project.image.height).toBeCloseTo(1.6, 2);
  });

  it("las descripciones caben en una tarjeta", () => {
    for (const project of projects) {
      for (const lang of LANGS) expect(project.description[lang].length).toBeLessThanOrEqual(320);
    }
  });
});

describe("otros proyectos, experiencia y habilidades", () => {
  it("otros proyectos enlazan a repos propios y tienen descripción", () => {
    for (const item of otherProjects) {
      expect(item.repo.startsWith(`${GITHUB}/`)).toBe(true);
      expect(filled(item.description)).toBe(true);
    }
  });

  it("la experiencia incluye las prácticas en RENAFIPSE de dic. 2025 a feb. 2026", () => {
    const internship = experience.find((item) => item.organization === "RENAFIPSE");
    expect(internship).toBeDefined();
    expect(internship?.period.es).toBe("dic. 2025 – feb. 2026");
    expect(internship?.period.en).toBe("Dec 2025 – Feb 2026");
    expect(internship?.points.es.join(" ")).toMatch(/NetBeans/);
  });

  it("cada experiencia tiene rol, periodo y puntos en ambos idiomas", () => {
    for (const item of experience) {
      expect(filled(item.role)).toBe(true);
      expect(filled(item.period)).toBe(true);
      for (const lang of LANGS) expect(item.points[lang].length).toBeGreaterThan(0);
      expect(item.points.es.length).toBe(item.points.en.length);
    }
  });

  it("los grupos de habilidades no repiten tecnologías", () => {
    const all = skills.flatMap((group) => group.items);
    expect(new Set(all).size).toBe(all.length);
  });

  it("los datos personales del encabezado están completos", () => {
    expect(filled(person.role)).toBe(true);
    expect(filled(person.lead)).toBe(true);
    expect(LINKEDIN).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
  });
});

describe("certificaciones", () => {
  it("el contador coincide con la lista", () => {
    expect(certificationCount).toBe(certifications.flatMap((group) => group.items).length);
  });

  it("los enlaces de verificación son https y los años son razonables", () => {
    const thisYear = new Date().getFullYear();
    for (const cert of certifications.flatMap((group) => group.items)) {
      if (cert.url) expect(cert.url).toMatch(/^https:\/\//);
      expect(cert.year).toBeGreaterThanOrEqual(2020);
      expect(cert.year).toBeLessThanOrEqual(thisYear);
    }
  });

  it("no hay certificaciones duplicadas", () => {
    const names = certifications.flatMap((group) => group.items.map((cert) => cert.name));
    expect(new Set(names).size).toBe(names.length);
  });
});
