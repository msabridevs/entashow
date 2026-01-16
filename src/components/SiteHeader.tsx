import LogoPng from "@/components/LogoPng";

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#0b0b0f",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT: PNG LOGO */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <LogoPng />
        </a>
      </div>
    </header>
  );
}

