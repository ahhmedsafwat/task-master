import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard to mangage your tasks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
