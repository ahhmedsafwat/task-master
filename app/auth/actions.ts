"use server";

import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "@/lib/types/zod";
import { AuthResponse } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const AUTH_CALLBACK_URL = `${APP_URL}/auth/callback`;
/**
 * Login action - handles user authentication
 */
export async function login(
  prevState: AuthResponse | null,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        status: "error",
        errors: validatedFields.error.flatten().fieldErrors,
        message: null,
      };
    }

    const { email, password } = validatedFields.data;
    const supabase = await createSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "success",
      message: "Logged in successfully!",
      redirectTo: "/dashboard/overview",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
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
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = signupSchema.safeParse(rawFormData);

    // Return validation errors if any
    if (!validatedFields.success) {
      return {
        status: "error",
        errors: validatedFields.error.flatten().fieldErrors,
        message: null,
      };
    }

    const { email, password } = validatedFields.data;
    const supabase = await createSupabaseClient();

    // Generate username from email
    const username = email.split("@")[0];

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
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    // Check if user needs to confirm email
    const needsEmailConfirmation = data?.user?.identities?.length === 0;

    if (needsEmailConfirmation) {
      return {
        status: "success",
        message: "Please check your email to confirm your account.",
      };
    }

    return {
      status: "success",
      message: "Account created successfully!",
      redirectTo: "/dashboard/overview",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Logout action - ends user session
 */
export async function signOut() {
  try {
    const supabase = await createSupabaseClient();
    await supabase.auth.signOut();

    revalidatePath("/dashboard")
    redirect("/auth");

  } catch (error) {
    console.error("Logout error:", error);
    return redirect("/auth?error=Failed to logout properly");
  }
}

/**
 * Get user session data
 * Can be used to check if user is authenticated
 */
export async function getuser() {
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}
