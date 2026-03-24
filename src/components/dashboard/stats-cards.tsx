'use client';

import { useState, memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  PackageIcon, 
  TaskIcon, 
  BellIcon, 
  SparkleIcon,
  Settings
} from '@/components/icons/custom-icons';
import { useTranslation } from '@/hooks/use-translation';
import { useSettingsStore, type StatTrend } from '@/stores/settings-store';
import { Settings as SettingsIcon } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    products: number;
    tasks: number;
    completedTasks: number;
    notifications: number;
  };
}

export const StatsCards = memo(function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useTranslation();
  const { statTrends, updateStatTrend } = useSettingsStore();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTrend, setEditingTrend] = useState<keyof StatTrend | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [tempIsUp, setTempIsUp] = useState<boolean | null>(null);

  const handleOpenEdit = (key: keyof StatTrend) => {
    setEditingTrend(key);
    setTempValue(statTrends[key].value);
    setTempIsUp(statTrends[key].isUp);
    setEditModalOpen(true);
  };

  const handleSaveTrend = () => {
    if (editingTrend) {
      updateStatTrend(editingTrend, { value: tempValue, isUp: tempIsUp });
    }
    setEditModalOpen(false);
    setEditingTrend(null);
  };

  const cards = useMemo(() => [
    {
      key: 'products' as keyof StatTrend,
      title: t.stats.products,
      value: stats.products,
      description: t.stats.productsDesc,
      Icon: PackageIcon,
      gradient: 'gradient-coral',
      trend: statTrends.products,
    },
    {
      key: 'tasks' as keyof StatTrend,
      title: t.stats.tasks,
      value: stats.tasks,
      description: t.stats.tasksDesc,
      Icon: TaskIcon,
      gradient: 'gradient-ocean',
      trend: statTrends.tasks,
    },
    {
      key: 'completed' as keyof StatTrend,
      title: t.stats.completed,
      value: stats.completedTasks,
      description: t.stats.completedDesc,
      Icon: SparkleIcon,
      gradient: 'gradient-forest',
      trend: statTrends.completed,
    },
    {
      key: 'notifications' as keyof StatTrend,
      title: t.stats.notifications,
      value: stats.notifications,
      description: t.stats.notificationsDesc,
      Icon: BellIcon,
      gradient: 'gradient-sunset',
      trend: statTrends.notifications,
    },
  ], [t.stats, stats, statTrends]);

  return (
    <>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4" data-testid="stats-cards">
        {cards.map((card) => (
          <Card 
            key={card.key} 
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
                <button
                  onClick={() => handleOpenEdit(card.key)}
                  className="text-xs font-medium px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                    card.trend.isUp === true ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    card.trend.isUp === false ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }"
                  data-testid={`trend-edit-${card.key}`}
                >
                  {card.trend.value}
                </button>
                <span className="text-xs text-muted-foreground hidden sm:inline">{t.stats.fromLastMonth}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[400px]" data-testid="trend-edit-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              {t.stats.editTrend || 'Modifier la tendance'}
            </DialogTitle>
            <DialogDescription>
              {t.stats.editTrendDesc || 'Modifiez la valeur et la direction de la tendance'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="trend-value">{t.stats.trendValue || 'Valeur'}</Label>
              <Input
                id="trend-value"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="+12%, -5, 0%..."
                data-testid="trend-value-input"
              />
            </div>

            <div className="space-y-2">
              <Label>{t.stats.trendDirection || 'Direction'}</Label>
              <Select 
                value={tempIsUp === null ? 'neutral' : tempIsUp ? 'up' : 'down'} 
                onValueChange={(v) => setTempIsUp(v === 'neutral' ? null : v === 'up')}
              >
                <SelectTrigger data-testid="trend-direction-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up">
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-500">↑</span> {t.stats.trendUp || 'En hausse'}
                    </span>
                  </SelectItem>
                  <SelectItem value="down">
                    <span className="flex items-center gap-2">
                      <span className="text-red-500">↓</span> {t.stats.trendDown || 'En baisse'}
                    </span>
                  </SelectItem>
                  <SelectItem value="neutral">
                    <span className="flex items-center gap-2">
                      <span className="text-slate-400">→</span> {t.stats.trendNeutral || 'Stable'}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              data-testid="cancel-trend-button"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="button"
              onClick={handleSaveTrend}
              data-testid="save-trend-button"
              className="fun-button"
            >
              {t.common.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});
