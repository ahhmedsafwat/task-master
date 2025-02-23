import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { geistmono, inter } from "@/lib/fonts";
import Provider from "@/components/context/provider";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "task-master",
    template: "%s | task-master",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistmono.variable} antialiased`}
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
