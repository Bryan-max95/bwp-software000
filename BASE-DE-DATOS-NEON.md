# Base de datos PostgreSQL de BWP Software

El archivo `database/001_initial.sql` crea la estructura completa para contenido, imágenes, solicitudes, usuarios administrativos e invitaciones. El esquema por sí solo no inserta el contenido de la web.

## Ejecución completa

1. Mantenga `DATABASE_URL` y las credenciales SMTP únicamente en `.env.local`. Nunca use el prefijo `NEXT_PUBLIC_` para secretos.
2. Desde la carpeta del proyecto ejecute:

```powershell
pnpm install
pnpm run db:setup
```

`db:setup` ejecuta la migración y carga en PostgreSQL el contenido actual de:

- Servicios.
- Soluciones.
- Productos.
- Industrias.
- Casos recientes de Roatán Self Storage, Zarivas y Minisúper Palao.
- BWP Fiscal Track, BWP Water Operations, BWP Retail POS y BWP Business ERP/CRM.
- Preguntas frecuentes.
- Información institucional.
- Configuración de fotografías de socios.
- Imágenes de los casos convertidas a datos persistentes dentro de PostgreSQL.
- Usuario administrativo raíz configurado en `.env.local`.

El comando es idempotente: puede repetirse sin duplicar tablas ni usuarios. Al repetirlo, restaura los documentos CMS iniciales al contenido incluido en el código, por lo que no debe ejecutarse sobre producción después de comenzar a editar contenido desde `/host99` salvo que se desee restablecerlo.

## Invitaciones administrativas

El usuario ROOT ingresa en `/host99`, abre `Usuarios`, indica correo, nombre, rol y una contraseña temporal. El sistema:

1. Crea al usuario con contraseña cifrada mediante `scrypt`.
2. Envía por Gmail SMTP un botón de activación válido durante 48 horas.
3. Solicita correo, contraseña temporal y una contraseña personal nueva.
4. Activa la cuenta y permite ingresar a `/host99`.

Las contraseñas nunca se almacenan en texto plano. Los tokens se guardan como hashes y la sesión se mantiene en una cookie `HttpOnly`.

## Archivos principales

- `database/001_initial.sql`: esquema PostgreSQL.
- `scripts/setup-database.ts`: migración y carga del contenido existente.
- `app/api/cms/[key]/route.ts`: lectura pública y escritura administrativa del CMS.
- `app/api/admin/users/route.ts`: usuarios e invitaciones.
- `app/api/admin/accept-invite/route.ts`: activación y cambio de contraseña.
- `app/api/contact/route.ts`: solicitudes y notificación SMTP.

## Seguridad

Las credenciales compartidas previamente deben rotarse antes de publicar. Use una contraseña administrativa distinta y genere una clave de cifrado aleatoria de al menos 32 caracteres.
