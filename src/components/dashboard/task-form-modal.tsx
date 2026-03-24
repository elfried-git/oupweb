'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';
import type { Task } from '@/types';

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Task>) => void;
  task?: Task | null;
  isLoading?: boolean;
}

const getInitialFormData = (task?: Task | null) => ({
  title: task?.title || '',
  description: task?.description || '',
  status: task?.status || 'todo',
  priority: task?.priority || 'medium',
  dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
});

export function TaskFormModal({ 
  open, 
  onClose, 
  onSubmit, 
  task,
  isLoading 
}: TaskFormModalProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [formData, setFormData] = useState(() => getInitialFormData(task));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setFormData(getInitialFormData(task));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (open && task) {
    const currentData = getInitialFormData(task);
    if (JSON.stringify(formData) !== JSON.stringify(currentData)) {
      setFormData(currentData);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="task-form-modal">
        <DialogHeader>
          <DialogTitle className="gradient-text">
            {task ? t.task.edit : t.task.create}
          </DialogTitle>
          <DialogDescription>
            {task 
              ? t.task.edit + ' - ' + task.title
              : t.task.create}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                {t.task.titleRequired}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
                required
                data-testid="task-title-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {t.task.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
                data-testid="task-description-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t.task.status}
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3" data-testid="task-status-select">
                  <SelectValue placeholder={t.task.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">{t.task.todo}</SelectItem>
                  <SelectItem value="in_progress">{t.task.inProgress}</SelectItem>
                  <SelectItem value="done">{t.task.done}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                {t.task.priority}
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="col-span-3" data-testid="task-priority-select">
                  <SelectValue placeholder={t.task.priority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t.task.low}</SelectItem>
                  <SelectItem value="medium">{t.task.medium}</SelectItem>
                  <SelectItem value="high">{t.task.high}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                {t.task.dueDate}
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="col-span-3"
                data-testid="task-duedate-input"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
              data-testid="cancel-task-button"
            >
              {t.common.cancel}
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              data-testid="submit-task-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                task ? t.common.update : t.common.create
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
