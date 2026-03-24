export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  stock: number;
  sku: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  assigneeId: string | null;
  assignee?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  userId: string | null;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string | null;
  userId: string | null;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
  userId: string | null;
  user?: { id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}
