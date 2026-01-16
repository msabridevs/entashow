// src/app/privacy/page.tsx
export const dynamic = "force-dynamic";

export default function PrivacyEN() {
  return (
    <main
      dir="ltr"
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
        borderRadius: 12,
      }}
    >
      <h1>Privacy Policy</h1>
      <p style={{ lineHeight: 1.9 }}>
        We may store emails (optional) for the rewards draw, use a device identifier for vote deduplication,
        and store submitted ideas/pitches for review. We do not sell personal data.
      </p>
      <p style={{ lineHeight: 1.9 }}>
        Emails may be used to contact winners only or for reward/update notifications.
      </p>
    </main>
  );
}

