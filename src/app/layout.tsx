// src/app/layout.tsx
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
        }}
      >
        <SiteHeader />

        <div style={{ minHeight: "calc(100vh - 120px)" }}>{children}</div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "18px 16px 28px",
          }}
        >
          <div
            style={{
              padding: "14px 12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}

