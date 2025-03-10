import { DashboardNavigation } from "@/components/dashboard/dashbaord-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard to mangage your tasks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-primary flex min-h-screen">
      <DashboardNavigation />
      <div className="bg-background m-2 flex-1 rounded-md">{children}</div>
    </section>
  );
}
