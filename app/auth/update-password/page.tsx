"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdatePasswordComponet } from "@/components/auth/update-password-component";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "PASSWORD_RECOVERY") {
        router.replace("/auth");
      }
    });

    return () => subscription?.unsubscribe();
  }, [router, supabase]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Your Password</CardTitle>
        <CardDescription>
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePasswordComponet />
      </CardContent>
    </Card>
  );
}
