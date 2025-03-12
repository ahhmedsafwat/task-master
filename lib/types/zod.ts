import { z } from 'zod'

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .trim(),
})

// Password validation schema
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/(?=.*?[A-Z])(?=.*?[a-z])/, {
        message:
          'Password must contain at least one uppercase letter and one lowercase',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Login schema with basic validation
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' })
    .trim(),
})

// Signup schema with stronger validation
export const signupSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/(?=.*?[A-Z])(?=.*?[a-z])/, {
      message:
        'Password must contain at least one uppercase letter and one lowercase',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .trim(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
