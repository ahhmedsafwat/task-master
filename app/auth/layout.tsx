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
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </section>
  );
}
