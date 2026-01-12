"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import SiteFooter from "@/components/SiteFooter";

type SlotRow = { work_id: string; genre_id: string };

type WorkRow = {
  id: string;
  title_ar: string;
  author_ar?: string | null;
  author_url?: string | null;
  publication_year?: number | null;
  publisher?: string | null;
  notable_awards?: string | null;
  synopsis_ar?: string | null;
};

type GenreRow = {
  id: string;
  name_ar: string;
  sort_order: number;
};

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

    const workIds = Array.from(new Set(slotRows.map(s => s.work_id)));
    const genreIds = Array.from(new Set(slotRows.map(s => s.genre_id)));

    const wRes = await supabase
      .from("works")
      .select("id, title_ar, author_ar, author_url, publication_year, publisher, notable_awards, synopsis_ar")
      .in("id", workIds);

    const wMap: Record<string, WorkRow> = {};
    (wRes.data ?? []).forEach((w: any) => (wMap[w.id] = w));
    setWorks(wMap);

    const gRes = await supabase
      .from("genres")
      .select("id, name_ar, sort_order")
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

    const voted = myVotes.has(workId);

    const url = voted
      ? `/api/guest-vote?roundId=${roundId}&workId=${workId}&fingerprint=${fingerprint}`
      : "/api/guest-vote";

    const res = await fetch(url, {
      method: voted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: voted ? null : JSON.stringify({ roundId, workId, fingerprint }),
    });

    if (!res.ok) {
      if (res.status === 409) {
        setMsg("لا يمكن التصويت مرتين لنفس العمل في نفس الجولة.");
        return;
      }
      setMsg(voted ? "تعذّر التراجع." : "تعذّر التصويت.");
      return;
    }

    await load();
  }

  const orderedSlots = [...slots].sort(
    (a, b) =>
      (genres[a.genre_id]?.sort_order ?? 999) -
      (genres[b.genre_id]?.sort_order ?? 999)
  );

  return (
    <main
      dir="rtl"
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        paddingBottom: 80,
        fontFamily: "system-ui, Arial",
        background: "#fff",
        color: "#000",
      }}
    >
      <h1>التصويت</h1>

      {orderedSlots.map(s => {
        const g = genres[s.genre_id];
        const w = works[s.work_id];
        if (!g || !w) return null;

        return (
          <div key={s.work_id} style={card}>
            <div>
              <div style={muted}>{g.name_ar}</div>
              <strong style={title}>{w.title_ar}</strong>
              {w.synopsis_ar && <div style={clamp3}>{w.synopsis_ar}</div>}
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={count}>{voteCounts[s.work_id] ?? 0}</div>
              <button
                onClick={() => toggleVote(s.work_id)}
                style={button(myVotes.has(s.work_id))}
              >
                {myVotes.has(s.work_id) ? "تراجع" : "صوّت"}
              </button>
            </div>
          </div>
        );
      })}

      {msg && <p style={{ color: "#b91c1c", fontWeight: 700 }}>{msg}</p>}

      <p style={{ marginTop: 18 }}>
        <a href="/ar" style={{ fontWeight: 700 }}>← العودة للرئيسية</a>
      </p>

      <SiteFooter lang="ar" />
    </main>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 16,
  marginBottom: 14,
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
};

const title: React.CSSProperties = { fontSize: 20 };
const muted: React.CSSProperties = { fontSize: 13, color: "#666" };
const count: React.CSSProperties = { fontSize: 22, fontWeight: 800 };

const button = (voted: boolean): React.CSSProperties => ({
  marginTop: 6,
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: voted ? "#ef4444" : "#2563eb",
  color: "#fff",
  fontWeight: 800,
});

const clamp3: React.CSSProperties = {
  marginTop: 6,
  opacity: 0.9,
  lineHeight: 1.6,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as any,
  overflow: "hidden",
};
