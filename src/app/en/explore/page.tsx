"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// ✅ Types moved outside the component
type SlotRow = { work_id: string; genre_id: string };
type WorkRow = { id: string; title_ar?: string | null; author_ar?: string | null };
type GenreRow = { id: string; name_ar: string; sort_order: number };

export default function EnglishExploreClient() {
  const supabase = useMemo(() => createClient(), []);

  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [works, setWorks] = useState<Record<string, WorkRow>>({});
  const [genres, setGenres] = useState<Record<string, GenreRow>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "enta_show_fp";
    let fp = localStorage.getItem(key);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(key, fp);
    }
    setFingerprint(fp);
  }, []);

  useEffect(() => {
    if (!fingerprint) return;
    load();
  }, [fingerprint, supabase]);

  async function load() {
    if (!fingerprint) return;
    setMsg("");

    const { data: activeRound } = await supabase
      .from("rounds")
      .select("id")
      .eq("active", true)
      .maybeSingle();

    if (!activeRound?.id) {
      setMsg("No active round is available right now.");
      return;
    }

    const activeRoundId = activeRound.id;
    setRoundId(activeRoundId);

    const { data: slotRows } = await supabase
      .from("round_slots")
      .select("work_id, genre_id")
      .eq("round_id", activeRoundId);

    const s = slotRows ?? [];
    setSlots(s);

    const workIds = s.map((x) => x.work_id);
    const genreIds = Array.from(new Set(s.map((x) => x.genre_id)));

    const [{ data: workRows }, { data: genreRows }] = await Promise.all([
      supabase.from("works").select("id, title_ar, author_ar").in("id", workIds),
      supabase.from("genres").select("id, name_ar, sort_order").in("id", genreIds)
    ]);

    const workMap: Record<string, WorkRow> = {};
    (workRows ?? []).forEach((w) => { workMap[w.id] = w; });
    setWorks(workMap);

    const genreMap: Record<string, GenreRow> = {};
    (genreRows ?? []).forEach((g) => { genreMap[g.id] = g; });
    setGenres(genreMap);

    const { data: allVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId);

    const c: Record<string, number> = {};
    (allVotes ?? []).forEach((v) => {
      c[v.work_id] = (c[v.work_id] ?? 0) + 1;
    });
    setCounts(c);

    const { data: myVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId)
      .eq("fingerprint", fingerprint);

    setUserVotes(new Set((myVotes ?? []).map((v) => v.work_id)));
  }

  async function handleVoteToggle(workId: string) {
    if (!fingerprint || !roundId) return;
    const hasVoted = userVotes.has(workId);

    const res = await fetch("/api/guest-vote", {
      method: hasVoted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roundId, workId, fingerprint }),
    });

    if (!res.ok) {
      setMsg("Update failed. Please try again.");
      return;
    }
    await load();
  }

  if (!fingerprint) return <div style={{ color: "#fff", padding: 50 }}>Loading...</div>;

  const sorted = [...slots].sort(
    (a, b) => (genres[a.genre_id]?.sort_order ?? 999) - (genres[b.genre_id]?.sort_order ?? 999)
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0b0b0f", color: "#fff", padding: "48px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>EntaShow Guest Voting</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>Vote once per work.</p>
        
        {msg && <div style={{ color: "#ff4d4d", marginBottom: 20 }}>{msg}</div>}

        {sorted.map((s) => {
          const g = genres[s.genre_id];
          const w = works[s.work_id];
          const hasVoted = userVotes.has(s.work_id);

          return (
            <div key={s.work_id} style={{ 
              background: "rgba(255,255,255,0.05)", 
              padding: 20, 
              borderRadius: 12, 
              display: "flex", 
              justifyContent: "space-between", 
              marginBottom: 15,
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <div>
                <small style={{ color: "#aaa" }}>{g?.name_ar}</small>
                <h3 style={{ margin: "5px 0" }}>{w?.title_ar || "Untitled"}</h3>
                <span style={{ fontSize: 12, color: "#888" }}>Votes: {counts[s.work_id] ?? 0}</span>
              </div>
              <button 
                onClick={() => handleVoteToggle(s.work_id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: hasVoted ? "#ff4d4d" : "#fff",
                  color: hasVoted ? "#fff" : "#000",
                  border: "none",
                  fontWeight: "bold"
                }}
              >
                {hasVoted ? "Remove Vote" : "Vote"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
