import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://entashow.com"),
  title: {
    default: "Enta Show | أنت Show",
    template: "%s | Enta Show",
  },
  description:
    "Enta Show (أنت Show) — reader-driven cinema. Vote as a guest, join the rewards draw, and submit independent ideas.",
  alternates: {
    canonical: "https://entashow.com",
    languages: {
      ar: "https://entashow.com/ar",
      en: "https://entashow.com/en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://entashow.com",
    siteName: "Enta Show",
    title: "Enta Show | أنت Show",
    description:
      "Reader-driven cinema: vote as a guest, join rewards draw, and submit independent ideas.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Enta Show" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enta Show | أنت Show",
    description:
      "Reader-driven cinema: vote as a guest, join rewards draw, and submit independent ideas.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enta Show",
    alternateName: "أنت Show",
    url: "https://entashow.com",
    logo: "https://entashow.com/logo.png",
  };

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Enta Show",
    url: "https://entashow.com",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        style={{
          margin: 0,
          background: "#0b0b0f",
          color: "#fff",
          fontFamily: "system-ui, Arial",
        }}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

