import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Fetch all data in parallel using Prisma
    const [products, tasks, notifications, activities, users, events] = await Promise.all([
      db.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      db.task.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      db.notification.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      db.activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      db.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatar: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.event.findMany({
        orderBy: { startDate: 'asc' },
      }),
    ]);

    return NextResponse.json({
      products,
      tasks,
      notifications,
      activities,
      users,
      events,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
