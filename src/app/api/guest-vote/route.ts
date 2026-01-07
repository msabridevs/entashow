import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { roundId, workId, fingerprint } = await req.json();
  const supabase = await createServerSupabaseClient();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

  const { error } = await supabase.rpc("cast_guest_vote", {
    p_round_id: roundId,
    p_work_id: workId,
    p_fingerprint: fingerprint,
    p_ip: ip,
  });

  if (error) return new NextResponse("duplicate", { status: 409 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const roundId = url.searchParams.get("roundId");
  const workId = url.searchParams.get("workId");
  const fingerprint = url.searchParams.get("fingerprint");
  let roundId = url.searchParams.get("roundId");
  let workId = url.searchParams.get("workId");
  let fingerprint = url.searchParams.get("fingerprint");

  if (!roundId || !workId || !fingerprint) {
    const body = await req.json().catch(() => null);
    roundId = roundId ?? body?.roundId ?? null;
    workId = workId ?? body?.workId ?? null;
    fingerprint = fingerprint ?? body?.fingerprint ?? null;
  }

  if (!roundId || !workId || !fingerprint) {
    return new NextResponse("missing params", { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.rpc("revoke_guest_vote", {
    p_round_id: roundId,
    p_work_id: workId,
    p_fingerprint: fingerprint,
  });

  if (error) return new NextResponse("failed", { status: 400 });
  return NextResponse.json({ ok: true });
}