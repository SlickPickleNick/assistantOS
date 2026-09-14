import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'admin') {
      const { username, password } = body;
      if (!username || !password) {
        return NextResponse.json(
          { error: 'Username and password are required' },
          { status: 400 }
        );
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email: username }],
        },
      });

      if (!user || !user.passwordHash) {
        return NextResponse.json(
          { error: 'Invalid admin credentials' },
          { status: 401 }
        );
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid admin credentials' },
          { status: 401 }
        );
      }

      const token = await createSessionToken({
        userId: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: 'admin',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: 'admin',
        },
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    if (type === 'guest') {
      const { name, email, provider } = body;
      const guestEmail = email || `guest_${Date.now()}@hotel.guest`;
      const guestName = name || (provider ? `${provider} Guest` : 'Valued Hotel Guest');

      let user = await prisma.user.findUnique({
        where: { email: guestEmail },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: guestEmail,
            name: guestName,
            role: 'guest',
          },
        });
      }

      const token = await createSessionToken({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: 'guest',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'guest',
        },
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ error: 'Unknown login type' }, { status: 400 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal authentication error' },
      { status: 500 }
    );
  }
}
