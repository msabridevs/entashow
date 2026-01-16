import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أنت Show",
  description: "أنت Show — سينما من القرّاء. صوّت كضيف، وشارك في سحب الجوائز، وقدّم فكرة مستقلة.",
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

