import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export default function Privacy() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
      }}
    >
      <h1>Privacy Policy</h1>

      <p>
        We may store emails entered for the rewards draw, device identifiers for vote deduplication,
        and submitted script ideas for review. We do not sell personal data.
      </p>

      <SiteFooter lang="en" />
    </main>
  );
}
