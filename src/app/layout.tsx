import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0b0b0f",
          color: "#fff",
          fontFamily: "system-ui, Arial",
        }}
      >
        {/* GLOBAL HEADER (PNG LOGO ONLY) */}
        <SiteHeader />

        {/* PAGE CONTENT */}
        {children}
      </body>
    </html>
  );
}

