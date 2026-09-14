import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin credentials required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const filter = searchParams.get('filter') || 'all'; // 'all' | 'up' | 'down' | 'unrated'
    const format = searchParams.get('format'); // 'md' | 'txt'
    const sessionId = searchParams.get('sessionId');

    // Handle single session or all sessions
    const whereSession: Record<string, unknown> = {};
    if (sessionId) {
      whereSession.id = sessionId;
    }

    // If exporting a specific session or filtered sessions
    const sessions = await prisma.chatSession.findMany({
      where: whereSession,
      include: {
        user: { select: { id: true, name: true, email: true, username: true } },
        messages: {
          include: {
            feedback: true,
            correction: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: sessionId ? 1 : 50,
    });

    // Apply text search & feedback filters in-memory for comprehensive match
    let filteredSessions = sessions;

    if (query) {
      const q = query.toLowerCase();
      filteredSessions = filteredSessions.filter((s) =>
        s.messages.some((m) => m.content.toLowerCase().includes(q)) ||
        (s.user.name && s.user.name.toLowerCase().includes(q)) ||
        (s.user.email && s.user.email.toLowerCase().includes(q))
      );
    }

    if (filter === 'down') {
      filteredSessions = filteredSessions.filter((s) =>
        s.messages.some((m) => m.feedback?.rating === -1)
      );
    } else if (filter === 'up') {
      filteredSessions = filteredSessions.filter((s) =>
        s.messages.some((m) => m.feedback?.rating === 1)
      );
    } else if (filter === 'unrated') {
      filteredSessions = filteredSessions.filter((s) =>
        s.messages.some((m) => m.role === 'assistant' && !m.feedback)
      );
    }

    // Markdown Export
    if (format === 'md') {
      let md = `# Hotel AI Concierge - Transcript Export\n\n`;
      md += `*Generated on: ${new Date().toISOString()}*\n\n---\n\n`;

      filteredSessions.forEach((s) => {
        md += `## Session: ${s.title || s.id}\n`;
        md += `- **Guest**: ${s.user.name || s.user.email || 'Anonymous Guest'}\n`;
        md += `- **Session ID**: \`${s.id}\`\n`;
        md += `- **Date**: ${new Date(s.createdAt).toLocaleString()}\n\n`;

        s.messages.forEach((m) => {
          const roleLabel = m.role === 'user' ? '👤 **Guest**' : '🤖 **AI Concierge**';
          md += `### ${roleLabel} (${new Date(m.createdAt).toLocaleTimeString()})\n\n`;
          md += `${m.content}\n\n`;

          if (m.feedback) {
            const icon = m.feedback.rating === 1 ? '👍 Liked' : '👎 Disliked';
            md += `> **Rating**: ${icon}${m.feedback.reason ? ` - *Reason: ${m.feedback.reason}*` : ''}${m.feedback.userComment ? ` (${m.feedback.userComment})` : ''}\n\n`;
          }

          if (m.correction) {
            md += `> ✏️ **Admin Correction**: ${m.correction.idealResponse}\n\n`;
          }
        });

        md += `---\n\n`;
      });

      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="hotel_chat_export_${Date.now()}.md"`,
        },
      });
    }

    // Plain Text Export
    if (format === 'txt') {
      let txt = `=====================================================\nHOTEL AI CONCIERGE - TRANSCRIPT EXPORT\nGenerated: ${new Date().toISOString()}\n=====================================================\n\n`;

      filteredSessions.forEach((s) => {
        txt += `SESSION: ${s.title || s.id}\nGuest: ${s.user.name || s.user.email}\nDate: ${new Date(s.createdAt).toLocaleString()}\n-----------------------------------------------------\n`;

        s.messages.forEach((m) => {
          const role = m.role.toUpperCase();
          txt += `[${new Date(m.createdAt).toLocaleTimeString()}] ${role}: ${m.content}\n`;
          if (m.feedback) {
            txt += `  -> Feedback: ${m.feedback.rating === 1 ? 'Thumbs Up' : 'Thumbs Down'}${m.feedback.reason ? ` (${m.feedback.reason})` : ''}\n`;
          }
          if (m.correction) {
            txt += `  -> Admin Correction: ${m.correction.idealResponse}\n`;
          }
          txt += `\n`;
        });

        txt += `=====================================================\n\n`;
      });

      return new NextResponse(txt, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="hotel_chat_export_${Date.now()}.txt"`,
        },
      });
    }

    // JSON response for Admin Dashboard UI
    return NextResponse.json({
      sessions: filteredSessions,
      total: filteredSessions.length,
    });
  } catch (error) {
    console.error('Admin chats API error:', error);
    return NextResponse.json({ error: 'Failed to retrieve admin chats' }, { status: 500 });
  }
}
