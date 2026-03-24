'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { TaskIcon } from '@/components/icons/custom-icons';
import { useLanguageStore } from '@/stores/language-store';
import { translations, translateTask } from '@/locales/translations';
import type { Task } from '@/types';

interface TasksListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: string) => void;
  onDelete: (taskId: string) => void;
  onAdd: () => void;
}

export const TasksList = memo(function TasksList({ 
  tasks, 
  onStatusChange, 
  onAdd 
}: TasksListProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = useMemo(() => 
    tasks.filter(task => filter === 'all' || task.status === filter),
    [tasks, filter]
  );

  const completedCount = useMemo(() => 
    tasks.filter(t => t.status === 'done').length, 
    [tasks]
  );
  
  const progress = useMemo(() => 
    tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0,
    [tasks, completedCount]
  );

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return { text: t.task.overdue, color: 'text-red-500' };
    if (days === 0) return { text: t.task.today, color: 'text-amber-500' };
    if (days === 1) return { text: t.task.tomorrow, color: 'text-sky-500' };
    return { text: date.toLocaleDateString(), color: 'text-muted-foreground' };
  }, [t.task]);

  const statusConfig = useMemo(() => ({
    todo: { label: t.task.todo, className: 'status-todo' },
    in_progress: { label: t.task.inProgress, className: 'status-progress' },
    done: { label: t.task.done, className: 'status-done' },
  }), [t.task]);

  const priorityConfig = useMemo(() => ({
    low: { label: t.task.low, className: 'priority-low' },
    medium: { label: t.task.medium, className: 'priority-medium' },
    high: { label: t.task.high, className: 'priority-high' },
  }), [t.task]);

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const handleStatusChange = useCallback((taskId: string, status: string) => {
    onStatusChange(taskId, status);
  }, [onStatusChange]);

  const handleCheckboxChange = useCallback((taskId: string, checked: boolean) => {
    onStatusChange(taskId, checked ? 'done' : 'todo');
  }, [onStatusChange]);

  const getTranslatedTask = useCallback((task: Task) => {
    return translateTask(task, language);
  }, [language]);

  return (
    <Card 
      className="fun-card" 
      data-testid="tasks-list-card"
      role="region"
      aria-label="Tasks list"
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-3">
            <TaskIcon size={28} />
            <span data-testid="tasks-list-title">{t.task.title}</span>
          </CardTitle>
          <Button 
            onClick={onAdd} 
            size="sm"
            data-testid="add-task-button"
            data-action="add-task"
            className="fun-button rounded-xl"
            aria-label="Add new task"
          >
            + {t.task.add}
          </Button>
        </div>
        
        <div data-testid="tasks-progress-section" className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">{t.task.progress}</span>
            <span data-testid="tasks-completion-count" className="font-semibold tabular-nums">
              {completedCount}/{tasks.length}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-2.5 rounded-full" 
            data-testid="tasks-progress-bar"
            data-progress={Math.round(progress)}
            aria-label={`Tasks progress: ${Math.round(progress)}%`}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div data-testid="tasks-filter-section" className="flex gap-2 mb-4">
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger 
              className="w-[180px] h-9 rounded-xl" 
              data-testid="tasks-filter-select"
              data-filter-type="status"
              aria-label="Filter tasks by status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-testid="tasks-filter-options">
              <SelectItem 
                value="all" 
                data-testid="filter-option-all"
                data-status="all"
              >
                {t.task.allTasks}
              </SelectItem>
              <SelectItem 
                value="todo" 
                data-testid="filter-option-todo"
                data-status="todo"
              >
                {t.task.todo}
              </SelectItem>
              <SelectItem 
                value="in_progress" 
                data-testid="filter-option-in-progress"
                data-status="in_progress"
              >
                {t.task.inProgress}
              </SelectItem>
              <SelectItem 
                value="done" 
                data-testid="filter-option-done"
                data-status="done"
              >
                {t.task.done}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div 
          data-testid="tasks-list-container" 
          className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"
          role="list"
          aria-label="Tasks"
        >
          {filteredTasks.length === 0 ? (
            <div 
              data-testid="tasks-empty-state" 
              className="text-center py-8 text-muted-foreground"
              role="status"
            >
              {t.task.noTasks}
            </div>
          ) : (
            filteredTasks.map((task, index) => {
              const dueDate = formatDate(task.dueDate);
              const translatedTask = getTranslatedTask(task);
              return (
                <div
                  key={task.id}
                  data-testid={`task-item-${task.id}`}
                  data-task-id={task.id}
                  data-task-title={translatedTask.title}
                  data-task-status={task.status}
                  data-task-priority={task.priority}
                  data-row-index={index}
                  className="flex items-start gap-3 p-3 rounded-xl border bg-background/50 hover:bg-muted/30 transition-colors group"
                  role="listitem"
                >
                  <Checkbox
                    checked={task.status === 'done'}
                    onCheckedChange={(checked) => handleCheckboxChange(task.id, checked as boolean)}
                    data-testid={`task-checkbox-${task.id}`}
                    data-task-id={task.id}
                    aria-label={`Mark ${translatedTask.title} as ${task.status === 'done' ? 'incomplete' : 'complete'}`}
                    className="mt-0.5"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span 
                        data-testid={`task-title-${task.id}`}
                        className={`font-medium truncate ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {translatedTask.title}
                      </span>
                      <span 
                        data-testid={`task-priority-${task.id}`}
                        data-priority={task.priority}
                        className={`text-xs font-medium ${priorityConfig[task.priority].className}`}
                      >
                        ● {priorityConfig[task.priority].label}
                      </span>
                    </div>
                    
                    <div data-testid={`task-meta-${task.id}`} className="flex items-center gap-3 mt-1.5 text-xs">
                      <Badge 
                        className={`rounded-lg text-xs ${statusConfig[task.status].className}`}
                        data-testid={`task-status-badge-${task.id}`}
                        data-status={task.status}
                      >
                        {statusConfig[task.status].label}
                      </Badge>
                      
                      {dueDate && (
                        <span 
                          data-testid={`task-due-date-${task.id}`}
                          className={`flex items-center gap-1 ${dueDate.color}`}
                        >
                          <Calendar className="h-3 w-3" />
                          {dueDate.text}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Select
                    value={task.status}
                    onValueChange={(value) => handleStatusChange(task.id, value)}
                  >
                    <SelectTrigger 
                      className="w-[100px] h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" 
                      data-testid={`task-status-select-${task.id}`}
                      data-task-id={task.id}
                      aria-label={`Change status for ${translatedTask.title}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem 
                        value="todo"
                        data-testid={`status-option-todo-${task.id}`}
                        data-status="todo"
                      >
                        {t.task.todo}
                      </SelectItem>
                      <SelectItem 
                        value="in_progress"
                        data-testid={`status-option-in-progress-${task.id}`}
                        data-status="in_progress"
                      >
                        {t.task.inProgress}
                      </SelectItem>
                      <SelectItem 
                        value="done"
                        data-testid={`status-option-done-${task.id}`}
                        data-status="done"
                      >
                        {t.task.done}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
});
