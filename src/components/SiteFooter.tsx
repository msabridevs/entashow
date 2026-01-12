export default function SiteFooter({ lang }: { lang: "ar" | "en" }) {
  const isAR = lang === "ar";

  const links = isAR
    ? [
        { href: "/ar/about", label: "من نحن" },
        { href: "/ar/contact", label: "تواصل معنا" },
        { href: "/privacy", label: "سياسة الخصوصية" },
        { href: "/terms", label: "الشروط والأحكام" },
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
        marginTop: 40,
        paddingTop: 16,
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, Arial",
        color: "#111",
      }}
    >
      {links.map((l) => (
        <a key={l.href} href={l.href} style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>
          {l.label}
        </a>
      ))}
      <span style={{ opacity: 0.6 }}>© {new Date().getFullYear()} Enta Show</span>
    </footer>
  );
}