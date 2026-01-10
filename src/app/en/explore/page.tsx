"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SlotRow = {
  work_id: string;
  genre_id: string;
};

type WorkRow = {
  id: string;
  title_ar: string;
  author_ar?: string | null;
  synopsis_ar?: string | null;
  synopsis_en?: string | null;
};

type GenreRow = {
  id: string;
  name_en: string;
  sort_order: number;
};

export default function EnglishExplore() {
  const supabase = useMemo(() => createClient(), []);

  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);

  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [works, setWorks] = useState<Record<string, WorkRow>>({});
  const [genres, setGenres] = useState<Record<string, GenreRow>>({});

  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [myVotes, setMyVotes] = useState<Set<string>>(new Set());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  async function load() {
    setMsg("");

    const r = await supabase
      .from("rounds")
      .select("id")
      .eq("status", "active")
      .eq("round_type", "category")
      .maybeSingle();

    if (!r.data?.id) return;

    const activeRoundId = r.data.id;
    setRoundId(activeRoundId);

    const sRes = await supabase
      .from("category_slots")
      .select("work_id, genre_id")
      .eq("round_id", activeRoundId);

    const slotRows = (sRes.data as SlotRow[]) ?? [];
    setSlots(slotRows);

    const workIds = Array.from(new Set(slotRows.map((s) => s.work_id)));
    const genreIds = Array.from(new Set(slotRows.map((s) => s.genre_id)));

    const wRes = await supabase
      .from("works")
      .select("id, title_ar, author_ar, synopsis_ar, synopsis_en")
      .in("id", workIds);

    const wMap: Record<string, WorkRow> = {};
    (wRes.data ?? []).forEach((w: any) => (wMap[w.id] = w));
    setWorks(wMap);

    const gRes = await supabase
      .from("genres")
      .select("id, name_en, sort_order")
      .in("id", genreIds);

    const gMap: Record<string, GenreRow> = {};
    (gRes.data ?? []).forEach((g: any) => (gMap[g.id] = g));
    setGenres(gMap);

    const { data: allVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId);

    const counts: Record<string, number> = {};
    (allVotes ?? []).forEach((v: any) => {
      counts[v.work_id] = (counts[v.work_id] ?? 0) + 1;
    });
    setVoteCounts(counts);

    const { data: myVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId)
      .eq("fingerprint", fingerprint);

    setMyVotes(new Set((myVotes ?? []).map((v: any) => v.work_id)));
  }

  async function toggleVote(workId: string) {
    if (!fingerprint || !roundId) return;
    setMsg("");

    const hasVoted = myVotes.has(workId);

    const url = hasVoted
      ? `/api/guest-vote?roundId=${encodeURIComponent(roundId)}&workId=${encodeURIComponent(
          workId
        )}&fingerprint=${encodeURIComponent(fingerprint)}`
      : "/api/guest-vote";

    const res = await fetch(url, {
      method: hasVoted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: hasVoted ? null : JSON.stringify({ roundId, workId, fingerprint }),
    });

    if (!res.ok) {
      setMsg(hasVoted ? "Undo failed." : "Vote failed.");
      return;
    }

    await load();
  }

  if (!fingerprint) {
    return (
      <main style={{ textAlign: "center", marginTop: 40 }}>
        <p>Loading…</p>
      </main>
    );
  }

  const orderedSlots = [...slots].sort(
    (a, b) =>
      (genres[a.genre_id]?.sort_order ?? 999) -
      (genres[b.genre_id]?.sort_order ?? 999)
  );

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Voting</h1>

      <p style={{ color: "#555", fontSize: 14, marginBottom: 18 }}>
        Vote as a guest — no login. Undo works while your device id stays the same.
      </p>

      {orderedSlots.map((s) => {
        const g = genres[s.genre_id];
        const w = works[s.work_id];

        const genreName = g?.name_en ?? "";
        const title = w?.title_ar ?? "Title unavailable";
        const synopsis = (w?.synopsis_en || w?.synopsis_ar || "").trim();
        const count = voteCounts[s.work_id] ?? 0;
        const voted = myVotes.has(s.work_id);

        return (
          <div
            key={s.work_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              marginBottom: 14,
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "#666", textTransform: "uppercase" }}>
                {genreName}
              </div>
              <strong style={{ fontSize: 20, display: "block" }}>{title}</strong>

              {synopsis && <div style={clamp3}>{synopsis}</div>}
            </div>

            <div style={{ textAlign: "center", minWidth: 110 }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{count}</div>
              <button
                onClick={() => toggleVote(s.work_id)}
                style={{
                  marginTop: 6,
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: voted ? "#ef4444" : "#2563eb",
                  color: "#fff",
                  fontWeight: 800,
                  width: "100%",
                }}
              >
                {voted ? "Undo" : "Vote"}
              </button>
            </div>
          </div>
        );
      })}

      {msg && <p style={{ color: "#b91c1c", fontWeight: 700 }}>{msg}</p>}
    </main>
  );
}

const clamp3: React.CSSProperties = {
  marginTop: 6,
  color: "#333",
  opacity: 0.9,
  lineHeight: 1.6,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as any,
  overflow: "hidden",
};
