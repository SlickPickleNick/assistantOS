import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'hotel-concierge-super-secret-jwt-key-2026-local'
);

const COOKIE_NAME = 'assistantos_session';

export interface UserSession {
  userId: string;
  email?: string | null;
  name?: string | null;
  username?: string | null;
  role: 'guest' | 'admin';
}

export async function createSessionToken(payload: UserSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string | undefined,
      name: payload.name as string | undefined,
      username: payload.username as string | undefined,
      role: (payload.role as 'guest' | 'admin') || 'guest',
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  // Verify user still exists in DB
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, username: true, role: true },
  });

  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    role: user.role as 'guest' | 'admin',
  };
}

export { COOKIE_NAME };
