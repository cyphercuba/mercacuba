# Auth para MercaCuba con Cloudflare D1

## Recomendación

Crear una base de datos nueva y exclusiva para la tienda, separada del resto de proyectos del grupo.

Nombre sugerido:

- `mercacuba_store`
- o `mercacuba_prod`

## Arquitectura recomendada

- Frontend: React + Vite
- Backend: Cloudflare Worker
- Base de datos: Cloudflare D1
- Sesión: cookie segura httpOnly
- Passwords: hash, nunca texto plano

## Tablas iniciales

### 1. users

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 2. sessions

```sql
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. addresses

```sql
CREATE TABLE IF NOT EXISTS addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  label TEXT,
  recipient_name TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  province TEXT,
  city TEXT,
  municipality TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  is_default INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Endpoints recomendados

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Flujo recomendado

### Registro
1. usuario llena nombre, apellido, email, teléfono y contraseña
2. backend valida datos
3. genera hash de contraseña
4. guarda usuario en `users`
5. crea sesión en `sessions`
6. responde con cookie segura

### Login
1. usuario pone email y contraseña
2. backend busca usuario
3. compara contraseña con hash
4. crea sesión
5. devuelve cookie segura

### Sesión
- usar cookie `httpOnly`
- `Secure`
- `SameSite=Lax`
- duración sugerida: 7 días

## Qué hacer ahora

### Paso 1
Crear D1 nueva en Cloudflare.

### Paso 2
Conectarla al proyecto/worker.

### Paso 3
Crear estas tablas.

### Paso 4
Montar worker con auth real.

## Recomendación técnica

Como el proyecto actual no tiene worker ni wrangler configurado, lo ideal es añadir:

- `wrangler.toml`
- carpeta de worker o functions
- conexión a D1
- rutas auth mínimas

## Estado actual de la app

- Hay UI de login/registro en `src/pages/Login.jsx`
- Hay config vieja/demo de Firebase en `src/config/firebase.js`
- No hay lógica real de autenticación conectada a Cloudflare todavía

## Siguiente fase sugerida

Implementar:

1. configuración de Cloudflare Worker
2. esquema SQL inicial
3. API auth real
4. conexión del formulario visual de login/registro al backend
