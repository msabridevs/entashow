import React from "react";

/**
 * NOTE: For fonts in Next.js 16, it is better to use next/font in your layout.tsx.
 * If you must use a stylesheet, add it to your Root Layout metadata.
 */

export default function EnglishHome() {
  const currentYear = 2026; // Static for 2026 to prevent hydration mismatch

  return (
    <main className="es-page" lang="en">
      {/* 
          Vercel/Next.js 16 Tip: 
          Instead of <Head>, put your <link> tags in the Root Layout file (layout.tsx).
      */}

      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="es-bg" aria-hidden="true">
        <div className="es-aurora a1" />
        <div className="es-aurora a2" />
        <div className="es-aurora a3" />
        <div className="es-vignette" />
        <div className="es-grain" />
      </div>

      <div className="es-wrap">
        <header className="es-top">
          <div className="es-pill">
            <span className="es-dot" />
            <span>From readers to screen — a cinematic experience</span>
          </div>

          <nav className="es-nav" aria-label="Main">
            <a className="es-link" href="/en">Home</a>
            <a className="es-link" href="/en/explore">Explore</a>
            <a className="es-toggle" href="/ar" aria-label="Switch to Arabic">العربية</a>
          </nav>
        </header>

        <section className="es-hero">
          <div className="es-heroLeft">
            <div className="es-kicker">One vote per story • Real benefits for creators</div>

            <h1 className="es-title" aria-label="Enta Show">
              <span className="es-titleAr">Enta</span>
              <span className="es-titleEn es-sweep">Show</span>
            </h1>

            <p className="es-sub">
              Choose the work you want to see on the big screen.
              <br />
              Vote, submit your idea, and join production from the reader&apos;s gate.
            </p>

            <div className="es-ctaRow">
              <a className="es-btnPrimary" href="/en/explore">
                Explore categories
              </a>
            </div>

            <div className="es-stats">
              <div className="es-stat">
                <div className="es-statNum">17</div>
                <div className="es-statLabel">Categories</div>
              </div>
              <div className="es-stat">
                <div className="es-statNum">7</div>
                <div className="es-statLabel">Days in round</div>
              </div>
              <div className="es-stat">
                <div className="es-statNum">72</div>
                <div className="es-statLabel">Hours to finale</div>
              </div>
            </div>
          </div>

          <aside className="es-card">
            <div className="es-cardHeader">
              <div className="es-badge">LIVE</div>
              <div className="es-cardTitle">Current round</div>
            </div>

            <div className="es-cardBody">
              <div className="es-cardLine">
                <span className="es-muted">Format</span>
                <span>One open work for voting in each category</span>
              </div>
              <div className="es-cardLine">
                <span className="es-muted">Finale</span>
                <span>Top votes compete to choose one winner</span>
              </div>

              <div className="es-divider" />

              <div className="es-miniGrid">
                <div className="es-mini">
                  <div className="es-miniTitle">Voting</div>
                  <div className="es-miniText">Vote once per book — and undo anytime.</div>
                </div>
                <div className="es-mini">
                  <div className="es-miniTitle">Benefits</div>
                  <div className="es-miniText">
                    Feedback sessions and a chance to attend filming for active participants.
                  </div>
                </div>
              </div>

              <a className="es-btnSecondary" href="/en/explore">
                Enter exploration
              </a>
            </div>
          </aside>
        </section>

        <footer className="es-footer">
          <span>© {currentYear} Enta Show</span>
          <span className="es-footerSep">•</span>
          <span>An Arabic platform with a cinematic touch</span>
        </footer>
      </div>
    </main>
  );
}

// Added dangerouslySetInnerHTML helper format for style tag
const css = `
.es-page{
  position:relative; min-height:100vh; overflow:hidden;
  background:#07070c; color:#fff;
  font-family: "Inter","IBM Plex Sans Arabic",system-ui,-apple-system,Segoe UI,Roboto,Arial;
}
.es-wrap{ position:relative; z-index:2; max-width:1100px; margin:0 auto; padding:22px 18px 28px; }
.es-bg{ position:absolute; inset:0; z-index:1; }
.es-aurora{ position:absolute; width:900px; height:700px; filter: blur(42px); opacity:.55; border-radius:999px; }
.es-aurora.a1{ left:-220px; top:-240px; background: radial-gradient(circle at 30% 30%, #ff4fd8, transparent 55%), radial-gradient(circle at 60% 60%, #7c5cff, transparent 55%); animation: float1 10s ease-in-out infinite; }
.es-aurora.a2{ right:-260px; top:-140px; background: radial-gradient(circle at 30% 30%, #25d6ff, transparent 55%), radial-gradient(circle at 60% 60%, #00ffb3, transparent 55%); animation: float2 12s ease-in-out infinite; opacity:.45;}
.es-aurora.a3{ left:12%; bottom:-320px; background: radial-gradient(circle at 35% 35%, #ffcc66, transparent 55%), radial-gradient(circle at 65% 65%, #ff4fd8, transparent 55%); animation: float3 14s ease-in-out infinite; opacity:.25;}
.es-vignette{ position:absolute; inset:-1px; background: radial-gradient(900px 420px at 50% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(1200px 700px at 50% 120%, rgba(0,0,0,0.75), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.85)); }
.es-grain{
  position:absolute; inset:-50%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3C/rect%3E%3C/svg%3E");
  opacity:.10; mix-blend-mode: overlay; transform: rotate(5deg);
}
.es-top{ display:flex; align-items:center; justify-content:space-between; gap:14px; padding:10px 0 18px; flex-wrap:wrap; }
.es-pill{ display:inline-flex; align-items:center; gap:10px; padding:10px 12px; border-radius:999px; border:1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); font-size:13px; }
.es-dot{ width:8px; height:8px; border-radius:99px; background: linear-gradient(90deg,#ff4fd8,#25d6ff); box-shadow:0 0 18px rgba(255,79,216,.55); }
.es-nav{ display:flex; align-items:center; gap:14px; }
.es-link{ color:rgba(255,255,255,0.85); text-decoration:none; font-size:14px; padding:8px 10px; }
.es-toggle{ color:#0b0b0f; text-decoration:none; font-weight:800; font-size:13px; padding:9px 12px; border-radius:12px; background: linear-gradient(90deg,#ff4fd8,#25d6ff); }
.es-hero{ display:grid; grid-template-columns: 1.15fr .85fr; gap:18px; margin-top:12px; }
.es-heroLeft{ padding:26px 20px; border-radius:22px; border:1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); }
.es-card{ background: #fff; color: #000; border-radius: 22px; padding: 24px; }
@media (max-width: 940px){ .es-hero{ grid-template-columns: 1fr; } }
`;
