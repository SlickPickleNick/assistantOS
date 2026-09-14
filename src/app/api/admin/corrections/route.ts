import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const corrections = await prisma.correction.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        message: {
          include: {
            session: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
      },
    });

    return NextResponse.json({ corrections });
  } catch (error) {
    console.error('Fetch corrections error:', error);
    return NextResponse.json({ error: 'Failed to fetch corrections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { messageId, originalPrompt, badResponse, idealResponse } = await req.json();

    if (!originalPrompt || !idealResponse) {
      return NextResponse.json(
        { error: 'originalPrompt and idealResponse are required' },
        { status: 400 }
      );
    }

    let correction;
    if (messageId) {
      correction = await prisma.correction.upsert({
        where: { messageId },
        update: {
          originalPrompt: originalPrompt.trim(),
          badResponse: badResponse || '',
          idealResponse: idealResponse.trim(),
          applied: true,
        },
        create: {
          messageId,
          originalPrompt: originalPrompt.trim(),
          badResponse: badResponse || '',
          idealResponse: idealResponse.trim(),
          applied: true,
        },
      });
    } else {
      correction = await prisma.correction.create({
        data: {
          originalPrompt: originalPrompt.trim(),
          badResponse: badResponse || '',
          idealResponse: idealResponse.trim(),
          applied: true,
        },
      });
    }

    return NextResponse.json({ success: true, correction });
  } catch (error) {
    console.error('Save correction error:', error);
    return NextResponse.json({ error: 'Failed to save correction' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Correction ID is required' }, { status: 400 });
    }

    await prisma.correction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete correction error:', error);
    return NextResponse.json({ error: 'Failed to delete correction' }, { status: 500 });
  }
}
