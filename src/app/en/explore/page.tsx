```tsx
"use client";

export const dynamic = "force-dynamic";

export default function EnglishHome() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        fontFamily: "system-ui, Arial",
        background:
          "radial-gradient(1200px 600px at 10% 10%, #ffe7f3, transparent), radial-gradient(900px 500px at 90% 20%, #e6f3ff, transparent), #0b0b0f",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
            marginBottom: 22,
          }}
        >
          <span style={{ opacity: 0.85, fontSize: 13 }}>
            Reader-driven cinema
          </span>
        </div>

        <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: 0 }}>
          <span
            style={{
              fontWeight: 900,
              background: "linear-gradient(90deg, #ff4fd8, #7c5cff, #25d6ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 24px rgba(255,79,216,0.25)",
            }}
          >
            Enta
          </span>{" "}
          <span
            style={{
              fontWeight: 900,
              background: "linear-gradient(90deg, #25d6ff, #00ffb3, #ff4fd8)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 24px rgba(37,214,255,0.25)",
            }}
          >
            Show
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            opacity: 0.9,
            marginTop: 12,
            lineHeight: 1.8,
          }}
        >
          Vote as a guest. No login.
          <br />
          Enter your email to join the rewards draw.
        </p>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
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
            Go to voting
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
      </div>
    </main>
  );
}

// Extra safety: guarantees TypeScript treats this file as a module
export {};
```
