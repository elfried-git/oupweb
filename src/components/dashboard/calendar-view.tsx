'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
} from 'lucide-react';
import type { Event, Task } from '@/types';

interface CalendarViewProps {
  events: Event[];
  tasks: Task[];
  onAddEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  isLoading?: boolean;
}

const colorMap: Record<string, string> = {
  primary: 'bg-primary/80 text-primary-foreground',
  success: 'bg-emerald-500/80 text-white',
  warning: 'bg-amber-500/80 text-white',
  error: 'bg-red-500/80 text-white',
  info: 'bg-sky-500/80 text-white',
};

const taskPriorityColorMap: Record<string, string> = {
  high: 'bg-red-400/70 text-white',
  medium: 'bg-amber-400/70 text-white',
  low: 'bg-sky-400/70 text-white',
};

export function CalendarView({
  events,
  tasks,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  isLoading = false,
}: CalendarViewProps) {
  const { t } = useTranslation();
  const tc = t.calendar;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const weekdays = useMemo(() => [
    tc.weekdays.sunday,
    tc.weekdays.monday,
    tc.weekdays.tuesday,
    tc.weekdays.wednesday,
    tc.weekdays.thursday,
    tc.weekdays.friday,
    tc.weekdays.saturday,
  ], [tc.weekdays]);
  
  const months = useMemo(() => [
    tc.months.january,
    tc.months.february,
    tc.months.march,
    tc.months.april,
    tc.months.may,
    tc.months.june,
    tc.months.july,
    tc.months.august,
    tc.months.september,
    tc.months.october,
    tc.months.november,
    tc.months.december,
  ], [tc.months]);
  
  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, []);
  
  const calendarDays = useMemo(() => getDaysInMonth(currentDate), [currentDate, getDaysInMonth]);
  
  const getEventsForDate = useCallback((date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = new Date(event.startDate).toISOString().split('T')[0];
      const eventEnd = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventStart;
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  }, [events]);
  
  const getTasksForDate = useCallback((date: Date) => {
    if (!tasks) return [];
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDue = new Date(task.dueDate).toISOString().split('T')[0];
      return dateStr === taskDue;
    });
  }, [tasks]);
  
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }, []);
  
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);
  
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);
  
  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }, []);
  
  const isSelected = useCallback((date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  }, [selectedDate]);
  
  const currentMonthYear = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  }, [selectedDate, getEventsForDate]);
  
  const selectedDateTasks = useMemo(() => {
    if (!selectedDate) return [];
    return getTasksForDate(selectedDate);
  }, [selectedDate, getTasksForDate]);
  
  if (isLoading) {
    return (
      <div data-testid="calendar-loading" className="space-y-4">
        <div className="h-12 bg-muted animate-pulse rounded-xl" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div data-testid="calendar-view" className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <h2 data-testid="calendar-title" className="text-xl font-semibold">{tc.title}</h2>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            data-testid="calendar-today-button"
            className="rounded-xl"
          >
            {tc.today}
          </Button>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousMonth}
              data-testid="calendar-prev-month"
              aria-label={tc.previousMonth}
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span data-testid="calendar-month-year" className="text-sm font-medium min-w-[140px] text-center">
              {currentMonthYear}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextMonth}
              data-testid="calendar-next-month"
              aria-label={tc.nextMonth}
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={onAddEvent}
            data-testid="calendar-add-event-button"
            className="rounded-xl ml-auto sm:ml-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            {tc.addEvent}
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 lg:grid-cols-3">
        <Card data-testid="calendar-grid-card" className="lg:col-span-2 fun-card">
          <CardContent className="p-4">
            {/* Weekday headers */}
            <div data-testid="calendar-weekdays" className="grid grid-cols-7 gap-1 mb-2">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-xs font-medium text-muted-foreground py-2"
                  data-testid={`calendar-weekday-${index}`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div data-testid="calendar-days-grid" className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="h-24" />;
                }
                
                const dayEvents = getEventsForDate(day);
                const dayTasks = getTasksForDate(day);
                const todayClass = isToday(day) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : '';
                const selectedClass = isSelected(day) ? 'bg-primary/10' : 'hover:bg-muted/50';
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    data-testid={`calendar-day-${day.getDate()}`}
                    data-date={day.toISOString().split('T')[0]}
                    data-is-today={isToday(day)}
                    className={`h-24 p-1 rounded-xl text-left transition-colors ${todayClass} ${selectedClass}`}
                  >
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-medium ${isToday(day) ? 'text-primary' : ''}`}>
                        {day.getDate()}
                      </span>
                      
                      <div className="flex-1 overflow-hidden space-y-0.5 mt-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-[10px] px-1 py-0.5 rounded truncate ${colorMap[event.color] || colorMap.primary}`}
                            data-testid={`event-${event.id}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayTasks.slice(0, 2 - dayEvents.length).map(task => (
                          <div
                            key={task.id}
                            className={`text-[10px] px-1 py-0.5 rounded truncate ${taskPriorityColorMap[task.priority] || taskPriorityColorMap.medium}`}
                            data-testid={`task-${task.id}`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {(dayEvents.length + dayTasks.length > 2) && (
                          <span className="text-[10px] text-muted-foreground px-1">
                            +{dayEvents.length + dayTasks.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Selected date details */}
        <Card data-testid="calendar-details-card" className="fun-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>
                {selectedDate ? (
                  `${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                ) : (
                  tc.eventDetails
                )}
              </span>
              {selectedDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddEvent()}
                  data-testid="add-event-for-date"
                  className="h-8 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!selectedDate ? (
              <p className="text-sm text-muted-foreground">{tc.noEvents}</p>
            ) : selectedDateEvents.length === 0 && selectedDateTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">{tc.noEventsDay}</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    data-testid={`event-detail-${event.id}`}
                    className="p-3 rounded-xl bg-muted/50 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${colorMap[event.color]?.replace('text-', 'bg-').split(' ')[0] || 'bg-primary'}`} />
                        <span className="font-medium text-sm">{event.title}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditEvent(event)}
                          data-testid={`edit-event-${event.id}`}
                          className="h-7 px-2 rounded-lg text-xs"
                        >
                          {t.common.edit}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteEvent(event.id)}
                          data-testid={`delete-event-${event.id}`}
                          className="h-7 px-2 rounded-lg text-xs text-destructive hover:text-destructive"
                        >
                          {t.common.delete}
                        </Button>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {event.allDay ? (
                        <Badge variant="secondary" className="text-xs rounded-lg">{tc.allDay}</Badge>
                      ) : (
                        <>
                          <span>{new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                          {event.endDate && (
                            <>
                              <span>-</span>
                              <span>{new Date(event.endDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {selectedDateTasks.length > 0 && (
                  <>
                    <div className="text-xs font-medium text-muted-foreground mt-2">{tc.tasks}</div>
                    {selectedDateTasks.map(task => (
                      <div
                        key={task.id}
                        data-testid={`task-detail-${task.id}`}
                        className="p-3 rounded-xl bg-muted/50 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${taskPriorityColorMap[task.priority]?.replace('text-', 'bg-').split(' ')[0] || 'bg-amber-400'}`} />
                          <span className="font-medium text-sm">{task.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs rounded-lg">
                          {tc.taskStatus[task.status as keyof typeof tc.taskStatus] || task.status}
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
