// src/components/SiteHeader.tsx
import LogoPng from "@/components/LogoPng";

export default function SiteHeader({ lang }: { lang: "ar" | "en" }) {
  const isAR = lang === "ar";

  return (
    <header
      dir={isAR ? "rtl" : "ltr"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 0",
      }}
    >
      <LogoPng alt={isAR ? "أنت Show" : "Enta Show"} height={52} />

      <nav style={{ display: "flex", gap: 12 }}>
        <a href={isAR ? "/ar" : "/en"}>Home</a>
        <a href={isAR ? "/ar/explore" : "/en/explore"}>Vote</a>
        <a href={isAR ? "/ar/submit" : "/en/submit"}>Submit</a>
      </nav>
    </header>
  );
}

