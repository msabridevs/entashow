import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://entashow.com"),
  title: "أنت Show | Enta Show",
  description:
    "أنت Show — سينما يقودها الجمهور. صوّت كضيف بدون تسجيل، وادخل السحب على الجوائز، وقدّم فكرة مستقلة.",
  alternates: {
    canonical: "https://entashow.com/ar",
    languages: {
      ar: "https://entashow.com/ar",
      en: "https://entashow.com/en",
      "x-default": "https://entashow.com/ar",
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          background: "#0b0b0f",
          color: "#fff",
          fontFamily: "system-ui, Arial",
        }}
      >
        <SiteHeader />

        <div style={{ minHeight: "calc(100vh - 120px)" }}>{children}</div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 16px 28px" }}>
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

