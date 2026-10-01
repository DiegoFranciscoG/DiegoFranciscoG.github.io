# Política de seguridad

## Reportar una vulnerabilidad
No abras un issue público. Escríbeme por GitHub (perfil DiegoFranciscoG) o por LinkedIn con los pasos para reproducir el problema. Respondo en un máximo de 7 días.

## Prácticas aplicadas en este sitio
- Sitio 100 % estático: sin backend, formularios, cookies ni rastreadores.
- Content Security Policy por página (`default-src 'self'`, `object-src 'none'`, `form-action 'none'`) con hashes SHA-256 de cada script y estilo en línea, generada por Astro.
- Ningún recurso de terceros: fuentes del sistema, imágenes y scripts servidos desde el mismo dominio.
- Fotos sin metadatos EXIF ni de ubicación; sin correo ni teléfono publicados (contacto por LinkedIn).
- Workflow con `permissions` mínimos y acciones fijadas por SHA; gitleaks en cada push y pull request; Dependabot para npm y Actions.
