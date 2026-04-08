import type { LoginInput } from "../schemas/authSchema";
import { AuthResponseSchema } from "../schemas/authSchema";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

export const authService = {
  async login(credentials: LoginInput) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const validatedData = AuthResponseSchema.parse(data);

      if (!validatedData.success) {
        throw new Error(validatedData.message || "Error en el login");
      }

      return validatedData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido al intentar loguear");
    }
  },

  logout() {
    // Aquí puedes hacer una llamada al backend para invalidar la sesión si lo necesitas
    return Promise.resolve();
  },

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  },
};
