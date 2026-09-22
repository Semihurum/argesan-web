import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const cleanUser = username ? username.trim() : "";
    const cleanPass = password ? password.trim() : "";

    const isValidUser = cleanUser === "admin";
    const isValidPass = cleanPass === "argesan46" || cleanPass === "admin";

    if (isValidUser && isValidPass) {
      return NextResponse.json({
        success: true,
        token: "argesan_session_token",
        user: { username: "admin", role: "superadmin" },
      });
    }

    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Giriş işlemi sırasında sunucu hatası." },
      { status: 500 }
    );
  }
}
