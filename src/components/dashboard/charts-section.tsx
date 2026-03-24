'use client';

import { memo, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { translations, translateProduct } from '@/locales/translations';
import type { Product, Task } from '@/types';

interface ChartsSectionProps {
  products: Product[];
  tasks: Task[];
}

export const ChartsSection = memo(function ChartsSection({ products, tasks }: ChartsSectionProps) {
  const { language } = useLanguageStore();
  const t = translations[language];

  const getTranslatedCategory = useCallback((category: string) => {
    return translateProduct({ name: '', description: '', category }, language).category;
  }, [language]);

  const categoryCount = useMemo(() => 
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    [products]
  );

  const categories = useMemo(() => 
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1]),
    [categoryCount]
  );

  const taskStatus = useMemo(() => ({
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }), [tasks]);

  const totalTasks = tasks.length || 1;

  const priorityCount = useMemo(() => ({
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  }), [tasks]);

  return (
    <Card 
      className="fun-card" 
      data-testid="charts-section"
      role="region"
      aria-label="Statistics charts"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span data-testid="charts-title">{t.charts.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div data-testid="category-distribution" className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <PieChart className="h-4 w-4 text-muted-foreground" />
            <span data-testid="products-by-category-title">{t.charts.productsByCategory}</span>
          </h4>
          <div className="space-y-2">
            {categories.length > 0 ? categories.map(([category, count]) => {
              const percentage = (count / products.length) * 100;
              const translatedCategory = getTranslatedCategory(category);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{translatedCategory}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            }) : (
              <p data-testid="no-products-message" className="text-sm text-muted-foreground">
                {t.charts.noProducts}
              </p>
            )}
          </div>
        </div>

        <div data-testid="task-status-section" className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span data-testid="task-status-title">{t.charts.taskStatus}</span>
          </h4>
          <div data-testid="task-status-cards" className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 rounded-lg bg-slate-500/10" data-testid="status-card-todo">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">{taskStatus.todo}</div>
              <div className="text-xs text-muted-foreground">{t.task.todo}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-500/10" data-testid="status-card-progress">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{taskStatus.inProgress}</div>
              <div className="text-xs text-muted-foreground">{t.task.inProgress}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-500/10" data-testid="status-card-done">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{taskStatus.done}</div>
              <div className="text-xs text-muted-foreground">{t.task.done}</div>
            </div>
          </div>
        </div>

        <div data-testid="priority-distribution" className="space-y-3">
          <h4 className="text-sm font-medium">
            <span data-testid="priority-title">{t.charts.priorityDistribution}</span>
          </h4>
          <div className="flex gap-1 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-red-500 transition-all" 
              style={{ width: `${(priorityCount.high / totalTasks) * 100}%` }}
              title={`High: ${priorityCount.high}`}
            />
            <div 
              className="bg-amber-500 transition-all" 
              style={{ width: `${(priorityCount.medium / totalTasks) * 100}%` }}
              title={`Medium: ${priorityCount.medium}`}
            />
            <div 
              className="bg-slate-400 transition-all" 
              style={{ width: `${(priorityCount.low / totalTasks) * 100}%` }}
              title={`Low: ${priorityCount.low}`}
            />
          </div>
          <div data-testid="priority-legend" className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              {t.task.high}: {priorityCount.high}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              {t.task.medium}: {priorityCount.medium}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              {t.task.low}: {priorityCount.low}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
