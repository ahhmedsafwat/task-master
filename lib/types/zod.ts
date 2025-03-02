import { z } from "zod";

// Define schemas for better type safety and validation
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
