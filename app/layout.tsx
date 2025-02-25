import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { geistmono, inter, nunito } from "@/lib/fonts";
import Provider from "@/components/context/provider";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Task Master",
    template: "%s | Task Master",
  },
  description:
    "Streamline your workflow with Task Master - the intuitive task management application that helps you organize, prioritize, and track your projects efficiently.",
  keywords: ["task management", "productivity", "project tracking", "todo app"],
  authors: [{ name: "Ahmed Safwat" }],
  creator: "Task Master",
  publisher: "Task Master",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://task-master.app",
    title: "Task Master - Efficient Task Management",
    description:
      "Streamline your workflow with Task Master - the intuitive task management application that helps you organize, prioritize, and track your projects efficiently.",
    siteName: "Task Master",
    images: [
      {
        url: "/images/gradiant-bg1.webp",
        width: 1200,
        height: 630,
        alt: "Task Master Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Master - Efficient Task Management",
    description:
      "Streamline your workflow with Task Master - the intuitive task management application.",
    images: ["/images/gradiant-bg1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistmono.variable} ${nunito.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
