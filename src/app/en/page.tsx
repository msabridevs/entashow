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

export default function EnglishHome() {
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

    if (res.status === 409) return setMsg("This email is already registered.");
    if (!res.ok) return setMsg("Failed. Please check your email.");

    setMsg("Saved for the draw 🎉");
    setEmail("");
  }

  return (
    <main
      dir="ltr"
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
          <EntaShowLogo variant="en" />
        </div>

        <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.9, marginTop: 10 }}>
          Vote as a guest — no login.
          <br />
          Join the random draw for set visits and more rewards.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/en/explore"
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              color: "#0b0b0f",
              background: "linear-gradient(90deg, #ff4fd8, #25d6ff)",
              fontWeight: 800,
            }}
          >
            Start voting
          </a>

          <a
            href="/en/submit"
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
            Submit your script (Independent)
          </a>

          <a
            href="/ar"
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
            العربية
          </a>
        </div>

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
          <h3 style={{ marginTop: 0 }}>Rewards draw 🎁</h3>
          <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
            Enter your email to join the random draw.
            Your email will be stored for this purpose only, and we may contact winners.
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
              Save email
            </button>
          </div>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </section>
      </div>
    </main>
  );
}
