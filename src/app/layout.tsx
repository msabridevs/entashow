import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Enta Show | أنت Show",
  description:
    "أنت Show — سينما من القرّاء. صوّت كضيف، وشارك في سحب الجوائز، وقدّم أفكارًا مستقلة.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body
        style={{
          margin: 0,
          background: "#0f1115",
          color: "#ffffff",
          fontFamily: "system-ui, Arial",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SiteHeader />

        <main style={{ flex: 1 }}>{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}

