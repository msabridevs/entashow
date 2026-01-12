import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!email || !email.includes("@") || !message || message.trim().length < 5) {
    return new NextResponse("invalid", { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: (name || "").trim() || null,
    email: email.trim(),
    message: message.trim(),
  });

  if (error) return new NextResponse("failed", { status: 400 });
  return NextResponse.json({ ok: true });
}
