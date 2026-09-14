import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { messageId, rating, reason, userComment } = await req.json();

    if (!messageId || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'Valid messageId and rating (1 or -1) are required' },
        { status: 400 }
      );
    }

    // Verify message exists
    const message = await prisma.chatMessage.findUnique({
      where: { id: messageId },
      include: { session: true },
    });

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Ensure only the session owner or an admin can submit feedback
    if (message.session.userId !== user.userId && user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized to rate this message' }, { status: 403 });
    }

    const feedback = await prisma.feedback.upsert({
      where: { messageId },
      update: {
        rating,
        reason: reason || null,
        userComment: userComment || null,
      },
      create: {
        messageId,
        rating,
        reason: reason || null,
        userComment: userComment || null,
      },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Failed to record feedback' }, { status: 500 });
  }
}
