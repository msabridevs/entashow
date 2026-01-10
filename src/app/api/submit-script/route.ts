import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { fingerprint, email, title, synopsis, script_text } = await req.json();

  if (!fingerprint) return new NextResponse("missing fingerprint", { status: 400 });
  if (!title || title.length < 2) return new NextResponse("bad title", { status: 400 });
  if (!synopsis || synopsis.length < 10) return new NextResponse("bad synopsis", { status: 400 });
  if (!script_text || script_text.length < 50) return new NextResponse("bad script", { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("script_submissions").insert({
    fingerprint,
    email: email || null,
    title,
    synopsis,
    script_text,
  });

  if (error) return new NextResponse("failed", { status: 400 });
  return NextResponse.json({ ok: true });
}
