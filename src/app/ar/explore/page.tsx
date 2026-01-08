"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/* ---------- Types ---------- */

type SlotRow = {
  work_id: string;
  genre_id: string;
};

type WorkRow = {
  id: string;
  title_ar: string;
  author_ar?: string | null;
};

type GenreRow = {
  id: string;
  name_ar: string;
  sort_order: number;
};

/* ---------- Component ---------- */

export default function ArabicExplore() {
  const supabase = useMemo(() => createClient(), []);

  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);

  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [works, setWorks] = useState<Record<string, WorkRow>>({});
  const [genres, setGenres] = useState<Record<string, GenreRow>>({});

  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [myVotes, setMyVotes] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState("");

  /* ---------- Fingerprint (browser only) ---------- */

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

  /* ---------- Load data ---------- */

  useEffect(() => {
    if (!fingerprint) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  async function load() {
    setMsg("");

    // 1) active round
    const r = await supabase
      .from("rounds")
      .select("id")
      .eq("status", "active")
      .eq("round_type", "category")
      .maybeSingle();

    if (!r.data?.id) return;

    const activeRoundId = r.data.id;
    setRoundId(activeRoundId);

    // 2) slots
    const sRes = await supabase
      .from("category_slots")
      .select("work_id, genre_id")
      .eq("round_id", activeRoundId);

    const slotRows = (sRes.data as SlotRow[]) ?? [];
    setSlots(slotRows);

    const workIds = Array.from(new Set(slotRows.map((s) => s.work_id)));
    const genreIds = Array.from(new Set(slotRows.map((s) => s.genre_id)));

    // 3) works (titles always come from here)
    const wRes = await supabase
      .from("works")
      .select("id, title_ar, author_ar")
      .in("id", workIds);

    const wMap: Record<string, WorkRow> = {};
    (wRes.data ?? []).forEach((w: any) => {
      wMap[w.id] = w;
    });
    setWorks(wMap);

    // 4) genres
    const gRes = await supabase
      .from("genres")
      .select("id, name_ar, sort_order")
      .in("id", genreIds);

    const gMap: Record<string, GenreRow> = {};
    (gRes.data ?? []).forEach((g: any) => {
      gMap[g.id] = g;
    });
    setGenres(gMap);

    // 5) vote counts
    const { data: allVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId);

    const counts: Record<string, number> = {};
    (allVotes ?? []).forEach((v: any) => {
      counts[v.work_id] = (counts[v.work_id] ?? 0) + 1;
    });
    setVoteCounts(counts);

    // 6) my votes
    const { data: myVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId)
      .eq("fingerprint", fingerprint);

    setMyVotes(new Set((myVotes ?? []).map((v: any) => v.work_id)));
  }

  /* ---------- Vote / Undo ---------- */

  async function toggleVote(workId: string) {
    if (!fingerprint || !roundId) return;
    setMsg("");

    const hasVoted = myVotes.has(workId);

    const url = hasVoted
      ? `/api/guest-vote?roundId=${roundId}&workId=${workId}&fingerprint=${fingerprint}`
      : "/api/guest-vote";

    const res = await fetch(url, {
      method: hasVoted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: hasVoted ? null : JSON.stringify({ roundId, workId, fingerprint }),
    });

    if (!res.ok) {
      setMsg(hasVoted ? "تعذّر التراجع عن التصويت." : "تعذّر التصويت.");
      return;
    }

    await load();
  }

  if (!fingerprint) {
    return (
      <main dir="rtl" style={{ textAlign: "center", marginTop: 40 }}>
        <p>جارٍ التحميل…</p>
      </main>
    );
  }

  const orderedSlots = [...slots].sort(
    (a, b) =>
      (genres[a.genre_id]?.sort_order ?? 999) -
      (genres[b.genre_id]?.sort_order ?? 999)
  );

  /* ---------- Render ---------- */

  return (
    <main
      dir="rtl"
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
      }}
    >
      <h1>التصويت</h1>

      <p style={{ color: "#555", fontSize: 14 }}>
        يمكنك التصويت مرة واحدة لكل عمل. التراجع ممكن طالما لم يتغيّر معرف الجهاز.
      </p>

      {orderedSlots.map((s) => {
        const g = genres[s.genre_id];
        const w = works[s.work_id];

        const title = w?.title_ar ?? "عنوان غير متاح";
        const genreName = g?.name_ar ?? "";
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
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "#666" }}>{genreName}</div>
              <strong style={{ fontSize: 20 }}>{title}</strong>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{count}</div>
              <button
                onClick={() => toggleVote(s.work_id)}
                style={{
                  marginTop: 6,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: voted ? "#ef4444" : "#2563eb",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {voted ? "تراجع" : "صوّت"}
              </button>
            </div>
          </div>
        );
      })}

      {msg && <p style={{ color: "#b91c1c", fontWeight: 700 }}>{msg}</p>}
    </main>
  );
}
