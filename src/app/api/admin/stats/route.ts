import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const [totalSessions, totalMessages, thumbsUp, thumbsDown, totalCorrections, totalGuests] =
      await Promise.all([
        prisma.chatSession.count(),
        prisma.chatMessage.count(),
        prisma.feedback.count({ where: { rating: 1 } }),
        prisma.feedback.count({ where: { rating: -1 } }),
        prisma.correction.count(),
        prisma.user.count({ where: { role: 'guest' } }),
      ]);

    const totalRatings = thumbsUp + thumbsDown;
    const satisfactionRate =
      totalRatings > 0 ? Math.round((thumbsUp / totalRatings) * 100) : 100;

    return NextResponse.json({
      stats: {
        totalSessions,
        totalMessages,
        thumbsUp,
        thumbsDown,
        satisfactionRate,
        totalCorrections,
        totalGuests,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
