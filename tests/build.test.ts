import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseHTML } from "linkedom";
import { beforeAll, describe, expect, it } from "vitest";

// Revisa el sitio ya compilado (dist/): ejecuta `npm run build` antes de estos tests.
const DIST = join(process.cwd(), "dist");
const SITE = "https://diegofranciscog.github.io";

const PAGES = [
  { file: "index.html", lang: "es-EC", path: "/", indexable: true },
  { file: "en/index.html", lang: "en", path: "/en/", indexable: true },
  { file: "404.html", lang: "es-EC", path: "/404/", indexable: false },
] as const;

function load(file: string) {
  const html = readFileSync(join(DIST, file), "utf8");
  return { html, document: parseHTML(html).document };
}

const sha256 = (text: string) => createHash("sha256").update(text).digest("base64");

beforeAll(() => {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error("No existe dist/: ejecuta `npm run build` antes de `npm test`.");
  }
});

describe.each(PAGES)("$file", (page) => {
  it("declara el idioma, un único h1 y un título descriptivo", () => {
    const { document } = load(page.file);
    expect(document.documentElement.getAttribute("lang")).toBe(page.lang);
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    const title = document.querySelector("title")?.textContent ?? "";
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThanOrEqual(70);
  });

  it("tiene meta description, viewport y canonical absoluto", () => {
    const { document } = load(page.file);
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")?.length).toBeGreaterThan(50);
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toMatch(/^https:\/\/diegofranciscog\.github\.io\//);
  });

  it("todas las imágenes tienen texto alternativo y dimensiones", () => {
    const { document } = load(page.file);
    for (const img of document.querySelectorAll("img")) {
      expect(img.getAttribute("alt")?.trim(), img.outerHTML).toBeTruthy();
      expect(img.getAttribute("width"), img.outerHTML).toBeTruthy();
      expect(img.getAttribute("height"), img.outerHTML).toBeTruthy();
    }
  });

  it("la CSP cubre cada script y estilo en línea y no carga recursos de otros dominios", () => {
    const { document } = load(page.file);
    const csp = document.querySelector('meta[http-equiv="content-security-policy"]')?.getAttribute("content") ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    for (const script of document.querySelectorAll("script")) {
      const src = script.getAttribute("src");
      if (src) {
        expect(src.startsWith("/")).toBe(true);
        continue;
      }
      if (script.getAttribute("type") === "application/ld+json") continue;
      expect(csp, script.textContent?.slice(0, 60)).toContain(`sha256-${sha256(script.textContent ?? "")}`);
    }
    for (const style of document.querySelectorAll("style")) {
      expect(csp).toContain(`sha256-${sha256(style.textContent ?? "")}`);
    }
    for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });

  it("los enlaces internos (#ancla) apuntan a ids existentes y no hay enlaces http inseguros", () => {
    const { document } = load(page.file);
    for (const anchor of document.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href") ?? "";
      expect(href.startsWith("http://"), href).toBe(false);
      if (href.startsWith("#")) expect(document.getElementById(href.slice(1)), href).not.toBeNull();
      expect(anchor.textContent?.trim() || anchor.getAttribute("aria-label"), anchor.outerHTML).toBeTruthy();
    }
  });
});

describe.each(PAGES.filter((page) => page.indexable))("$file (indexable)", (page) => {
  it("enlaza la versión en el otro idioma con hreflang", () => {
    const { document } = load(page.file);
    const alternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
      link.getAttribute("hreflang"),
      link.getAttribute("href"),
    ]);
    expect(alternates).toEqual(
      expect.arrayContaining([
        ["es-EC", `${SITE}/`],
        ["en", `${SITE}/en/`],
        ["x-default", `${SITE}/`],
      ]),
    );
  });

  it("tiene Open Graph con imagen existente y datos estructurados de persona", () => {
    const { document } = load(page.file);
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
    expect(ogImage.startsWith(`${SITE}/`)).toBe(true);
    expect(existsSync(join(DIST, new URL(ogImage).pathname))).toBe(true);
    const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}");
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe("Diego Francisco Granda Zhingre");
    expect(jsonLd.sameAs).toEqual(expect.arrayContaining([expect.stringContaining("github.com/DiegoFranciscoG")]));
  });

  it("muestra las 10 tarjetas de proyecto y la experiencia en RENAFIPSE", () => {
    const { document } = load(page.file);
    expect(document.querySelectorAll(".project-grid > li")).toHaveLength(10);
    expect(document.querySelector("#experiencia")?.textContent).toContain("RENAFIPSE");
  });
});

describe("archivos del sitio", () => {
  it("el 404 no se indexa", () => {
    const { document } = load("404.html");
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex");
  });

  it("el sitemap incluye las dos páginas y robots.txt lo anuncia", () => {
    const sitemap = readFileSync(join(DIST, "sitemap-0.xml"), "utf8");
    expect(sitemap).toContain(`<loc>${SITE}/</loc>`);
    expect(sitemap).toContain(`<loc>${SITE}/en/</loc>`);
    expect(sitemap).not.toContain("404");
    expect(readFileSync(join(DIST, "robots.txt"), "utf8")).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
  });
});
