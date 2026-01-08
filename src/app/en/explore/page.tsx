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
@@ -92,26 +91,25 @@ export default function EnglishHome() {
            marginBottom: 18,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          Open voting
        </div>

        <h1 style={{ fontSize: 42, margin: "0 0 12px" }}>EntaShow Guest Voting</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, marginBottom: 28 }}>
          Vote once for each work and see the live totals update instantly.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href="/ar/explore"
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              color: "#0b0b0f",
              background: "#fff",
              fontWeight: 700,
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
export {};