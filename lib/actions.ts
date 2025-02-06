"use server";
import { createSupabaseClient } from "@/utils/supabase/server";

export const login1 = async () => {
  try {
    const supabase = await createSupabaseClient();
    const { data: signupData, error: signupError } =
      await supabase.auth.signInWithPassword({
        email: `example@example.com`,
        password: "example",
      });

    if (signupError) throw signupError;
    console.log("Signup successful:", signupData);

    // Test profile creation
    if (!signupData.user) throw new Error("User is null");

    return signupData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Auth test failed:", error.message);
    } else {
      console.error("Auth test failed:", String(error));
    }
  }
};

export const login2 = async () => {
  try {
    const supabase = await createSupabaseClient();
    const { data: signupData, error: signupError } =
      await supabase.auth.signInWithPassword({
        email: `example@example.com`,
        password: "example",
      });

    if (signupError) throw signupError;
    console.log("Signup successful:", signupData);

    // Test profile creation
    if (!signupData.user) throw new Error("User is null");

    return signupData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Auth test failed:", error.message);
    } else {
      console.error("Auth test failed:", String(error));
    }
  }
};
