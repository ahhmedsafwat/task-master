import Hero from "@/components/landing/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskMaster",
};
export default async function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
