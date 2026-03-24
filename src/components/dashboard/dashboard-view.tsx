'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useTranslation } from '@/hooks/use-translation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ProductsTable } from '@/components/dashboard/products-table';
import { TasksList } from '@/components/dashboard/tasks-list';
import { NotificationsPanel } from '@/components/dashboard/notifications-panel';
import { ActivityLog } from '@/components/dashboard/activity-log';
import { UsersTable } from '@/components/dashboard/users-table';
import { CalendarView } from '@/components/dashboard/calendar-view';
import { ProductFormModal } from '@/components/dashboard/product-form-modal';
import { TaskFormModal } from '@/components/dashboard/task-form-modal';
import { UserFormModal } from '@/components/dashboard/user-form-modal';
import { EventFormModal } from '@/components/dashboard/event-form-modal';
import { ProfileModal } from '@/components/dashboard/profile-modal';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { ChartsSection } from '@/components/dashboard/charts-section';
import { DashboardSkeleton } from '@/components/skeletons/loading-skeletons';
import { UserIcon } from '@/components/icons/custom-icons';
import type { Product, Task, Notification as NotificationType, ActivityLog as ActivityLogType, Event as EventType } from '@/types';
import type { User as UserType } from '@/stores/auth-store';

export function DashboardView() {
  const router = useRouter();
  const { user, isAuthenticated, logout, login } = useAuthStore();
  const { t } = useTranslation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [activities, setActivities] = useState<ActivityLogType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'product' | 'task' | 'user' | 'event'; id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Single API call to fetch all dashboard data
      const response = await fetch('/api/dashboard-data');
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTasks(data.tasks || []);
        setNotifications(data.notifications || []);
        setActivities(data.activities || []);
        setUsers(data.users || []);
        setEvents(data.events || []);
      } else {
        toast.error(t.toast.dataLoadFailed);
      }
    } catch {
      toast.error(t.toast.dataLoadFailed);
    } finally {
      setIsLoading(false);
    }
  }, [t.toast.dataLoadFailed]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      fetchData();
    }
  }, [isAuthenticated, router, fetchData]);
  
  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
    } catch {
      // ignore
    }
    logout();
    router.push('/');
  }, [logout, router, user?.id]);

  const handleUpdateUser = useCallback((updatedUser: UserType) => {
    login(updatedUser);
    toast.success(t.profile.updated);
    fetchData();
  }, [login, t.profile.updated, fetchData]);

  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    setProductModalOpen(true);
  }, []);
  
  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  }, []);
  
  const handleDeleteProduct = useCallback((id: string) => {
    setItemToDelete({ type: 'product', id });
    setDeleteConfirmOpen(true);
  }, []);
  
  const handleSubmitProduct = useCallback(async (data: Partial<Product>) => {
    setIsSubmitting(true);
    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}`
        : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success(editingProduct ? t.product.updated : t.product.created);
        setProductModalOpen(false);
        fetchData();
      } else {
        toast.error(t.product.saveFailed);
      }
    } catch {
      toast.error(t.toast.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  }, [editingProduct, t.product, t.toast.errorOccurred, fetchData]);
  
  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setTaskModalOpen(true);
  }, []);
  
  const handleTaskStatusChange = useCallback(async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        toast.success(t.task.statusUpdated);
        fetchData();
      }
    } catch {
      toast.error(t.toast.updateFailed);
    }
  }, [t.task.statusUpdated, t.toast.updateFailed, fetchData]);
  
  const handleDeleteTask = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success(t.task.deleted);
        fetchData();
      }
    } catch {
      toast.error(t.toast.deleteFailed);
    }
  }, [t.task.deleted, t.toast.deleteFailed, fetchData]);
  
  const handleSubmitTask = useCallback(async (data: Partial<Task>) => {
    setIsSubmitting(true);
    try {
      const url = editingTask 
        ? `/api/tasks/${editingTask.id}`
        : '/api/tasks';
      const method = editingTask ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success(editingTask ? t.task.updated : t.task.created);
        setTaskModalOpen(false);
        fetchData();
      } else {
        toast.error(t.toast.saveFailed);
      }
    } catch {
      toast.error(t.toast.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  }, [editingTask, t.task, t.toast.saveFailed, t.toast.errorOccurred, fetchData]);

  const handleAddUser = useCallback(() => {
    setEditingUser(null);
    setUserModalOpen(true);
  }, []);

  const handleEditUser = useCallback((editUser: UserType) => {
    setEditingUser(editUser);
    setUserModalOpen(true);
  }, []);

  const handleDeleteUser = useCallback((id: string) => {
    setItemToDelete({ type: 'user', id });
    setDeleteConfirmOpen(true);
  }, []);

  const handleSubmitUser = useCallback(async (data: Partial<UserType> & { password?: string }) => {
    setIsSubmitting(true);
    try {
      const url = editingUser 
        ? `/api/users/${editingUser.id}`
        : '/api/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success(editingUser ? t.users.updated : t.users.created);
        setUserModalOpen(false);
        fetchData();
      } else {
        toast.error(t.users.saveFailed);
      }
    } catch {
      toast.error(t.toast.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  }, [editingUser, t.users, t.toast.errorOccurred, fetchData]);

  const handleToggleUserActive = useCallback(async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });
      
      if (response.ok) {
        toast.success(isActive ? t.users.activated : t.users.deactivated);
        fetchData();
      }
    } catch {
      toast.error(t.toast.updateFailed);
    }
  }, [t.users, t.toast.updateFailed, fetchData]);

  const handleChangeUserRole = useCallback(async (id: string, role: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      
      if (response.ok) {
        toast.success(t.users.roleChanged);
        fetchData();
      }
    } catch {
      toast.error(t.toast.updateFailed);
    }
  }, [t.users.roleChanged, t.toast.updateFailed, fetchData]);

  const handleAddEvent = useCallback(() => {
    setEditingEvent(null);
    setSelectedCalendarDate(null);
    setEventModalOpen(true);
  }, []);

  const handleEditEvent = useCallback((event: EventType) => {
    setEditingEvent(event);
    setEventModalOpen(true);
  }, []);

  const handleDeleteEvent = useCallback((id: string) => {
    setItemToDelete({ type: 'event', id });
    setDeleteConfirmOpen(true);
  }, []);

  const handleSubmitEvent = useCallback(async (data: Partial<EventType>) => {
    setIsSubmitting(true);
    try {
      const url = editingEvent 
        ? `/api/events/${editingEvent.id}`
        : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast.success(editingEvent ? t.calendar.updated : t.calendar.created);
        setEventModalOpen(false);
        fetchData();
      } else {
        toast.error(t.calendar.saveFailed);
      }
    } catch {
      toast.error(t.toast.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  }, [editingEvent, t.calendar, t.toast.errorOccurred, fetchData]);
  
  const handleMarkNotificationRead = useCallback(async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      fetchData();
    } catch {
      // ignore
    }
  }, [fetchData]);
  
  const handleClearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  
  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    
    try {
      let url: string;
      let successMessage: string;
      
      if (itemToDelete.type === 'product') {
        url = `/api/products/${itemToDelete.id}`;
        successMessage = t.product.deleted;
      } else if (itemToDelete.type === 'task') {
        url = `/api/tasks/${itemToDelete.id}`;
        successMessage = t.task.deleted;
      } else if (itemToDelete.type === 'event') {
        url = `/api/events/${itemToDelete.id}`;
        successMessage = t.calendar.deleted;
      } else {
        url = `/api/users/${itemToDelete.id}`;
        successMessage = t.users.deleted;
      }
      
      const response = await fetch(url, { method: 'DELETE' });
      
      if (response.ok) {
        toast.success(successMessage);
        fetchData();
      }
    } catch {
      toast.error(t.toast.deleteFailed);
    } finally {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  }, [itemToDelete, t.product.deleted, t.task.deleted, t.users.deleted, t.calendar.deleted, t.toast.deleteFailed, fetchData]);
  
  const stats = useMemo(() => ({
    products: products.length,
    tasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    notifications: notifications.filter(n => !n.isRead).length,
  }), [products, tasks, notifications]);

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length, 
    [notifications]
  );
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div data-testid="dashboard-page" className="min-h-screen relative">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <header data-testid="dashboard-header" className="sticky top-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div data-testid="dashboard-logo-section" className="flex items-center gap-3">
            <h1 data-testid="dashboard-title" className="font-bold text-xl gradient-text">Oupweb</h1>
          </div>
          
          <div data-testid="dashboard-header-actions" className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full" 
                  data-testid="user-avatar-button"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-primary/30">
                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-amber-400 text-white font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {unreadCount > 0 && (
                    <span 
                      data-testid="notification-badge"
                      data-count={unreadCount}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold pulse-ring"
                    >
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56" 
                align="end"
                data-testid="user-dropdown-menu"
              >
                <DropdownMenuLabel className="font-normal">
                  <div data-testid="user-info" className="flex items-center gap-3">
                    <UserIcon size={40} />
                    <div>
                      <p data-testid="user-name" className="text-sm font-semibold">{user.name}</p>
                      <p data-testid="user-email" className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setProfileModalOpen(true)} 
                  className="cursor-pointer" 
                  data-testid="open-profile-button"
                >
                  {t.dashboard.profile}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-destructive cursor-pointer" 
                  data-testid="logout-button"
                >
                  {t.dashboard.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main data-testid="dashboard-main-content" className="relative z-10 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto pb-2 -mb-2">
            <TabsList 
              className="bg-muted/50 rounded-xl p-1 inline-flex w-full sm:w-auto" 
              data-testid="main-navigation-tabs"
              role="tablist"
            >
              <TabsTrigger 
                value="overview" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-overview"
                role="tab"
                aria-selected={activeTab === 'overview'}
              >
                <span className="hidden sm:inline">{t.dashboard.overview}</span>
                <span className="sm:hidden">🏠</span>
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-products"
                role="tab"
                aria-selected={activeTab === 'products'}
              >
                <span className="hidden sm:inline">{t.dashboard.products}</span>
                <span className="sm:hidden">📦</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-tasks"
                role="tab"
                aria-selected={activeTab === 'tasks'}
              >
                <span className="hidden sm:inline">{t.dashboard.tasks}</span>
                <span className="sm:hidden">✅</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-users"
                role="tab"
                aria-selected={activeTab === 'users'}
              >
                <span className="hidden sm:inline">{t.dashboard.users}</span>
                <span className="sm:hidden">👥</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-calendar"
                role="tab"
                aria-selected={activeTab === 'calendar'}
              >
                <span className="hidden sm:inline">{t.dashboard.calendar}</span>
                <span className="sm:hidden">📅</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white" 
                data-testid="tab-notifications"
                role="tab"
                aria-selected={activeTab === 'notifications'}
              >
                <span className="hidden sm:inline">{t.dashboard.notifications}</span>
                <span className="sm:hidden">🔔</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6 animate-page-enter" data-testid="tab-content-overview">
            {isLoading ? (
              <DashboardSkeleton />
            ) : (
              <div className="stagger-children">
                <StatsCards stats={stats} />
                
                <div data-testid="overview-grid" className="grid gap-6 lg:grid-cols-3">
                  <QuickActions 
                    onAddProduct={handleAddProduct}
                    onAddTask={handleAddTask}
                  />
                  <div className="lg:col-span-2">
                    <ChartsSection products={products} tasks={tasks} />
                  </div>
                </div>
                
                <div data-testid="overview-bottom-section" className="grid gap-6 lg:grid-cols-2">
                  <TasksList
                    tasks={tasks}
                    onStatusChange={handleTaskStatusChange}
                    onDelete={handleDeleteTask}
                    onAdd={handleAddTask}
                  />
                  <div className="space-y-6">
                    <NotificationsPanel
                      notifications={notifications}
                      onMarkAsRead={handleMarkNotificationRead}
                      onClearAll={handleClearNotifications}
                    />
                    <ActivityLog activities={activities} />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="products" className="animate-page-enter" data-testid="tab-content-products">
            <ProductsTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={handleAddProduct}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="tasks" className="animate-page-enter" data-testid="tab-content-tasks">
            <TasksList
              tasks={tasks}
              onStatusChange={handleTaskStatusChange}
              onDelete={handleDeleteTask}
              onAdd={handleAddTask}
            />
          </TabsContent>
          
          <TabsContent value="users" className="animate-page-enter" data-testid="tab-content-users">
            <UsersTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onAdd={handleAddUser}
              onToggleActive={handleToggleUserActive}
              onChangeRole={handleChangeUserRole}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-page-enter" data-testid="tab-content-calendar">
            <CalendarView
              events={events}
              tasks={tasks}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-page-enter" data-testid="tab-content-notifications">
            <NotificationsPanel
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationRead}
              onClearAll={handleClearNotifications}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <ProductFormModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onSubmit={handleSubmitProduct}
        product={editingProduct}
        isLoading={isSubmitting}
      />
      
      <TaskFormModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleSubmitTask}
        task={editingTask}
        isLoading={isSubmitting}
      />
      
      <UserFormModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        onSubmit={handleSubmitUser}
        user={editingUser}
        isLoading={isSubmitting}
      />
      
      <EventFormModal
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSubmit={handleSubmitEvent}
        event={editingEvent}
        selectedDate={selectedCalendarDate}
        isLoading={isSubmitting}
      />
      
      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onUpdate={handleUpdateUser}
        isLoading={isSubmitting}
      />
      
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent data-testid="delete-confirmation-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle data-testid="delete-dialog-title">{t.common.confirmDelete}</AlertDialogTitle>
            <AlertDialogDescription data-testid="delete-dialog-description">
              {t.common.confirmDeleteDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="delete-dialog-cancel">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="delete-dialog-confirm"
              data-item-type={itemToDelete?.type}
              data-item-id={itemToDelete?.id}
            >
              {t.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
