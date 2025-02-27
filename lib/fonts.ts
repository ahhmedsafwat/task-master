import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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

const cabinet = localFont({
  src: [
    { path: "/fonts/CabinetGrotesk-Extrabold.ttf", weight: "800" },
    { path: "/fonts/CabinetGrotesk-bold.ttf", weight: "700" },
    { path: "/fonts/CabinetGrotesk-Medium.ttf", weight: "500" },
    { path: "/fonts/CabinetGrotesk-Regular.ttf", weight: "400" },
  ],
  variable: "--cabinet",
});
export { inter, geistmono, cabinet };
