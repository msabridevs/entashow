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
    if (!res.ok) return setMsg("Failed to save. Please check your email.");

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contrast overlay (fix readability) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 420px at 50% 20%, rgba(0,0,0,0.32), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.58))",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: 14 }}>
          <EntaShowLogo variant="en" />
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
              boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
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
              color: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(0,0,0,0.25)",
              fontWeight: 700,
              backdropFilter: "blur(10px)",
            }}
          >
            Submit script (Independent)
          </a>

          <a
            href="/ar"
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
            العربية
          </a>
        </div>

        {/* Rewards email card */}
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
            Rewards draw 🎁
          </h3>

          <p
            style={{
              opacity: 1,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.90)",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
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
              Save email
            </button>
          </div>

          {msg && <p style={{ marginTop: 10, color: "rgba(255,255,255,0.92)" }}>{msg}</p>}
        </section>
      </div>
    </main>
  );
}
