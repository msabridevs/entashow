export default function EntaShowLogo({ variant }: { variant: "ar" | "en" }) {
  return (
    <span style={{ display: "inline-flex", gap: 10, alignItems: "baseline" }}>
      <span
        style={{
          fontWeight: 900,
          fontSize: 34,
          background: "linear-gradient(90deg,#ffcc66,#ff4fd8,#7c5cff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(255,79,216,0.18)",
          letterSpacing: "-0.02em",
        }}
      >
        {variant === "ar" ? "أنت" : "Enta"}
      </span>

      <span
        style={{
          fontWeight: 900,
          fontSize: 34,
          background: "linear-gradient(90deg,#25d6ff,#00ffb3,#ff4fd8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(37,214,255,0.18)",
          letterSpacing: "-0.02em",
        }}
      >
        Show
      </span>
    </span>
  );
}
