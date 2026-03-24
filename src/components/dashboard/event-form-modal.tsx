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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import type { Event } from '@/types';

interface EventFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Event>) => void;
  event?: Event | null;
  selectedDate?: Date | null;
  isLoading?: boolean;
}

const getInitialFormData = (event?: Event | null, selectedDate?: Date | null) => {
  let startDate = '';
  let startTime = '09:00';
  let endDate = '';
  let endTime = '10:00';

  if (event) {
    const start = new Date(event.startDate);
    startDate = start.toISOString().split('T')[0];
    startTime = start.toTimeString().slice(0, 5);
    
    if (event.endDate) {
      const end = new Date(event.endDate);
      endDate = end.toISOString().split('T')[0];
      endTime = end.toTimeString().slice(0, 5);
    } else {
      endDate = startDate;
    }
  } else if (selectedDate) {
    startDate = selectedDate.toISOString().split('T')[0];
    endDate = startDate;
  } else {
    const today = new Date();
    startDate = today.toISOString().split('T')[0];
    endDate = startDate;
  }

  return {
    title: event?.title || '',
    description: event?.description || '',
    startDate,
    startTime,
    endDate,
    endTime,
    allDay: event?.allDay ?? false,
    color: event?.color || 'primary',
  };
};

export function EventFormModal({
  open,
  onClose,
  onSubmit,
  event,
  selectedDate,
  isLoading,
}: EventFormModalProps) {
  const { t } = useTranslation();
  const tc = t.calendar;

  const [formData, setFormData] = useState(() => getInitialFormData(event, selectedDate));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setFormData(getInitialFormData(event, selectedDate));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDate = formData.allDay
      ? `${formData.startDate}T00:00:00`
      : `${formData.startDate}T${formData.startTime}:00`;
    
    const endDate = formData.endDate
      ? formData.allDay
        ? `${formData.endDate}T23:59:59`
        : `${formData.endDate}T${formData.endTime}:00`
      : null;

    onSubmit({
      title: formData.title,
      description: formData.description || null,
      startDate,
      endDate,
      allDay: formData.allDay,
      color: formData.color,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="event-form-modal">
        <DialogHeader>
          <DialogTitle className="gradient-text">
            {event ? tc.editEvent : tc.addEvent}
          </DialogTitle>
          <DialogDescription>
            {event ? tc.editEvent : tc.addEvent}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                {tc.titleRequired}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
                placeholder={tc.eventTitlePlaceholder}
                required
                data-testid="event-title-input"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {tc.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder={tc.descriptionPlaceholder}
                rows={3}
                data-testid="event-description-input"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                {tc.startDate}
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  data-testid="event-startdate-input"
                  className="flex-1"
                />
                {!formData.allDay && (
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    data-testid="event-starttime-input"
                    className="w-28"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                {tc.endDate}
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  data-testid="event-enddate-input"
                  className="flex-1"
                />
                {!formData.allDay && (
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    data-testid="event-endtime-input"
                    className="w-28"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="allDay" className="text-right">
                {tc.allDay}
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="allDay"
                  checked={formData.allDay}
                  onCheckedChange={(checked) => setFormData({ ...formData, allDay: checked as boolean })}
                  data-testid="event-allday-checkbox"
                />
                <Label htmlFor="allDay" className="cursor-pointer text-sm">
                  {tc.allDay}
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                {tc.color}
              </Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger className="col-span-3" data-testid="event-color-select">
                  <SelectValue placeholder={tc.color} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {tc.colorPrimary}
                    </div>
                  </SelectItem>
                  <SelectItem value="success">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      {tc.colorSuccess}
                    </div>
                  </SelectItem>
                  <SelectItem value="warning">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      {tc.colorWarning}
                    </div>
                  </SelectItem>
                  <SelectItem value="error">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      {tc.colorError}
                    </div>
                  </SelectItem>
                  <SelectItem value="info">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-sky-500" />
                      {tc.colorInfo}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              data-testid="cancel-event-button"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              data-testid="submit-event-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                event ? t.common.update : t.common.create
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
