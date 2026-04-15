# Cómo activar auth D1 en MercaCuba

## 1. Base ya conectada
Ya tienes en Cloudflare Pages el binding:

- `mercacuba_store` -> `mercacuba_store`

## 2. Crear tablas
Entra a la base D1 `mercacuba_store` y ejecuta el contenido de:

- `database/schema.sql`

## 3. Endpoints creados
Ya quedaron preparados en Pages Functions:

- `functions/api/auth/register.js`
- `functions/api/auth/login.js`
- `functions/api/auth/me.js`
- `functions/api/auth/logout.js`

## 4. Frontend conectado
La pantalla visual de login/registro ya fue conectada a esos endpoints:

- `src/pages/Login.jsx`
- `src/lib/auth.js`

## 5. Cómo probar localmente
Opción rápida:

```bash
cd "F:\Group Gain\mercacuba"
npm run dev
```

Nota: para que las Pages Functions y D1 funcionen de verdad en local, lo ideal es usar desarrollo con Cloudflare Pages/Workers más adelante. El `vite dev` normal sirve para seguir viendo UI, pero no siempre replica bindings D1.

## 6. Qué hace ahora

### Registro
- crea usuario en `users`
- crea sesión en `sessions`
- devuelve cookie de sesión

### Login
- valida email y password
- crea sesión
- devuelve cookie

### Me
- revisa cookie
- devuelve usuario actual

### Logout
- elimina sesión y limpia cookie

## 7. Siguiente mejora recomendada

Antes de producción real, conviene mejorar:

- hash de contraseña más fuerte que SHA-256 simple, idealmente usando una estrategia endurecida
- validaciones de password
- recuperación de contraseña
- email verification
- protección anti abuso/rate limit
- manejo global de usuario autenticado en React
