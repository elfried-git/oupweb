'use client';

import { useState, memo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PackageIcon, 
  TaskIcon, 
  ExportIcon, 
  ReportIcon,
  SparkleIcon
} from '@/components/icons/custom-icons';
import { useTranslation } from '@/hooks/use-translation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface QuickActionsProps {
  onAddProduct: () => void;
  onAddTask: () => void;
}

export const QuickActions = memo(function QuickActions({ onAddProduct, onAddTask }: QuickActionsProps) {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportData = useCallback(async () => {
    setIsExporting(true);
    try {
      const [productsRes, tasksRes, notificationsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/tasks'),
        fetch('/api/notifications'),
      ]);

      const data = {
        exportDate: new Date().toISOString(),
        products: productsRes.ok ? await productsRes.json() : [],
        tasks: tasksRes.ok ? await tasksRes.json() : [],
        notifications: notificationsRes.ok ? await notificationsRes.json() : [],
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oupweb-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(t.toast.dataExported);
    } catch {
      toast.error(t.toast.exportFailed);
    } finally {
      setIsExporting(false);
    }
  }, [t.toast]);

  const handleGenerateReport = useCallback(async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/report?lang=fr');
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oupweb-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(t.toast.reportGenerated);
    } catch {
      toast.error(t.toast.reportFailed);
    } finally {
      setIsGenerating(false);
    }
  }, [t.toast]);

  const actions = [
    {
      label: t.product.add,
      Icon: PackageIcon,
      onClick: onAddProduct,
      gradient: 'gradient-coral',
      loading: false,
      testid: 'quick-action-add-product',
      action: 'add-product',
    },
    {
      label: t.task.add,
      Icon: TaskIcon,
      onClick: onAddTask,
      gradient: 'gradient-ocean',
      loading: false,
      testid: 'quick-action-add-task',
      action: 'add-task',
    },
    {
      label: t.quickActions.export,
      Icon: ExportIcon,
      onClick: handleExportData,
      gradient: 'gradient-forest',
      loading: isExporting,
      testid: 'quick-action-export',
      action: 'export-data',
    },
    {
      label: t.quickActions.report,
      Icon: ReportIcon,
      onClick: handleGenerateReport,
      gradient: 'gradient-sunset',
      loading: isGenerating,
      testid: 'quick-action-report',
      action: 'generate-report',
    },
  ];

  return (
    <Card 
      className="fun-card" 
      data-testid="quick-actions-card"
      role="region"
      aria-label="Quick actions"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <SparkleIcon size={24} />
          <span data-testid="quick-actions-title">{t.quickActions.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          data-testid="quick-actions-grid" 
          className="grid grid-cols-2 gap-3"
          role="group"
          aria-label="Action buttons"
        >
          {actions.map((action, index) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 border-2 hover:border-primary/30 transition-all group bg-background/50"
              onClick={action.onClick}
              disabled={action.loading}
              data-testid={action.testid}
              data-action={action.action}
              data-loading={action.loading}
              data-index={index}
              aria-label={action.label}
            >
              <div 
                className={`p-2 rounded-xl ${action.gradient} shadow-md group-hover:scale-110 transition-transform`}
                data-testid={`${action.testid}-icon`}
              >
                {action.loading ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <action.Icon size={24} />
                )}
              </div>
              <span 
                className="text-sm font-medium"
                data-testid={`${action.testid}-label`}
              >
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
