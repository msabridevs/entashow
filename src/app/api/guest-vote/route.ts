// src/app/api/guest-vote/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getClientIp(req: Request): string | null {
  // Cloudflare (most reliable when orange-cloud proxy is ON)
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  // Other common reverse-proxy headers
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();

  // Vercel / standard proxy header (may include multiple IPs)
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  return null;
}

export async function POST(req: Request) {
  const { roundId, workId, fingerprint } = await req.json();

  if (!roundId || !workId || !fingerprint) {
    return new NextResponse("missing params", { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const ip = getClientIp(req);

  const { error } = await supabase.rpc("cast_guest_vote", {
    p_round_id: roundId,
    p_work_id: workId,
    p_fingerprint: fingerprint,
    p_ip: ip, // <-- IP is now captured and stored
  });

  // Duplicate vote (fingerprint or IP unique constraint) will land here
  if (error) {
    return new NextResponse("duplicate_or_failed", { status: 409 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const roundId = url.searchParams.get("roundId");
  const workId = url.searchParams.get("workId");
  const fingerprint = url.searchParams.get("fingerprint");

  if (!roundId || !workId || !fingerprint) {
    return new NextResponse("missing params", { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.rpc("revoke_guest_vote", {
    p_round_id: roundId,
    p_work_id: workId,
    p_fingerprint: fingerprint,
  });

  if (error) {
    return new NextResponse("failed", { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
