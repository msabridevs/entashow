// 1) Fix readability (Arabic home page) — increase contrast
// Replace your src/app/ar/page.tsx with this (same layout, only stronger contrast + subtle shadow/backdrop):

"use client";

export const dynamic = "force-dynamic";
import SiteFooter from "@/components/SiteFooter";
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

  useEffect(() => setFp(getFP()), []);

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
          "radial-gradient(1200px 600px at 10% 10%, #ffe7f3, transparent), radial-gradient(900px 500px at 90% 20%, #e6f3ff, transparent), #0b0b0f",
        color: "#fff",
        fontFamily: "system-ui, Arial",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contrast overlay */}
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
        <div style={{ marginBottom: 14 }}>
          <EntaShowLogo variant="ar" />
        </div>

        <p
          style={{
            fontSize: 20,
            opacity: 1,
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
          <a
            href="/ar/explore"
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              color: "#0b0b0f",
              background: "linear-gradient(90deg, #ff4fd8, #25d6ff)",
              fontWeight: 800,
              boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
            }}
          >
            ابدأ التصويت
          </a>

          <a
            href="/ar/submit"
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              color: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(0,0,0,0.25)",
              fontWeight: 700,
              backdropFilter: "blur(10px)",
            }}
          >
            قدّم نصك (مستقل)
          </a>

          <a
            href="/en"
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              color: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(0,0,0,0.25)",
              fontWeight: 700,
              backdropFilter: "blur(10px)",
            }}
          >
            English
          </a>
        </div>

        <section
          style={{
            marginTop: 34,
            padding: 18,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            سحب الجوائز 🎁
          </h3>

          <p
            style={{
              opacity: 1,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.90)",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            أدخل بريدك الإلكتروني للمشاركة في السحب العشوائي.
            سيتم حفظ بريدك لهذا الغرض فقط، وقد نتواصل مع الفائزين.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={{
                minWidth: 260,
                padding: 10,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.10)",
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              onClick={saveEmail}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: 900,
                background: "linear-gradient(90deg, #ff4fd8, #25d6ff)",
                color: "#0b0b0f",
                boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
              }}
            >
              حفظ البريد
            </button>
          </div>

          {msg && <p style={{ marginTop: 10, color: "rgba(255,255,255,0.92)" }}>{msg}</p>}
        </section>
      </div>
    </main>
  );
}

