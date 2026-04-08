import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "El email es requerido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
  message: z.string().optional(),
  user: z
    .object({
      id: z.number(),
      username: z.string(),
      name: z.string().optional(),
    })
    .optional(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
