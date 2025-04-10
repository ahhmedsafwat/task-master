'use server'

import { redirect } from 'next/navigation'
import { createSupabaseClient } from '@/utils/supabase/server'
import {
  emailSchema,
  loginSchema,
  passwordSchema,
  signupSchema,
} from '@/lib/types/zod'
import { AuthResponse } from '@/lib/types/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const AUTH_CALLBACK_URL = `${APP_URL}/auth/callback`
/**
 * Login action - handles user authentication
 */
export async function login(
  prevState: AuthResponse | null,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = loginSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
      return {
        status: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
        message: null,
      }
    }

    const { email, password } = validatedFields.data
    const supabase = await createSupabaseClient()

    // First, check if the user exists
    const { data: userLookup, error: userLookupError } = await supabase
      .from('profiles') // Assumes you have a users table
      .select('email')
      .eq('email', email)
      .single()

    if (userLookupError || !userLookup) {
      return {
        status: 'error',
        message: 'User does not exist. Please sign up first.',
      }
    }

    // Attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        status: 'error',
        message:
          error.message === 'Invalid login credentials'
            ? 'Email or Password is wrong, please try again!'
            : error.message,
      }
    }

    return {
      status: 'success',
      message: 'Logged in successfully!',
      redirectTo: '/dashboard/overview',
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}

/**
 * Sign up action - creates a new user account
 */
export async function signUp(
  prevState: AuthResponse | null,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    // Parse and validate form data
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = signupSchema.safeParse(rawFormData)

    // Return validation errors if any
    if (!validatedFields.success) {
      return {
        status: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
        message: null,
      }
    }

    const { email, password } = validatedFields.data
    const supabase = await createSupabaseClient()

    // Generate username from email
    const username = email.split('@')[0]

    // Create new account
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: AUTH_CALLBACK_URL,
        data: {
          username,
        },
      },
    })

    if (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }

    // Check if user needs to confirm email
    const needsEmailConfirmation = data?.user?.identities?.length === 0

    if (needsEmailConfirmation) {
      return {
        status: 'success',
        message: 'Please check your email to confirm your account.',
      }
    }

    return {
      status: 'success',
      message: 'Account created successfully!',
      redirectTo: '/dashboard/overview',
    }
  } catch (error) {
    console.error('Signup error:', error)
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}

/**
 * Logout action - ends user session
 */
export async function signOut() {
  try {
    const supabase = await createSupabaseClient()
    await supabase.auth.signOut()

    redirect('/auth')
  } catch (error) {
    console.error('Logout error:', error)
    return redirect('/auth?error=Failed to logout properly')
  }
}

/**
 * Request a new Password - sends a request to the supabase server to send the use an email to reset their password
 */
export async function requestPasswordReset(
  pervSatate: AuthResponse | null,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    const rawFormData = Object.fromEntries(formData.entries())

    const validate = emailSchema.safeParse(rawFormData)

    if (!validate.success) {
      return {
        status: 'error',
        errors: validate.error.flatten().fieldErrors,
        message: null,
      }
    }

    const supabase = await createSupabaseClient()
    const { email } = validate.data

    // First, check if the user exists
    const { data: userLookup, error: userLookupError } = await supabase
      .from('profiles') // Assumes you have a users table
      .select('email')
      .eq('email', email)
      .single()

    if (userLookupError || !userLookup) {
      return {
        status: 'error',
        message: 'User does not exist. Please sign up first.',
      }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }

    return {
      status: 'success',
      message: 'Check your email to reset your password',
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function updatePassword(
  prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    // Validate passwords
    const rawFormData = Object.fromEntries(formData.entries())

    const validate = passwordSchema.safeParse(rawFormData)

    if (!validate.success) {
      return {
        status: 'error',
        message: null,
        errors: validate.error.flatten().fieldErrors,
      }
    }

    const { password } = validate.data
    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }

    return {
      status: 'success',
      message: 'Password updated successfully!',
      redirectTo: '/dashboard/overview',
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      message: 'An unexpected error has occured, please try again.',
      status: 'error',
    }
  }
}
