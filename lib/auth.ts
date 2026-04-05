import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "mb-onboarding-secret-change-in-production"
);

export const SESSION_COOKIE = "session";

export interface SessionPayload {
  sub: string;      // userId
  name: string;
  isAdmin: boolean;
  role: string;
  language: string;
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** Read the session from a raw Cookie header string (works in API routes & middleware). */
export async function getSessionFromCookieHeader(
  cookieHeader: string | null
): Promise<SessionPayload | null> {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return null;
  return verifyToken(decodeURIComponent(match[1]));
}

/** Read the session from the Next.js server-component cookie store. */
export async function getServerSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/** Helper for API route handlers — returns session or throws 401 response. */
export async function requireSession(request: Request): Promise<SessionPayload> {
  const session = await getSessionFromCookieHeader(
    request.headers.get("cookie")
  );
  if (!session) throw new Response("Unauthorized", { status: 401 });
  return session;
}

/** Like requireSession but also checks isAdmin. */
export async function requireAdmin(request: Request): Promise<SessionPayload> {
  const session = await requireSession(request);
  if (!session.isAdmin) throw new Response("Forbidden", { status: 403 });
  return session;
}
