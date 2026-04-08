# Sistema de Autenticación

Este proyecto utiliza un sistema de autenticación global con Zustand, validación con Zod y rutas protegidas.

## Características

- ✅ Estado global de autenticación con Zustand
- ✅ Persistencia de token y usuario en localStorage
- ✅ Validación de formularios con Zod
- ✅ Rutas protegidas
- ✅ Manejo de errores con TypeScript

## Estructura

### Archivos Principales

- `src/store/authStore.ts` - Estado global de autenticación
- `src/schemas/authSchema.ts` - Schemas de validación con Zod
- `src/services/authService.ts` - Servicio para comunicarse con el backend
- `src/pages/Login.tsx` - Página de login
- `src/components/ProtectedRoute.tsx` - Componente para rutas protegidas
- `src/hooks/useLogin.ts` - Hook personalizado para login

## Uso

### Usar el Store de Autenticación

```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <span>Bienvenido, {user?.name}</span>
      ) : (
        <span>No autenticado</span>
      )}
    </div>
  );
}
```

### Usar el Hook de Login

```typescript
import { useLogin } from '@/hooks/useLogin';
import { LoginSchema } from '@/schemas/authSchema';

function LoginForm() {
  const { login, logout, isLoading, error } = useLogin();

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login({ email, password });
      // El usuario fue redirigido automáticamente
    } catch (err) {
      console.error('Error en login:', err);
    }
  };

  return (
    // Tu JSX aquí
  );
}
```

### Crear Rutas Protegidas

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route
  path="/dashboard"
  element={<ProtectedRoute element={<Dashboard />} />}
/>
```

## Configuración del Backend

### Endpoint: `auth.php?action=login`

**Método**: POST

**Parámetros Query**:

- `action=login`
- `email` (string): Email del usuario
- `password` (string): Contraseña del usuario

**Respuesta Esperada**:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Configurar URL del API

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000
```

## Flujo de Autenticación

1. Usuario ingresa credenciales en `/login`
2. Se validan con Zod
3. Se envían al backend (`auth.php?action=login`)
4. Si es exitoso:
   - Se guarda el token y usuario en el store (persistido en localStorage)
   - Se actualiza `isAuthenticated` a `true`
   - Se redirige a `/dashboard`
5. Las rutas protegidas validan `isAuthenticated` antes de renderizar

## Persistencia

Los datos de autenticación se persisten automáticamente en localStorage bajo la clave `auth-storage`. Esto permite que la sesión se mantenga incluso después de refrescar la página.
