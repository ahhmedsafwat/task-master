// app/auth/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in to your Task Master account or create a new one.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
