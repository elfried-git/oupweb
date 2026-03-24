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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Camera, User as UserIcon, Mail, Globe, Shield } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';
import type { User } from '@/stores/auth-store';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (user: User) => void;
  isLoading?: boolean;
}

export function ProfileModal({ open, onClose, user, onUpdate, isLoading }: ProfileModalProps) {
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          ...formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data.user);
        onClose();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (url: string) => {
    setFormData({ ...formData, avatar: url });
  };

  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" data-testid="profile-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            {t.profile.title}
          </DialogTitle>
          <DialogDescription>
            {t.profile.edit}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={formData.avatar || user.avatar || ''} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                    {formData.name?.charAt(0) || user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border shadow-sm">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex gap-2">
                {[user.name, 'happy', 'cool', 'pro'].map((seed) => (
                  <Button
                    key={seed}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => handleAvatarChange(generateAvatarUrl(seed))}
                    data-testid={`avatar-preset-${seed}`}
                  >
                    <img 
                      src={generateAvatarUrl(seed)} 
                      alt={seed}
                      className="w-8 h-8 rounded-full"
                    />
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profile-name" className="text-right flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  {t.profile.name}
                </Label>
                <Input
                  id="profile-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                  required
                  data-testid="profile-name-input"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profile-email" className="text-right flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t.profile.email}
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="col-span-3"
                  required
                  data-testid="profile-email-input"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profile-avatar" className="text-right flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  {t.profile.avatar}
                </Label>
                <Input
                  id="profile-avatar"
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="col-span-3"
                  placeholder="https://..."
                  data-testid="profile-avatar-input"
                />
              </div>

              <Separator />

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t.profile.language}
                </Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as 'fr' | 'en')}>
                  <SelectTrigger className="col-span-3" data-testid="profile-language-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">
                      <span className="flex items-center gap-2">
                        <span>🇫🇷</span> {t.profile.french}
                      </span>
                    </SelectItem>
                    <SelectItem value="en">
                      <span className="flex items-center gap-2">
                        <span>🇬🇧</span> {t.profile.english}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {t.profile.role}
                </Label>
                <div className="col-span-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting || isLoading}
              data-testid="cancel-profile-button"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              data-testid="submit-profile-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                t.common.save
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
