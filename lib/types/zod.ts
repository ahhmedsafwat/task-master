import { z } from "zod";

// Password regex for strong passwords
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Login schema with basic validation
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .trim(),
});

// Signup schema with stronger validation
export const signupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    })
    .trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
