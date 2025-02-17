import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default async function Home() {
  return (
    <div className="size-56 bg-secondary">
      <div></div>
    </div>
  );
}
