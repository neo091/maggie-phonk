import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import type { LoginInput } from "../schemas/authSchema";
import { LoginSchema } from "../schemas/authSchema";
import { authService } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import { ZodError } from "zod";

export default function Login() {
  const navigate = useNavigate();
  const { login, setError, setLoading, error, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setError(null);

    try {
      const validatedData = LoginSchema.parse(formData);
      setLoading(true);
      const response = await authService.login(validatedData);

      if (response.token && response.user) {
        login(response.user, response.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        (err as ZodError<LoginInput>).issues.forEach((issue) => {
          const path = issue.path[0] as string;
          errors[path] = issue.message;
        });
        setValidationErrors(errors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al intentar loguear");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Adivina Phonk
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Inicia sesión para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                username
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                placeholder="username"
                disabled={isLoading}
                error={validationErrors.username}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Contraseña
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                disabled={isLoading}
                error={validationErrors.password}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            ¿No tienes cuenta?{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
