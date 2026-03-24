'use client';

import { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PackageIcon, 
  TaskIcon, 
  BellIcon, 
  SparkleIcon,
  ChartIcon
} from '@/components/icons/custom-icons';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';

interface StatsCardsProps {
  stats: {
    products: number;
    tasks: number;
    completedTasks: number;
    notifications: number;
  };
}

export const StatsCards = memo(function StatsCards({ stats }: StatsCardsProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  const cards = useMemo(() => [
    {
      title: t.stats.products,
      value: stats.products,
      description: t.stats.productsDesc,
      Icon: PackageIcon,
      gradient: 'gradient-coral',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: t.stats.tasks,
      value: stats.tasks,
      description: t.stats.tasksDesc,
      Icon: TaskIcon,
      gradient: 'gradient-ocean',
      trend: '0%',
      trendUp: null,
    },
    {
      title: t.stats.completed,
      value: stats.completedTasks,
      description: t.stats.completedDesc,
      Icon: SparkleIcon,
      gradient: 'gradient-forest',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: t.stats.notifications,
      value: stats.notifications,
      description: t.stats.notificationsDesc,
      Icon: BellIcon,
      gradient: 'gradient-sunset',
      trend: '-3',
      trendUp: false,
    },
  ], [t.stats, stats]);

  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4" data-testid="stats-cards">
      {cards.map((card) => (
        <Card 
          key={card.title} 
          className="fun-card relative overflow-hidden group"
          data-testid={`stat-${card.title.toLowerCase()}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              {card.title}
            </CardTitle>
            <div className={`icon-container ${card.gradient} shadow-lg`}>
              <card.Icon size={20} />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl sm:text-3xl font-bold tabular-nums" data-testid={`stat-value-${card.title.toLowerCase()}`}>
              {card.value}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                card.trendUp === true ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                card.trendUp === false ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {card.trend}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline">{t.stats.fromLastMonth}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
