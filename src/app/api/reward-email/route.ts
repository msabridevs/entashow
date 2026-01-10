import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { email, fingerprint } = await req.json();

  if (!email || !email.includes("@")) return new NextResponse("invalid email", { status: 400 });
  if (!fingerprint) return new NextResponse("missing fingerprint", { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("reward_emails").insert({ email, fingerprint });

  if (error) return new NextResponse("already registered", { status: 409 });
  return NextResponse.json({ ok: true });
}
