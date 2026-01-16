// src/components/SiteFooter.tsx
"use client";

import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  const isAR = pathname.startsWith("/ar");

  const links = isAR
    ? [
        { href: "/ar/about", label: "من نحن" },
        { href: "/ar/contact", label: "تواصل معنا" },
        { href: "/ar/privacy", label: "سياسة الخصوصية" },
        { href: "/ar/terms", label: "الشروط" },
      ]
    : [
        { href: "/en/about", label: "About" },
        { href: "/en/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ];

  return (
    <footer
      dir={isAR ? "rtl" : "ltr"}
      style={{
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.92)",
        fontWeight: 800,
      }}
    >
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          style={{
            textDecoration: "none",
            color: "rgba(255,255,255,0.92)",
            padding: "6px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {l.label}
        </a>
      ))}

      <span style={{ opacity: 0.7 }}>© {new Date().getFullYear()} Enta Show</span>
    </footer>
  );
}

