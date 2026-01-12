import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default function Terms() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
      }}
    >
      <h1>Terms</h1>

      <p>
        By using Enta Show you agree not to abuse voting mechanisms and not to submit unlawful content.
        Submitted ideas may be reviewed and selected for voting.
      </p>

      <SiteFooter lang="en" />
    </main>
  );
}
