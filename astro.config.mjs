// @ts-check
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export const SITE = "https://diegofranciscog.github.io";

// El script que aplica el tema guardado va en línea (antes de pintar) y su hash se agrega a la CSP.
const themeInit = readFileSync(new URL("./src/scripts/theme-init.js", import.meta.url), "utf8");
/** @type {`sha256-${string}`} */
const themeInitHash = `sha256-${createHash("sha256").update(themeInit).digest("base64")}`;

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-EC", en: "en" },
      },
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        hashes: [themeInitHash],
      },
    },
  },
});
