import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default function AboutEN() {
  return (
    <main
      dir="ltr"
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
      }}
    >
      <h1 style={{ marginTop: 0 }}>About</h1>

      <p style={{ lineHeight: 1.9 }}>
        <b>Enta Show</b> is a reader-driven platform for selecting literary works people want to see adapted on the big screen.
        Voting is available in guest mode, and users can enter their email to join a rewards draw (set visits and more).
      </p>

      <h2>How it works</h2>

      <ul style={{ lineHeight: 1.9 }}>
        <li>One featured work appears under each category for voting.</li>
        <li>A device identifier is used to prevent duplicate votes per work per round.</li>
        <li>You can submit an independent idea/script pitch for review; one may be selected per round under “Independent”.</li>
      </ul>

      <p style={{ marginTop: 18 }}>
        <a href="/en" style={{ fontWeight: 700 }}>
          ← Back to home
        </a>
      </p>

      <SiteFooter lang="en" />
    </main>
  );
}
