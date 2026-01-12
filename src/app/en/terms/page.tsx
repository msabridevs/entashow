import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default function TermsEN() {
  return (
    <main dir="ltr" style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>Terms & Conditions</h1>

      <p style={{ lineHeight: 1.9 }}>
        By using <b>Enta Show</b>, you agree to the following terms:
      </p>

      <h2>Voting</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>Only one vote is allowed per literary work per round.</li>
        <li>You cannot vote more than once for the same work during the same round.</li>
        <li>Undoing a vote is available only during the same session on the same device.</li>
        <li>If browser data is cleared or the device changes, undo may no longer be possible.</li>
      </ul>

      <h2>Guest Voting</h2>
      <p style={{ lineHeight: 1.9 }}>
        Voting is available without account creation. A device identifier is used to prevent abuse and duplicate voting.
      </p>

      <h2>User Submissions</h2>
      <p style={{ lineHeight: 1.9 }}>
        Submitted ideas or scripts are stored for review and may be selected for voting or development.
      </p>

      <p style={{ marginTop: 24 }}>
        <a href="/en" style={{ fontWeight: 700 }}>← Back to home</a>
      </p>

      <SiteFooter lang="en" />
    </main>
  );
}
