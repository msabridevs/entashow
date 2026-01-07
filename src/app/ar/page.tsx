import Head from "next/head";

export default function ArabicHome() {
  return (
    <main className="es-page" dir="rtl" lang="ar">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700;900&family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{css}</style>

      {/* Background layers */}
      <div className="es-bg" aria-hidden="true">
        <div className="es-aurora a1" />
        <div className="es-aurora a2" />
        <div className="es-aurora a3" />
        <div className="es-vignette" />
        <div className="es-grain" />
      </div>

      <div className="es-wrap">
        {/* Top bar */}
        <header className="es-top">
          <div className="es-pill">
            <span className="es-dot" />
            <span>من القرّاء إلى الشاشة — تجربة سينمائية</span>
          </div>

          <nav className="es-nav" aria-label="التنقل">
            <a className="es-link" href="/ar">
              الرئيسية
            </a>
            <a className="es-link" href="/ar/explore">
              استكشف
            </a>
 
            <a className="es-toggle" href="/en" aria-label="Switch to English">
              English
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="es-hero">
          <div className="es-heroLeft">
            <div className="es-kicker">صوت واحد لكل كتاب • مزايا حقيقية للمبدعين</div>

            <h1 className="es-title" aria-label="أنت Show">
              <span className="es-titleAr">أنت</span>
              <span className="es-titleEn es-sweep">Show</span>
            </h1>

            <p className="es-sub">
              اختر العمل الذي تريد رؤيته على الشاشة الكبيرة.
              <br />
              صوّت، قدّم فكرتك، وادخل عالم الإنتاج من بوابة القرّاء.
            </p>

            <div className="es-ctaRow">
              <a className="es-btnPrimary" href="/ar/explore">
                استكشف التصنيفات
              </a>

            </div>

            <div className="es-stats">
              <div className="es-stat">
                <div className="es-statNum">17</div>
                <div className="es-statLabel">تصنيف</div>
              </div>
              <div className="es-stat">
                <div className="es-statNum">7</div>
                <div className="es-statLabel">أيام للجولة</div>
              </div>
              <div className="es-stat">
                <div className="es-statNum">72</div>
                <div className="es-statLabel">ساعة للنهائي</div>
              </div>
            </div>
          </div>

          {/* Right card */}
          <aside className="es-card">
            <div className="es-cardHeader">
              <div className="es-badge">LIVE</div>
              <div className="es-cardTitle">الجولة الحالية</div>
            </div>

            <div className="es-cardBody">
              <div className="es-cardLine">
                <span className="es-muted">النظام</span>
                <span>عمل واحد مفتوح للتصويت تحت كل تصنيف</span>
              </div>
              <div className="es-cardLine">
                <span className="es-muted">النهائي</span>
                <span>أعلى الأصوات تتنافس لاختيار فائز واحد</span>
              </div>

              <div className="es-divider" />

              <div className="es-miniGrid">
                <div className="es-mini">
                  <div className="es-miniTitle">التصويت</div>
                  <div className="es-miniText">صوّت مرة واحدة لكل كتاب — ويمكنك الإلغاء متى شئت.</div>
                </div>
                <div className="es-mini">
                  <div className="es-miniTitle">المزايا</div>
                  <div className="es-miniText">جلسات ملاحظات، وفرصة حضور التصوير للمشاركين النشطين.</div>
                </div>
              </div>

              <a className="es-btnSecondary" href="/ar/explore">
                ادخل إلى الاستكشاف
              </a>
            </div>
          </aside>
        </section>

        <footer className="es-footer">
          <span>© {new Date().getFullYear()} أنت Show</span>
          <span className="es-footerSep">•</span>
          <span>منصة عربية بلمسة سينمائية</span>
        </footer>
      </div>
    </main>
  );
}

const css = `
/* ====== Base ====== */
.es-page{
  position:relative; min-height:100vh; overflow:hidden;
  background:#07070c; color:#fff;
  font-family: "IBM Plex Sans Arabic","Inter",system-ui,-apple-system,Segoe UI,Roboto,Arial;
}
.es-wrap{ position:relative; z-index:2; max-width:1100px; margin:0 auto; padding:22px 18px 28px; }

/* ====== Background ====== */
.es-bg{ position:absolute; inset:0; z-index:1; }
.es-aurora{ position:absolute; width:900px; height:700px; filter: blur(42px); opacity:.55; border-radius:999px; }
.es-aurora.a1{ left:-220px; top:-240px; background: radial-gradient(circle at 30% 30%, #ff4fd8, transparent 55%), radial-gradient(circle at 60% 60%, #7c5cff, transparent 55%); animation: float1 10s ease-in-out infinite; }
.es-aurora.a2{ right:-260px; top:-140px; background: radial-gradient(circle at 30% 30%, #25d6ff, transparent 55%), radial-gradient(circle at 60% 60%, #00ffb3, transparent 55%); animation: float2 12s ease-in-out infinite; opacity:.45;}
.es-aurora.a3{ left:12%; bottom:-320px; background: radial-gradient(circle at 35% 35%, #ffcc66, transparent 55%), radial-gradient(circle at 65% 65%, #ff4fd8, transparent 55%); animation: float3 14s ease-in-out infinite; opacity:.25;}
.es-vignette{ position:absolute; inset:-1px; background: radial-gradient(900px 420px at 50% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(1200px 700px at 50% 120%, rgba(0,0,0,0.75), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.85)); }
.es-grain{
  position:absolute; inset:-50%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
  opacity:.10; mix-blend-mode: overlay; transform: rotate(5deg);
  animation: grain 9s steps(10) infinite;
}

/* ====== Top bar ====== */
.es-top{ display:flex; align-items:center; justify-content:space-between; gap:14px; padding:10px 0 18px; flex-wrap:wrap; }
.es-pill{
  display:inline-flex; align-items:center; gap:10px;
  padding:10px 12px; border-radius:999px;
  border:1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  font-size:13px; opacity:.95;
}
.es-dot{ width:8px; height:8px; border-radius:99px; background: linear-gradient(90deg,#ff4fd8,#25d6ff); box-shadow:0 0 18px rgba(255,79,216,.55); }
.es-nav{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.es-link{
  color:rgba(255,255,255,0.85); text-decoration:none; font-size:14px;
  padding:8px 10px; border-radius:10px;
  transition: transform .15s ease, background .15s ease, color .15s ease;
}
.es-link:hover{ background: rgba(255,255,255,0.06); color:#fff; transform: translateY(-1px); }
.es-toggle{
  color:#0b0b0f; text-decoration:none; font-weight:800; font-size:13px;
  padding:9px 12px; border-radius:12px;
  background: linear-gradient(90deg,#ff4fd8,#25d6ff);
  box-shadow: 0 12px 30px rgba(37,214,255,0.10);
}

/* ====== Hero ====== */
.es-hero{ display:grid; grid-template-columns: 1.15fr .85fr; gap:18px; align-items:stretch; margin-top:12px; }
@media (max-width: 940px){ .es-hero{ grid-template-columns: 1fr; } }

.es-heroLeft{
  padding:26px 20px;
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 22px 80px rgba(0,0,0,0.55);
}
.es-kicker{
  display:inline-flex; gap:10px; align-items:center;
  font-size:13px; opacity:.9;
  padding:8px 10px; border-radius:999px;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.20);
}
.es-title{
  margin:14px 0 0;
  font-size:64px; line-height:1.0; letter-spacing:-0.03em;
  display:flex; gap:14px; align-items:baseline; flex-wrap:wrap;
}
@media (max-width: 520px){ .es-title{ font-size:52px; } }

.es-titleAr{
  font-weight:900;
  background: linear-gradient(90deg, #ffcc66, #ff4fd8, #7c5cff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 0 20px rgba(255,79,216,0.20));
}
.es-titleEn{
  font-weight:900; letter-spacing:-0.02em;
  background: linear-gradient(90deg, #25d6ff, #00ffb3, #ff4fd8);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 0 20px rgba(37,214,255,0.18));
}
.es-sub{ margin:14px 0 0; font-size:18px; line-height:1.9; opacity:.92; max-width:56ch; }

.es-ctaRow{ margin-top:18px; display:flex; gap:12px; flex-wrap:wrap; }
.es-btnPrimary{
  text-decoration:none; color:#0b0b0f; font-weight:900;
  padding:12px 14px; border-radius:14px;
  background: linear-gradient(90deg,#ff4fd8,#25d6ff);
  box-shadow: 0 18px 60px rgba(255,79,216,0.18);
  transition: transform .15s ease;
}
.es-btnPrimary:hover{ transform: translateY(-2px); }
.es-btnGhost{
  text-decoration:none; color:#fff; font-weight:750;
  padding:12px 14px; border-radius:14px;
  border:1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  transition: transform .15s ease, background .15s ease;
}
.es-btnGhost:hover{ transform: translateY(-2px); background: rgba(255,255,255,0.09); }

.es-stats{
  display:flex; gap:12px; flex-wrap:wrap;
  margin-top:18px;
}
.es-stat{
  flex: 1 1 140px;
  padding:12px 12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.22);
}
.es-statNum{ font-size:22px; font-weight:900; }
.es-statLabel{ font-size:13px; opacity:.8; margin-top:4px; }

/* ====== Card ====== */
.es-card{
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  overflow:hidden;
  box-shadow: 0 22px 80px rgba(0,0,0,0.55);
}
.es-cardHeader{
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.0));
  border-bottom:1px solid rgba(255,255,255,0.10);
}
.es-badge{
  font-size:11px; font-weight:900; letter-spacing:.12em;
  padding:7px 10px; border-radius:999px;
  color:#0b0b0f;
  background: linear-gradient(90deg,#ffcc66,#ff4fd8);
  box-shadow: 0 10px 30px rgba(255,79,216,0.16);
}
.es-cardTitle{ font-weight:900; opacity:.95; }
.es-cardBody{ padding:16px; display:flex; flex-direction:column; gap:12px; }
.es-cardLine{ display:flex; justify-content:space-between; gap:12px; font-size:14px; line-height:1.6; }
.es-muted{ opacity:.7; white-space:nowrap; }
.es-divider{ height:1px; background: rgba(255,255,255,0.12); margin:4px 0; }
.es-miniGrid{ display:grid; grid-template-columns:1fr; gap:10px; }
.es-mini{
  padding:12px; border-radius:16px;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.22);
}
.es-miniTitle{ font-weight:900; margin-bottom:6px; }
.es-miniText{ font-size:13px; line-height:1.7; opacity:.85; }

.es-btnSecondary{
  margin-top:6px;
  text-align:center;
  text-decoration:none; color:#fff; font-weight:850;
  padding:12px 14px; border-radius:14px;
  border:1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  transition: transform .15s ease, background .15s ease;
}
.es-btnSecondary:hover{ transform: translateY(-2px); background: rgba(255,255,255,0.10); }

/* ====== Footer ====== */
.es-footer{ margin-top:18px; display:flex; gap:10px; justify-content:center; opacity:.7; font-size:13px; flex-wrap:wrap; }
.es-footerSep{ opacity:.5; }

/* ====== Sweep / Light Effect ====== */
.es-sweep { position: relative; overflow: hidden; }
.es-sweep::after{
  content:"";
  position:absolute;
  top:-20%;
  left:-120%;
  width:60%;
  height:140%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255,255,255,0.15) 40%,
    rgba(255,255,255,0.45) 50%,
    rgba(255,255,255,0.15) 60%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: sweep 3.5s ease-in-out infinite;
  pointer-events:none;
}
@keyframes sweep{
  0%{ left:-120%; }
  45%{ left:120%; }
  100%{ left:120%; }
}

/* ====== Animations ====== */
@keyframes float1{ 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(30px, 18px) } }
@keyframes float2{ 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(-24px, 16px) } }
@keyframes float3{ 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(16px, -18px) } }
@keyframes grain{ 0%,100%{ transform: translate(0,0) rotate(5deg) } 50%{ transform: translate(-2%, 1%) rotate(5deg) } }
`;
