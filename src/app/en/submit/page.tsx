"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";

function getFP(): string {
  const key = "enta_show_fp";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

const LIMIT_TITLE = 80;
const LIMIT_PITCH = 240;
const LIMIT_EXCERPT = 1200;

export default function SubmitEN() {
  const [fp, setFp] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [pitch, setPitch] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");

  const [msg, setMsg] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setFp(getFP());
  }, []);

  const titleLeft = useMemo(() => LIMIT_TITLE - title.length, [title]);
  const pitchLeft = useMemo(() => LIMIT_PITCH - pitch.length, [pitch]);
  const excerptLeft = useMemo(() => LIMIT_EXCERPT - excerpt.length, [excerpt]);

  async function submit() {
    setMsg("");

    if (!fp) return setMsg("Please refresh and try again.");
    if (title.trim().length < 2) return setMsg("Please enter a title.");
    if (pitch.trim().length < 10) return setMsg("Please enter a short pitch (at least 10 characters).");

    setSending(true);
    try {
      const res = await fetch("/api/submit-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fingerprint: fp,
          email: email.trim() || null,
          title: title.trim(),
          pitch: pitch.trim(),
          excerpt: excerpt.trim() || null,
        }),
      });

      if (res.status === 429) {
        setMsg("Daily limit reached (3 submissions/day). Try tomorrow.");
        return;
      }

      if (!res.ok) {
        setMsg("Failed to submit. Please check the limits and try again.");
        return;
      }

      setMsg("Received ✅ Your idea will be reviewed for the Independent slot.");
      setEmail("");
      setTitle("");
      setPitch("");
      setExcerpt("");
    } finally {
      setSending(false);
    }
  }

  return (
    <main
      dir="ltr"
      style={{
        maxWidth: 820,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Submit your idea (Independent)</h1>

      <p style={{ opacity: 0.8, lineHeight: 1.7 }}>
        Please submit a <b>short pitch</b>. Optional: a short excerpt (not the full script).
        <br />
        Limits: Title {LIMIT_TITLE}, Pitch {LIMIT_PITCH}, Excerpt {LIMIT_EXCERPT} characters.
      </p>

      <label style={labelStyle}>Email </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" style={inputStyle} />

      <label style={labelStyle}>
        Title <span style={counterStyle}>{titleLeft}</span>
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, LIMIT_TITLE))}
        placeholder="Your idea title"
        style={inputStyle}
      />

      <label style={labelStyle}>
        Short pitch (240 chars) <span style={counterStyle}>{pitchLeft}</span>
      </label>
      <textarea
        value={pitch}
        onChange={(e) => setPitch(e.target.value.slice(0, LIMIT_PITCH))}
        placeholder="Brief idea: world + protagonist + goal..."
        style={textareaStyle(110)}
      />

      <label style={labelStyle}>
        Optional excerpt (max {LIMIT_EXCERPT}) <span style={counterStyle}>{excerptLeft}</span>
      </label>
      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value.slice(0, LIMIT_EXCERPT))}
        placeholder="Optional short excerpt..."
        style={textareaStyle(180)}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={submit} disabled={sending} style={btnStyle}>
          {sending ? "Submitting..." : "Submit"}
        </button>

        <a href="/en/explore" style={linkBtnStyle}>← Back to voting</a>
        <a href="/en" style={linkBtnStyle}>← Home</a>
      </div>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <p style={{ marginTop: 18, opacity: 0.75, fontSize: 13, lineHeight: 1.6 }}>
        Note: Daily limit: 3 submissions.
      </p>
    </main>
  );
}

const labelStyle: React.CSSProperties = { marginTop: 12, display: "block", fontWeight: 700 };
const counterStyle: React.CSSProperties = { marginLeft: 8, fontWeight: 700, opacity: 0.6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc", marginTop: 6 };
const textareaStyle = (minHeight: number): React.CSSProperties => ({
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
  marginTop: 6,
  minHeight,
});
const btnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 800,
};
const linkBtnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ccc",
  textDecoration: "none",
  color: "#000",
  display: "inline-flex",
  alignItems: "center",
};
