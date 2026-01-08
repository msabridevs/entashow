"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

type SlotRow = { work_id: string; genre_id: string };
type WorkRow = { id: string; title_ar: string; author_ar?: string | null };
type WorkRow = { id: string; title_ar?: string | null; author_ar?: string | null };
type GenreRow = { id: string; name_ar: string; sort_order: number };

export default function ArabicExplore() {
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
@@ -93,109 +93,103 @@ export default function ArabicExplore() {
  }, []);

  useEffect(() => {
    if (!fingerprint) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  async function load() {
    if (!fingerprint) return;
    setMsg("");

    const { data: activeRound, error: roundError } = await supabase
      .from("rounds")
      .select("id")
      .eq("active", true)
      .maybeSingle();

    if (roundError || !activeRound?.id) {
      setRoundId(null);
      setSlots([]);
      setMsg("لا توجد جولة نشطة حالياً.");
      return;
    }

@@ -79,85 +75,81 @@ export default function ArabicExplore() {
      ? await supabase.from("works").select("id, title_ar, author_ar").in("id", workIds)
      : { data: [] as WorkRow[] };

    const { data: genreRows } = genreIds.length
      ? await supabase.from("genres").select("id, name_ar, sort_order").in("id", genreIds)
      : { data: [] as GenreRow[] };

    const workMap: Record<string, WorkRow> = {};
    (workRows ?? []).forEach((w) => {
      workMap[w.id] = w;
    });
    setWorks(workMap);

    const genreMap: Record<string, GenreRow> = {};
    (genreRows ?? []).forEach((g) => {
      genreMap[g.id] = g;
    });
    setGenres(genreMap);

    const { data: allVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId);

    const c: Record<string, number> = {};
    (allVotes ?? []).forEach((v: any) => {
    (allVotes ?? []).forEach((v: { work_id: string }) => {
      c[v.work_id] = (c[v.work_id] ?? 0) + 1;
    });
    setCounts(c);

    // 5) my votes
    const { data: myVotes } = await supabase
      .from("guest_votes")
      .select("work_id")
      .eq("round_id", activeRoundId)
      .eq("fingerprint", fingerprint);

    setUserVotes(new Set((myVotes ?? []).map((v: any) => v.work_id)));
    setUserVotes(new Set((myVotes ?? []).map((v: { work_id: string }) => v.work_id)));
  }

  async function handleVoteToggle(workId: string) {
    if (!fingerprint || !roundId) return;
    setMsg("");

    const hasVoted = userVotes.has(workId);

    const url = hasVoted
      ? `/api/guest-vote?roundId=${encodeURIComponent(roundId)}&workId=${encodeURIComponent(
          workId
        )}&fingerprint=${encodeURIComponent(fingerprint)}`
      : "/api/guest-vote";

    const res = await fetch(url, {
    const res = await fetch("/api/guest-vote", {
      method: hasVoted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: hasVoted ? null : JSON.stringify({ roundId, workId, fingerprint }),
      body: JSON.stringify({ roundId, workId, fingerprint }),
    });

    if (!res.ok) {
      setMsg(hasVoted ? "تعذّر التراجع. ربما تغيّر معرف الجهاز." : "تعذّر التصويت. حاول مرة أخرى.");
      return;
    }

    await load();
  }

  if (!fingerprint) {
    return (
      <main dir="rtl" style={{ textAlign: "center", marginTop: 50, color: "#000" }}>
        <p>جارٍ التحميل…</p>
      </main>
    );
  }

  // keep your decorations; just ensure visibility
  const sorted = [...slots].sort(
    (a, b) => (genres[a.genre_id]?.sort_order ?? 999) - (genres[b.genre_id]?.sort_order ?? 999)
  );

  return (
    <main
@@ -166,90 +158,88 @@ export default function ArabicExplore() {
        maxWidth: 900,
        margin: "40px auto",
        padding: 16,
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "system-ui, Arial",
      }}
    >
      <h1 style={{ color: "#000" }}>التصويت المفتوح</h1>

      <p style={{ color: "#333", marginBottom: 8 }}>يمكنك التصويت مرة واحدة لكل عمل.</p>

      <p style={{ color: "#666", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        ملاحظة: التراجع متاح طالما لم يتغيّر معرف الجهاز (إذا تم مسح بيانات المتصفح قد لا يعمل التراجع).
      </p>

      {msg ? (
        <div style={{ marginBottom: 16, color: "#a12b2b", fontWeight: 600 }}>{msg}</div>
      ) : null}

      {sorted.map((s) => {
        const g = genres[s.genre_id];
        const w = works[s.work_id];

        const genreName = g?.name_ar ?? "";
        const title = w?.title_ar ?? "عنوان غير متاح";
        const title = w?.title_ar?.trim() ? w.title_ar : "عنوان غير متاح";
        const count = counts[s.work_id] ?? 0;

        const hasVoted = userVotes.has(s.work_id);

        return (
          <div
            key={s.work_id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              marginBottom: 15,
              borderRadius: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fdfdfd",
              gap: 12,
            }}
          >
            <div>
              <div style={{ color: "#555", fontSize: 13 }}>{genreName}</div>
              <strong style={{ fontSize: 20, color: "#000" }}>{title}</strong>
              {w?.author_ar ? (
                <div style={{ color: "#666", marginTop: 6, fontSize: 13 }}>{w.author_ar}</div>
              ) : null}
            </div>

            <div
              style={{
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span style={{ color: "#333", fontSize: 14 }}>الأصوات: {count}</span>
              <button
                type="button"
                onClick={() => handleVoteToggle(s.work_id)}
                style={{
                  background: hasVoted ? "#f2f2f2" : "#111",
                  color: hasVoted ? "#111" : "#fff",
                  border: "1px solid #111",
                  padding: "8px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {hasVoted ? "تراجع" : "صوّت"}
              </button>
            </div>
          </div>
        );
      })}

      {!sorted.length ? (
        <p style={{ color: "#666" }}>لا توجد أعمال متاحة حالياً.</p>
      ) : null}
    </main>
  );
}
}