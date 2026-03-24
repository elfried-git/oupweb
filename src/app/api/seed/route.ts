import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function POST() {
  try {
    await db.notification.deleteMany({});
    await db.activityLog.deleteMany({});
    await db.event.deleteMany({});
    await db.task.deleteMany({});
    await db.product.deleteMany({});

    const users = await Promise.all([
      db.user.upsert({
        where: { email: 'admin@demo.com' },
        update: {},
        create: {
          email: 'admin@demo.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        },
      }),
      db.user.upsert({
        where: { email: 'user@demo.com' },
        update: {},
        create: {
          email: 'user@demo.com',
          password: 'user123',
          name: 'Demo User',
          role: 'user',
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        },
      }),
      db.user.upsert({
        where: { email: 'guest@demo.com' },
        update: {},
        create: {
          email: 'guest@demo.com',
          password: 'guest123',
          name: 'Guest User',
          role: 'guest',
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        },
      }),
    ]);

    const products = await Promise.all([
      db.product.upsert({
        where: { sku: 'PROD-001' },
        update: {},
        create: {
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 149.99,
          category: 'Electronics',
          stock: 50,
          sku: 'PROD-001',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
          isActive: true,
        },
      }),
      db.product.upsert({
        where: { sku: 'PROD-002' },
        update: {},
        create: {
          name: 'Mechanical Keyboard',
          description: 'RGB mechanical keyboard with Cherry MX switches',
          price: 89.99,
          category: 'Electronics',
          stock: 100,
          sku: 'PROD-002',
          imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200',
          isActive: true,
        },
      }),
      db.product.upsert({
        where: { sku: 'PROD-003' },
        update: {},
        create: {
          name: 'Ergonomic Chair',
          description: 'Comfortable ergonomic office chair',
          price: 299.99,
          category: 'Furniture',
          stock: 25,
          sku: 'PROD-003',
          imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200',
          isActive: true,
        },
      }),
      db.product.upsert({
        where: { sku: 'PROD-004' },
        update: {},
        create: {
          name: 'Adjustable Desk',
          description: 'Electric standing desk with height adjustment',
          price: 449.99,
          category: 'Furniture',
          stock: 15,
          sku: 'PROD-004',
          imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200',
          isActive: true,
        },
      }),
      db.product.upsert({
        where: { sku: 'PROD-005' },
        update: {},
        create: {
          name: '27" Monitor',
          description: '4K Ultra HD monitor with HDR support',
          price: 399.99,
          category: 'Electronics',
          stock: 30,
          sku: 'PROD-005',
          imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200',
          isActive: true,
        },
      }),
      db.product.upsert({
        where: { sku: 'PROD-006' },
        update: {},
        create: {
          name: 'HD Webcam',
          description: 'Full HD webcam with built-in microphone',
          price: 79.99,
          category: 'Electronics',
          stock: 75,
          sku: 'PROD-006',
          imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=200',
          isActive: false,
        },
      }),
    ]);

    const tasks = await Promise.all([
      db.task.create({
        data: {
          title: 'Complete project documentation',
          description: 'Write comprehensive documentation for the new feature',
          status: 'todo',
          priority: 'high',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          assigneeId: users[0].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Review pull requests',
          description: 'Review and merge pending pull requests',
          status: 'in_progress',
          priority: 'medium',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          assigneeId: users[1].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Update dependencies',
          description: 'Update all npm dependencies to latest versions',
          status: 'done',
          priority: 'low',
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          assigneeId: users[0].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Design new homepage',
          description: 'Create mockups for the new homepage design',
          status: 'todo',
          priority: 'high',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
      }),
      db.task.create({
        data: {
          title: 'Fix login bug',
          description: 'Fix session timeout issue on login page',
          status: 'in_progress',
          priority: 'high',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          assigneeId: users[1].id,
        },
      }),
      db.task.create({
        data: {
          title: 'Write unit tests',
          description: 'Add unit tests for dashboard components',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          assigneeId: users[2].id,
        },
      }),
    ]);

    await Promise.all([
      db.notification.create({
        data: {
          title: 'Welcome!',
          message: 'Welcome to the Oupweb dashboard. Explore all the features!',
          type: 'info',
          isRead: false,
        },
      }),
      db.notification.create({
        data: {
          title: 'New task assigned',
          message: 'A new task has been assigned to you: Complete project documentation',
          type: 'success',
          isRead: false,
        },
      }),
      db.notification.create({
        data: {
          title: 'System maintenance',
          message: 'Scheduled maintenance on Sunday from 2am to 4am',
          type: 'warning',
          isRead: true,
        },
      }),
      db.notification.create({
        data: {
          title: 'Security alert',
          message: 'New login detected from an unknown device',
          type: 'error',
          isRead: false,
        },
      }),
    ]);

    // Create events for the calendar
    const today = new Date();
    const events = await Promise.all([
      db.event.create({
        data: {
          title: 'Team Meeting',
          description: 'Weekly team sync meeting',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          allDay: false,
          color: 'primary',
          userId: users[0].id,
        },
      }),
      db.event.create({
        data: {
          title: 'Product Launch',
          description: 'Launch of the new product line',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
          allDay: true,
          color: 'success',
          userId: users[0].id,
        },
      }),
      db.event.create({
        data: {
          title: 'Client Presentation',
          description: 'Present the new proposal to the client',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 14, 0),
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 16, 0),
          allDay: false,
          color: 'warning',
          userId: users[1].id,
        },
      }),
      db.event.create({
        data: {
          title: 'Training Session',
          description: 'New employee training session',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 9, 0),
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 17, 0),
          allDay: false,
          color: 'info',
        },
      }),
      db.event.create({
        data: {
          title: 'Deadline: Sprint Review',
          description: 'End of sprint review and demo',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
          allDay: true,
          color: 'error',
          userId: users[0].id,
        },
      }),
      db.event.create({
        data: {
          title: 'Company Holiday',
          description: 'Office closed for holiday',
          startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14),
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
          allDay: true,
          color: 'success',
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: users.length,
        products: products.length,
        tasks: tasks.length,
        events: events.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
