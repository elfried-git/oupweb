'use client';

import { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, LogIn, LogOut, Edit, Plus, Trash2, Activity } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';
import type { ActivityLog } from '@/types';

interface ActivityLogProps {
  activities: ActivityLog[];
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  LOGIN: LogIn,
  LOGOUT: LogOut,
  CREATE: Plus,
  UPDATE: Edit,
  DELETE: Trash2,
  DEFAULT: Activity,
};

const actionColors: Record<string, string> = {
  LOGIN: 'text-emerald-500 bg-emerald-500/10',
  LOGOUT: 'text-slate-500 bg-slate-500/10',
  CREATE: 'text-blue-500 bg-blue-500/10',
  UPDATE: 'text-amber-500 bg-amber-500/10',
  DELETE: 'text-red-500 bg-red-500/10',
};

export const ActivityLog = memo(function ActivityLog({ activities }: ActivityLogProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  const translatedActivities = useMemo(() => 
    activities.map(activity => ({
      ...activity,
      translatedAction: t.activityActions[activity.action as keyof typeof t.activityActions] || activity.action,
    })),
    [activities, t.activityActions]
  );

  return (
    <Card 
      className="fun-card" 
      data-testid="activity-log"
      role="region"
      aria-label="Activity log"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span data-testid="activity-log-title">{t.activity.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] custom-scrollbar">
          {activities.length === 0 ? (
            <div 
              data-testid="activity-empty-state"
              className="text-center py-8 text-muted-foreground"
              role="status"
            >
              {t.activity.noActivity}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
              
              <div className="space-y-4">
                {translatedActivities.map((activity, index) => {
                  const Icon = actionIcons[activity.action] || actionIcons.DEFAULT;
                  const colorClass = actionColors[activity.action] || 'text-muted-foreground bg-muted';
                  
                  return (
                    <div 
                      key={activity.id} 
                      className="relative flex gap-4 pl-2"
                      data-testid={`activity-item-${index}`}
                      data-activity-action={activity.action}
                    >
                      <div className={`relative z-10 p-1.5 rounded-full ${colorClass} ring-2 ring-background`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0 pb-4">
                        <p className="text-sm font-medium" data-testid={`activity-action-${index}`}>
                          {activity.translatedAction}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activity.details}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                          {activity.user && (
                            <>
                              <User className="h-3 w-3" />
                              <span>{activity.user.name}</span>
                              <span className="text-muted-foreground/50">•</span>
                            </>
                          )}
                          <span>
                            {new Date(activity.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
});
