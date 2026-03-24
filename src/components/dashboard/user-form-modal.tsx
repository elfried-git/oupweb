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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import type { User } from '@/stores/auth-store';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User> & { password?: string }) => void;
  user?: User | null;
  isLoading?: boolean;
}

const getInitialFormData = (user?: User | null) => ({
  name: user?.name || '',
  email: user?.email || '',
  password: '',
  role: user?.role || 'user',
  avatar: user?.avatar || '',
});

export function UserFormModal({ 
  open, 
  onClose, 
  onSubmit, 
  user,
  isLoading 
}: UserFormModalProps) {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState(getInitialFormData(user));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setFormData(getInitialFormData(user));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<User> & { password?: string } = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatar: formData.avatar || undefined,
    };
    if (formData.password) {
      data.password = formData.password;
    }
    onSubmit(data);
  };

  if (open && user) {
    const currentData = getInitialFormData(user);
    if (JSON.stringify(formData) !== JSON.stringify(currentData)) {
      setFormData(currentData);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[450px]" data-testid="user-form-modal">
        <DialogHeader>
          <DialogTitle className="gradient-text">
            {user ? t.users.edit : t.users.create}
          </DialogTitle>
          <DialogDescription>
            {user 
              ? `${t.users.edit} - ${user.name}`
              : t.users.create
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t.users.nameRequired}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
                data-testid="user-name-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {t.users.emailRequired}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
                required
                data-testid="user-email-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                {user ? t.users.password : t.users.passwordRequired}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="col-span-3"
                placeholder={user ? '••••••••' : undefined}
                required={!user}
                data-testid="user-password-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {t.users.roleRequired}
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="col-span-3" data-testid="user-role-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t.users.roleAdmin}</SelectItem>
                  <SelectItem value="user">{t.users.roleUser}</SelectItem>
                  <SelectItem value="guest">{t.users.roleGuest}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                {t.profile.avatar}
              </Label>
              <Input
                id="avatar"
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="col-span-3"
                placeholder="https://..."
                data-testid="user-avatar-input"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
              data-testid="cancel-user-button"
            >
              {t.common.cancel}
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              data-testid="submit-user-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                user ? t.common.update : t.common.create
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
