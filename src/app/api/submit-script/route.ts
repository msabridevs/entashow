import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { fingerprint, email, title, pitch, excerpt } = await req.json();

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.rpc("submit_script_idea", {
    p_fingerprint: fingerprint,
    p_email: email || "",
    p_title: title || "",
    p_pitch: pitch || "",
    p_excerpt: excerpt || null,
  });

  if (error) {
    // Return friendly status codes
    const msg = error.message || "failed";
    if (msg.includes("daily limit")) return new NextResponse("daily limit", { status: 429 });
    return new NextResponse(msg, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
