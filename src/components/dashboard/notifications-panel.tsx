'use client';

import { memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { translateNotification } from '@/locales/translations';
import type { Notification } from '@/types';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const typeConfig = {
  info: { 
    icon: Info, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  success: { 
    icon: CheckCircle, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  warning: { 
    icon: AlertTriangle, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  error: { 
    icon: XCircle, 
    color: 'text-red-500', 
    bg: 'bg-red-500/10',
    border: 'border-red-500/20'
  },
};

export const NotificationsPanel = memo(function NotificationsPanel({ 
  notifications, 
  onMarkAsRead, 
  onClearAll 
}: NotificationsPanelProps) {
  const { t } = useTranslation();
  
  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  const handleMarkAsRead = useCallback((id: string) => {
    onMarkAsRead(id);
  }, [onMarkAsRead]);

  const getTranslatedNotification = useCallback((notification: Notification) => {
    return translateNotification(notification);
  }, []);

  return (
    <Card 
      className="fun-card" 
      data-testid="notifications-panel"
      role="region"
      aria-label="Notifications panel"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <Bell className="h-4 w-4 text-white" />
            </div>
            <span data-testid="notifications-title">{t.notification.title}</span>
            {unreadCount > 0 && (
              <span 
                data-testid="notification-badge"
                data-count={unreadCount}
                className="ml-1 px-2 py-0.5 text-xs bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-full animate-pulse"
              >
                {unreadCount}
              </span>
            )}
          </CardTitle>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              data-testid="clear-notifications-button"
              aria-label="Clear all notifications"
            >
              {t.notification.clearAll}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] custom-scrollbar">
          {notifications.length === 0 ? (
            <div 
              data-testid="notifications-empty-state"
              className="text-center py-8 text-muted-foreground"
              role="status"
            >
              {t.notification.noNotifications}
            </div>
          ) : (
            <div data-testid="notifications-list" className="space-y-2">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type];
                const translated = getTranslatedNotification(notification);
                return (
                  <div
                    key={notification.id}
                    className={`relative p-3 rounded-xl border ${config.border} ${
                      notification.isRead ? 'bg-background/30' : config.bg
                    } transition-all hover:shadow-md`}
                    data-testid={`notification-item-${notification.id}`}
                    data-notification-id={notification.id}
                    data-notification-type={notification.type}
                    data-is-read={notification.isRead}
                  >
                    <div className="flex gap-3">
                      <config.icon className={`h-5 w-5 ${config.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p 
                            data-testid={`notification-title-${notification.id}`}
                            className={`text-sm font-medium ${notification.isRead ? 'text-muted-foreground' : ''}`}
                          >
                            {translated.title}
                          </p>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleMarkAsRead(notification.id)}
                              data-testid={`mark-read-button-${notification.id}`}
                              aria-label="Mark as read"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <p 
                          data-testid={`notification-message-${notification.id}`}
                          className="text-xs text-muted-foreground mt-1"
                        >
                          {translated.message}
                        </p>
                        <p 
                          data-testid={`notification-date-${notification.id}`}
                          className="text-xs text-muted-foreground/60 mt-2"
                        >
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
});
