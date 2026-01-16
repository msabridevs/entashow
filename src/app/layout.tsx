import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Enta Show | أنت Show",
  description: "Enta Show — reader-driven cinema. Vote as a guest, join rewards draw, and submit an independent idea.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0b0f", color: "#fff", fontFamily: "system-ui, Arial" }}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

