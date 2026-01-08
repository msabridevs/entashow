import React from "react";

type Props = {
  locale: "ar" | "en";
  stats: {
    categories: number;
    daysInRound: number;
    hoursToFinale: number;
  };
};

export default function HomeLanding({ locale, stats }: Props) {
  const isAr = locale === "ar";

  const t = {
    brand: isAr ? "أنت Show" : "Enta Show",
    tagline: isAr
      ? "من القراءة إلى الشاشة — تجربة سينمائية"
      : "From readers to screen — a cinematic experience",
    headline: isAr ? "ابدأ التصويت الآن" : "Start voting now",
    sub: isAr
      ? "صوّت لعمل واحد في كل تصنيف. يمكنك التراجع طالما لم يتغير معرف جهازك."
      : "Vote once per work in each category. Undo works while your device identifier stays the same.",
    primaryCta: isAr ? "اذهب للتصويت" : "Go to voting",
    secondaryCta: isAr ? "استكشف التصنيفات" : "Explore categories",
    howItWorks: isAr ? "كيف يعمل؟" : "How it works",
    stepsTitle: isAr ? "خطوات سريعة" : "Quick steps",
    step1: isAr ? "1) اختر تصنيفاً" : "1) Pick a category",
    step2: isAr ? "2) صوّت لعمل واحد" : "2) Vote for one work",
    step3: isAr ? "3) يمكنك التراجع" : "3) Undo if you change your mind",
    live: isAr ? "الجولة الحالية" : "Current round",
    liveBadge: isAr ? "مباشر" : "LIVE",
    liveDesc: isAr
      ? "هناك عمل واحد مفتوح للتصويت في كل تصنيف. أعلى الأصوات تتأهل للنهائي."
      : "One work is open for voting in each category. Top votes advance to the finale.",
    statsTitle: isAr ? "نظرة سريعة" : "At a glance",
    categories: isAr ? "تصنيف" : "Categories",
    days: isAr ? "أيام للجولة" : "Days in round",
    hours: isAr ? "ساعة للنهائي" : "Hours to finale",
    footer: isAr
      ? "© 2026 Enta Show"
      : "© 2026 Enta Show",
  };

  const links = {
    home: isAr ? "/ar" : "/en",
    explore: isAr ? "/ar/explore" : "/en/explore",
    otherLocale: isAr ? "/en" : "/ar",
    otherLabel: isAr ? "English" : "العربية",
  };

  const shell: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 0%, rgba(99,102,241,0.35), transparent 60%)," +
      "radial-gradient(900px 500px at 90% 10%, rgba(236,72,153,0.25), transparent 55%)," +
      "linear-gradient(180deg, #0b1220 0%, #0a1020 60%, #070b14 100%)",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  };

  const container: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    padding: "18px 16px 40px",
  };

  const pill: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  };

  const nav: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 14,
    marginBottom: 18,
  };

  const navLinks: React.CSSProperties = {
    display: "flex",
    gap: 16,
    alignItems: "center",
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  };

  const navA: React.CSSProperties = {
    color: "inherit",
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 10,
  };

  const langBtn: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 700,
    color: "#0b1220",
    background:
      "linear-gradient(90deg, rgba(236,72,153,1) 0%, rgba(99,102,241,1) 100%)",
  };

  const heroCard: React.CSSProperties = {
    borderRadius: 22,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: 18,
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  };

  const brand: React.CSSProperties = {
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: -0.5,
    margin: "8px 0 6px",
  };

  const subtitle: React.CSSProperties = {
    margin: 0,
    fontSize: 14,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.6,
  };

  const ctas: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 14,
  };

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: "14px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 900,
    textDecoration: "none",
    background:
      "linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(34,211,238,1) 100%)",
    color: "#0b1220",
  };

  const secondaryBtn: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "14px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    cursor: "pointer",
    fontWeight: 800,
    textDecoration: "none",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
    marginTop: 14,
  };

  const stat: React.CSSProperties = {
    borderRadius: 16,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.10)",
    padding: 14,
  };

  const statNum: React.CSSProperties = {
    fontSize: 26,
    fontWeight: 900,
    margin: 0,
  };

  const statLabel: React.CSSProperties = {
    margin: "6px 0 0",
    fontSize: 12,
    color: "rgba(255,255,255,0.78)",
  };

  const sectionCard: React.CSSProperties = {
    marginTop: 14,
    borderRadius: 20,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: 16,
    backdropFilter: "blur(10px)",
  };

  const badge: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    background:
      "linear-gradient(90deg, rgba(236,72,153,1) 0%, rgba(251,191,36,1) 100%)",
    color: "#0b1220",
  };

  return (
    <div style={shell} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
      <div style={container}>
        {/* Top pill */}
        <div style={pill}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: "rgba(34,211,238,1)",
              boxShadow: "0 0 12px rgba(34,211,238,0.8)",
            }}
          />
          <span>{t.tagline}</span>
        </div>

        {/* Nav */}
        <div style={nav}>
          <div style={navLinks}>
            <a href={links.home} style={navA}>
              {isAr ? "الرئيسية" : "Home"}
            </a>
            <a href={links.explore} style={{ ...navA, fontWeight: 800 }}>
              {isAr ? "استكشف / صوّت" : "Explore / Vote"}
            </a>
            <a href="#how" style={navA}>
              {t.howItWorks}
            </a>
          </div>

          <a href={links.otherLocale} style={langBtn}>
            {links.otherLabel}
          </a>
        </div>

        {/* Hero */}
        <div style={heroCard}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 14, opacity: 0.9, fontWeight: 800 }}>
              {t.headline}
            </div>
            <div style={brand}>{t.brand}</div>
            <p style={subtitle}>{t.sub}</p>

            {/* CTAs */}
            <div style={ctas}>
              <a href={links.explore} style={primaryBtn}>
                {t.primaryCta} →
              </a>
              <a href={links.explore} style={secondaryBtn}>
                {t.secondaryCta}
              </a>
            </div>

            {/* Stats */}
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85, fontWeight: 800 }}>
              {t.statsTitle}
            </div>

            <div style={grid}>
              <div style={stat}>
                <p style={statNum}>{stats.categories}</p>
                <p style={statLabel}>{t.categories}</p>
              </div>
              <div style={stat}>
                <p style={statNum}>{stats.daysInRound}</p>
                <p style={statLabel}>{t.days}</p>
              </div>
              <div style={stat}>
                <p style={statNum}>{stats.hoursToFinale}</p>
                <p style={statLabel}>{t.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live section */}
        <div style={sectionCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>{t.live}</h2>
            <span style={badge}>{t.liveBadge}</span>
          </div>

          <p style={{ marginTop: 10, marginBottom: 0, color: "rgba(255,255,255,0.86)", lineHeight: 1.7 }}>
            {t.liveDesc}
          </p>
        </div>

        {/* How it works */}
        <div id="how" style={sectionCard}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{t.stepsTitle}</h2>
          <div style={{ marginTop: 10, lineHeight: 1.9, color: "rgba(255,255,255,0.86)", fontWeight: 700 }}>
            <div>{t.step1}</div>
            <div>{t.step2}</div>
            <div>{t.step3}</div>
          </div>

          <div style={{ marginTop: 14 }}>
            <a href={links.explore} style={primaryBtn}>
              {t.primaryCta} →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 18, textAlign: "center", opacity: 0.75, fontSize: 12 }}>
          {t.footer}
        </div>
      </div>
    </div>
  );
}
