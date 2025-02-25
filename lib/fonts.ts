import { Inter, Geist_Mono, Nunito } from "next/font/google";

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

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--nunito",
  display: "swap",
  weight: ["400", "500", "1000"],
});

export { inter, geistmono, nunito };
