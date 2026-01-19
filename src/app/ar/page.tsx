"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import EntaShowLogo from "@/components/EntaShowLogo";

function getFP(): string {
  const key = "enta_show_fp";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

export default function ArabicHome() {
  const [fp, setFp] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setFp(getFP());
  }, []);

  async function saveEmail() {
    setMsg("");
    const res = await fetch("/api/reward-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fingerprint: fp }),
    });

    if (res.status === 409) return setMsg("هذا البريد مسجّل بالفعل.");
    if (!res.ok) return setMsg("تعذر الحفظ. تأكد من البريد.");

    setMsg("تم حفظ بريدك للسحب 🎉");
    setEmail("");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        background:
          "radial-gradient(1200px 600px at 10% 10%, #ffe7f3, transparent), radial-gradient(900px 500px at 90% 20%, #e6f3ff, transparent), #0f1115",
        color: "#fff",
        fontFamily: "system-ui, Arial",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 420px at 50% 20%, rgba(0,0,0,0.30), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative" }}>
        <nav
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginBottom: 14,
            opacity: 0.95,
          }}
        >
          <a href="/en" style={topLink}>
            English
          </a>
        </nav>

        <div style={{ marginBottom: 14 }}>
          <EntaShowLogo variant="ar" />
        </div>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.9,
            marginTop: 10,
            color: "rgba(255,255,255,0.94)",
            textShadow: "0 2px 12px rgba(0,0,0,0.55)",
          }}
        >
          صوّت كضيف — بدون تسجيل.
          <br />
          واجمع فرصًا لحضور التصوير وجوائز أخرى عبر السحب العشوائي.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/ar/explore" style={primaryBtn}>
            ابدأ التصويت
          </a>
          <a href="/ar/submit" style={ghostBtn}>
            قدّم فكرتك (مستقل)
          </a>
        </div>

        {/* ✅ KPI / Indicators */}
        <div style={kpiGrid}>
          <div style={kpiCard}>
            <div style={kpiNumber}>7</div>
            <div style={kpiLabel}>أيام للجولة</div>
          </div>

          <div style={kpiCard}>
            <div style={kpiNumber}>17</div>
            <div style={kpiLabel}>تصنيف</div>
          </div>

          <div style={kpiCardWide}>
            <div style={kpiNumber}>72</div>
            <div style={kpiLabel}>ساعة للنهائي</div>
          </div>
        </div>

        <section style={card}>
          <h3 style={{ marginTop: 0, color: "rgba(255,255,255,0.95)" }}>
            سحب الجوائز 🎁
          </h3>

          <p style={{ lineHeight: 1.7, color: "rgba(255,255,255,0.90)" }}>
            أدخل بريدك الإلكتروني للمشاركة في السحب العشوائي.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={input}
            />
            <button onClick={saveEmail} style={primaryBtn}>
              حفظ البريد
            </button>
          </div>

          {msg && <p style={{ marginTop: 10, color: "rgba(255,255,255,0.92)" }}>{msg}</p>}
        </section>

        <div style={{ marginTop: 26 }} />
      </div>
    </main>
  );
}

const topLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
  fontWeight: 800,
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(0,0,0,0.18)",
  backdropFilter: "blur(10px)",
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  color: "#0b0b0f",
  background: "linear-gradient(90deg, #ff4fd8, #25d6ff)",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
};

const ghostBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  color: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(255,255,255,0.28)",
  background: "rgba(0,0,0,0.25)",
  fontWeight: 700,
  backdropFilter: "blur(10px)",
};

const card: React.CSSProperties = {
  marginTop: 34,
  padding: 18,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
};

const input: React.CSSProperties = {
  minWidth: 260,
  padding: 10,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.10)",
  color: "#fff",
  outline: "none",
};

/* ✅ KPI styles */
const kpiGrid: React.CSSProperties = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 14,
};

const kpiCard: React.CSSProperties = {
  borderRadius: 16,
  padding: "16px 14px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
  textAlign: "center",
};

const kpiCardWide: React.CSSProperties = {
  ...kpiCard,
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
};

const kpiNumber: React.CSSProperties = {
  fontSize: 34,
  fontWeight: 900,
  lineHeight: 1,
};

const kpiLabel: React.CSSProperties = {
  marginTop: 8,
  fontSize: 14,
  opacity: 0.85,
  fontWeight: 700,
};

