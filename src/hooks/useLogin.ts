import { useAuthStore } from "../store/authStore";
import type { LoginInput } from "../schemas/authSchema";
import { authService } from "../services/authService";
import { ZodError } from "zod";

interface UseLoginReturn {
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginReturn {
  const {
    login,
    logout: storeLogout,
    setError,
    setLoading,
    isLoading,
    error,
  } = useAuthStore();

  const handleLogin = async (credentials: LoginInput) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.login(credentials);

      if (response.token && response.user) {
        login(response.user, response.token);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        setError("Error de validación en los datos");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    storeLogout();
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    isLoading,
    error,
  };
}
