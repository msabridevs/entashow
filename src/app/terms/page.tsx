// src/app/terms/page.tsx
export const dynamic = "force-dynamic";

export default function TermsEN() {
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
      <h1>Terms</h1>

      <h2>Voting</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>Only one vote per title per round.</li>
        <li>You can’t vote twice for the same title in the same round.</li>
        <li>Undo works as long as the device identifier remains the same.</li>
        <li>Clearing browser data or changing devices may break undo.</li>
      </ul>

      <h2>Submissions</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>Submitted ideas/pitches are stored for review and may be selected for the Independent slot.</li>
        <li>No unlawful or abusive content.</li>
      </ul>
    </main>
  );
}

