// User management is now handled by /api/admin/employees (POST)
// and /api/auth/me (GET current user).
// This route is kept as a legacy no-op to avoid 404s.

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Use /api/auth/me instead" }, { status: 301 });
}
