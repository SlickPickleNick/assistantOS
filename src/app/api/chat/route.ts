import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// Simulated Intelligent Concierge Knowledge Base (Used until class materials arrive)
function generateConciergeResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  // Escalation detection
  if (
    lower.includes('manager') ||
    lower.includes('complain') ||
    lower.includes('refund') ||
    lower.includes('unacceptable') ||
    lower.includes('terrible') ||
    lower.includes('broken') ||
    lower.includes('speak with human') ||
    lower.includes('human representative')
  ) {
    return `I am truly sorry to hear that you are experiencing this issue during your stay. As your AI Concierge, I have flagged this matter with our Front Desk Duty Manager. A member of our Guest Relations team is ready to assist you directly. Would you like me to dispatch an urgent assistance request or connect you with our front desk right away?`;
  }

  // Check-in / Check-out
  if (lower.includes('check-in') || lower.includes('check in') || lower.includes('arrival')) {
    return `Standard check-in begins at 3:00 PM. If you arrive early, our bell desk is delighted to hold your luggage, and you are welcome to enjoy the pool and dining facilities. Early check-in can be requested upon arrival subject to room readiness.`;
  }

  if (lower.includes('check-out') || lower.includes('check out') || lower.includes('departure')) {
    return `Check-out is at 11:00 AM. We offer contactless express checkout directly via your room key drop or front desk. Late check-out (up to 1:00 PM) can be arranged subject to suite availability.`;
  }

  // Wi-Fi
  if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('internet')) {
    return `Complimentary high-speed fiber Wi-Fi is available across all guest rooms, cabanas, and public lounges. Please connect to **AzureGuest_5G** and authenticate using your room number and last name.`;
  }

  // Dining & Breakfast
  if (lower.includes('breakfast') || lower.includes('dining') || lower.includes('eat') || lower.includes('food') || lower.includes('restaurant')) {
    return `We offer three distinctive culinary venues:\n\n1. **The Horizon Terrace**: Coastal breakfast buffet & artisan pastries served daily from 6:30 AM to 11:00 AM.\n2. **Celadon Oyster & Raw Bar**: Fresh seafood, craft cocktails, and sunset views from 4:00 PM to 11:00 PM.\n3. **24/7 In-Suite Dining**: Available anytime by calling extension 404 on your suite phone.`;
  }

  // Pool & Spa
  if (lower.includes('pool') || lower.includes('swim') || lower.includes('spa') || lower.includes('massage')) {
    return `The heated infinity pool is open daily from 6:00 AM to 10:00 PM, featuring private cabanas and poolside refreshments. The **Azure Thalasso Spa** is open from 9:00 AM to 8:00 PM; reservations are recommended for massage and hydrotherapy rituals.`;
  }

  // Parking & Valet
  if (lower.includes('parking') || lower.includes('valet') || lower.includes('car')) {
    return `Complimentary valet parking is provided for all registered guests at the main porte-cochère. We also provide Level 2 and DC Fast Tesla/Universal EV charging stations on-site.`;
  }

  // Pets
  if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat') || lower.includes('animal')) {
    return `The Grand Azure is proud to be pet-friendly! We welcome up to two canine companions (under 40 lbs each). We provide luxury pet beds, organic treats, and custom dining bowls upon arrival.`;
  }

  // Local attractions
  if (lower.includes('attraction') || lower.includes('nearby') || lower.includes('do') || lower.includes('activities') || lower.includes('beach')) {
    return `Popular highlights within 10 minutes of the property include:\n\n- **Azure Cove Beach Walk**: Private scenic boardwalk directly accessible from the resort lawn.\n- **Historic Marina & Lighthouse**: Sunset sailing charters and boutique galleries.\n- **Cliffside Botanical Gardens**: 40 acres of tropical flora and panoramic ocean viewpoints.\n\nOur concierge desk is happy to arrange private transportation or sailing excursions.`;
  }

  // Default Hospitable Answer
  return `Thank you for inquiring. At The Grand Azure, our team is dedicated to providing an unforgettable stay. If you need any specific details regarding our suites, dining reservations, or local excursions, please let me know and I would be delighted to assist!`;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      );
    }

    const { message, sessionId } = await req.json();
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // Find or create session
    let chatSession;
    if (sessionId) {
      chatSession = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });
    }

    if (!chatSession || chatSession.userId !== user.userId) {
      chatSession = await prisma.chatSession.create({
        data: {
          userId: user.userId,
          title: message.slice(0, 40) + (message.length > 40 ? '...' : ''),
        },
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        role: 'user',
        content: message.trim(),
      },
    });

    // Check if an admin correction exists for this prompt or similar query
    const existingCorrection = await prisma.correction.findFirst({
      where: {
        applied: true,
        originalPrompt: {
          contains: message.trim().toLowerCase(),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    let assistantResponseText: string;
    if (existingCorrection) {
      assistantResponseText = existingCorrection.idealResponse;
    } else {
      assistantResponseText = generateConciergeResponse(message);
    }

    // Save assistant response
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        role: 'assistant',
        content: assistantResponseText,
      },
    });

    return NextResponse.json({
      sessionId: chatSession.id,
      messageId: assistantMessage.id,
      response: assistantResponseText,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}

// Fetch session messages
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      // Return list of user's recent sessions
      const sessions = await prisma.chatSession.findMany({
        where: { userId: user.userId },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        include: {
          _count: { select: { messages: true } },
        },
      });
      return NextResponse.json({ sessions });
    }

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          include: { feedback: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session || (session.userId !== user.userId && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Fetch chat error:', error);
    return NextResponse.json({ error: 'Failed to retrieve chats' }, { status: 500 });
  }
}
