import { describe, expect, it } from "vitest";
import { absoluteUrl, homePath, otherLang, t, ui } from "../src/i18n/ui";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key));
}

describe("textos de la interfaz", () => {
  it("español e inglés tienen exactamente las mismas claves", () => {
    expect(keyPaths(ui.en).sort()).toEqual(keyPaths(ui.es).sort());
  });

  it("ningún texto está vacío", () => {
    for (const lang of ["es", "en"] as const) {
      for (const path of keyPaths(ui[lang])) {
        const value = path.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], ui[lang]);
        expect(String(value).trim(), `${lang}.${path}`).not.toBe("");
      }
    }
  });

  it("las descripciones SEO tienen entre 70 y 200 caracteres", () => {
    for (const lang of ["es", "en"] as const) {
      expect(t(lang).description.length).toBeGreaterThanOrEqual(70);
      expect(t(lang).description.length).toBeLessThanOrEqual(200);
    }
  });
});

describe("rutas e idiomas", () => {
  it("el español es la raíz y el inglés vive en /en/", () => {
    expect(homePath("es")).toBe("/");
    expect(homePath("en")).toBe("/en/");
  });

  it("otherLang alterna entre los dos idiomas", () => {
    expect(otherLang("es")).toBe("en");
    expect(otherLang("en")).toBe("es");
  });

  it("absoluteUrl une el sitio y la ruta con o sin barra final", () => {
    expect(absoluteUrl("https://example.org", "/en/")).toBe("https://example.org/en/");
    expect(absoluteUrl("https://example.org/", "/og-es.png")).toBe("https://example.org/og-es.png");
    expect(absoluteUrl("https://example.org/", "/")).toBe("https://example.org/");
  });
});
