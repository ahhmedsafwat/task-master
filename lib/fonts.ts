import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistmono = Geist_Mono({
  subsets: ["latin"],
  variable: "--geist-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export { inter, geistmono };
