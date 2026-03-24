import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (userId) {
      // Log activity
      await db.activityLog.create({
        data: {
          action: 'LOGOUT',
          details: `User logged out`,
          userId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
