import { Inter, Geist, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistsans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistmono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export { inter, geistsans, geistmono };
