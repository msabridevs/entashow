"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";

export default function ContactEN() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  async function submit() {
    setStatus("");
    if (!email.includes("@") || msg.trim().length < 5) {
      setStatus("Please enter a valid email and a clear message.");
      return;
    }
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message: msg }),
    });
    if (!res.ok) return setStatus("Failed to send. Please try again later.");
    setStatus("Sent ✅ We’ll get back to you.");
    setName("");
    setEmail("");
    setMsg("");
  }

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
      <h1 style={{ marginTop: 0 }}>Contact</h1>

      <p style={{ lineHeight: 1.8 }}>
        Send us a message. (Stored in our database for support purposes only.)
      </p>

      <label style={label}>Name (optional)</label>
      <input value={name} onChange={(e) => setName(e.target.value)} style={input} />

      <label style={label}>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
        placeholder="email@example.com"
      />

      <label style={label}>Message</label>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        style={textarea}
        placeholder="Write your message..."
      />

      <button onClick={submit} style={button}>
        Send
      </button>

      {status && <p style={{ marginTop: 12, fontWeight: 700 }}>{status}</p>}

      <p style={{ marginTop: 18 }}>
        <a href="/en" style={{ fontWeight: 700 }}>
          ← Back to home
        </a>
      </p>

      <SiteFooter lang="en" />
    </main>
  );
}

const label: React.CSSProperties = {
  display: "block",
  marginTop: 12,
  fontWeight: 700,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
  marginTop: 6,
};

const textarea: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
  marginTop: 6,
  minHeight: 140,
};

const button: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 800,
};
