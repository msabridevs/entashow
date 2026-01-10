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
          "radial-gradient(1200px 600px at 10% 10%, #ffe7f3, transparent), radial-gradient(900px 500px at 90% 20%, #e6f3ff, transparent), #0b0b0f",
        color: "#fff",
        fontFamily: "system-ui, Arial",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <EntaShowLogo variant="ar" />
        </div>

        <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.9, marginTop: 10 }}>
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
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.06)",
              fontWeight: 650,
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
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.06)",
              fontWeight: 650,
            }}
          >
            English
          </a>
        </div>

        {/* Rewards email */}
        <section
          style={{
            marginTop: 34,
            padding: 18,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>سحب الجوائز 🎁</h3>
          <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
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
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.35)",
                color: "#fff",
              }}
            />
            <button
              onClick={saveEmail}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                background: "linear-gradient(90deg, #ff4fd8, #25d6ff)",
                color: "#0b0b0f",
              }}
            >
              حفظ البريد
            </button>
          </div>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </section>
      </div>
    </main>
  );
}
