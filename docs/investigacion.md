# Investigación y fuentes

| # | Fuente (oficial / confiable) | URL | Consultada | Qué se tomó de aquí |
|---|---|---|---|---|
| 1 | W3C: WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | 2026-09-30 | Contraste mínimo 4.5:1 (1.4.3), foco visible (2.4.7), foco no oculto (2.4.11), tamaño de objetivo de al menos 24×24 px (2.5.8), idioma de la página y de las partes (3.1.1 y 3.1.2). |
| 2 | web.dev: Web Vitals | https://web.dev/articles/vitals | 2026-10-01 | Umbrales «buenos»: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, medidos en el percentil 75. |
| 3 | Chrome for Developers: Lighthouse | https://developer.chrome.com/docs/lighthouse/overview | 2026-10-01 | Categorías de rendimiento, accesibilidad, buenas prácticas y SEO; Lighthouse CI para fallar el build si bajan. |
| 4 | Astro Docs: guía de actualización a v7 | https://docs.astro.build/en/guides/upgrade-to/v7/ | 2026-09-30 | El compilador nuevo exige cerrar todas las etiquetas y aplica reglas de espacios estilo JSX. |
| 5 | Astro Docs: referencia de configuración (`security.csp`) | https://docs.astro.build/en/reference/configuration-reference/ | 2026-09-30 | Astro genera una `<meta http-equiv="content-security-policy">` con hashes de scripts y estilos; los scripts externos no se cubren solos. |
| 6 | Astro Docs: despliegue en GitHub Pages | https://docs.astro.build/en/guides/deploy/github/ | 2026-09-30 | `site` con el dominio de usuario; sin `base` para el repo `<usuario>.github.io`; permisos `pages: write` e `id-token: write`. |
| 7 | GitHub Docs: fuente de publicación de Pages | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | 2026-10-01 | Publicar con un workflow propio: `upload-pages-artifact` + `deploy-pages`, sin desplegar en pull requests. La documentación no ofrece cabeceras HTTP propias, por eso la CSP va en `<meta>`. |
| 8 | The Open Graph protocol | https://ogp.me/ | 2026-09-30 | `og:title`, `og:description`, `og:image` (1200×630), `og:locale` y `og:type=profile` para la vista previa en LinkedIn. |
| 9 | Schema.org: Person | https://schema.org/Person | 2026-09-30 | Datos estructurados `Person` con `jobTitle`, `sameAs`, `address` y `alumniOf`. |
| 10 | Google Search Central: sitios multilingües | https://developers.google.com/search/docs/specialty/international/localized-versions | 2026-09-30 | `hreflang` recíproco entre `/` y `/en/` más `x-default`. |
| 11 | npm (registro oficial) | https://www.npmjs.com/ | 2026-09-30 | Versiones estables: astro 7.3.5, @astrojs/sitemap 3.7.4, sharp 0.35.5, vitest 5.0.3, @astrojs/check 0.9.10, linkedom 0.18.13, @lhci/cli 0.15.1. TypeScript 6.0.3 porque @astrojs/check aún no acepta TypeScript 7. |
| 12 | Releases oficiales de GitHub Actions | https://github.com/actions | 2026-09-30 | checkout v7.0.1, setup-node v7.0.0, upload-artifact v7.0.1, upload-pages-artifact v5.0.0 y deploy-pages v5.0.1, fijadas por SHA. |
| 13 | RENAFIPSE | https://renafipse.ec/ | 2026-09-30 | Nombre oficial de la institución de las prácticas: Red Nacional de Finanzas Populares y Solidarias del Ecuador. |

## Supuestos (no verificados)
- **Qué revisa un reclutador técnico:** no hay una fuente oficial. Se asumió, por práctica común en procesos de selección, que lo primero que se mira es el rol, los proyectos con captura y enlace al código, y una forma de contacto visible; por eso el orden del sitio es encabezado → proyectos → experiencia → habilidades → certificaciones → contacto.
