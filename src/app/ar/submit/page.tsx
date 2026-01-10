"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

function getFP(): string {
  const key = "enta_show_fp";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

export default function SubmitAR() {
  const [fp, setFp] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [script, setScript] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => setFp(getFP()), []);

  async function submit() {
    setMsg("");

    const res = await fetch("/api/submit-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fingerprint: fp,
        email,
        title,
        synopsis,
        script_text: script,
      }),
    });

    if (!res.ok) {
      setMsg("تعذّر الإرسال. تأكد من ملء البيانات.");
      return;
    }

    setMsg("تم استلام نصّك ✅ سيتم اختيار نص واحد ضمن فئة (مستقل) لكل جولة.");
    setEmail("");
    setTitle("");
    setSynopsis("");
    setScript("");
  }

  return (
    <main dir="rtl" style={{ maxWidth: 820, margin: "40px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>قدّم نصك (مستقل)</h1>
      <p style={{ opacity: 0.8 }}>
        سيتم حفظ النص للمراجعة، وقد نختار نصًا واحدًا لكل جولة ضمن فئة (مستقل) للتصويت.
      </p>

      <label>البريد (اختياري للتواصل)</label>
      <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>عنوان النص</label>
      <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>ملخص قصير</label>
      <textarea value={synopsis} onChange={e => setSynopsis(e.target.value)} style={textareaStyle(90)} />

      <label style={labelStyle}>النص الكامل</label>
      <textarea value={script} onChange={e => setScript(e.target.value)} style={textareaStyle(220)} />

      <button onClick={submit} style={btnStyle}>إرسال</button>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <p style={{ marginTop: 18 }}>
        <a href="/ar/explore">← رجوع للتصويت</a>
      </p>
    </main>
  );
}

const labelStyle: React.CSSProperties = { marginTop: 10, display: "block" };
const inputStyle: React.CSSProperties = { width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc", marginTop: 6 };
const textareaStyle = (h: number): React.CSSProperties => ({ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc", marginTop: 6, minHeight: h });
const btnStyle: React.CSSProperties = { marginTop: 12, padding: "10px 14px", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer", fontWeight: 800 };
