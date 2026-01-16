import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enta Show",
  description: "Enta Show — reader-driven cinema. Vote as a guest, join rewards draw, and submit an independent idea.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

