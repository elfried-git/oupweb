'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MoreHorizontal, 
  Search, 
  Filter,
  UserPlus,
  Edit3,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldOff,
  UserX,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';
import type { User } from '@/stores/auth-store';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onChangeRole: (id: string, role: string) => void;
  isLoading?: boolean;
}

const roleConfig = {
  admin: { color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' },
  user: { color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400' },
  guest: { color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
};

export const UsersTable = memo(function UsersTable({ 
  users, 
  onEdit, 
  onDelete, 
  onAdd,
  onToggleActive,
  onChangeRole,
  isLoading 
}: UsersTableProps) {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && u.isActive) ||
        (statusFilter === 'inactive' && !u.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleRoleFilterChange = useCallback((value: string) => {
    setRoleFilter(value);
  }, []);

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleEditClick = useCallback((user: User) => {
    onEdit(user);
  }, [onEdit]);

  const handleDeleteClick = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  const handleToggleActive = useCallback((id: string, isActive: boolean) => {
    onToggleActive(id, isActive);
  }, [onToggleActive]);

  const handleChangeRole = useCallback((id: string, role: string) => {
    onChangeRole(id, role);
  }, [onChangeRole]);

  const getRoleLabel = useCallback((role: string) => {
    switch (role) {
      case 'admin': return t.users.admin;
      case 'user': return t.users.user;
      case 'guest': return t.users.guest;
      default: return role;
    }
  }, [t.users]);

  if (isLoading) {
    return (
      <Card className="fun-card" data-testid="users-table-card">
        <CardContent className="py-12 text-center text-muted-foreground">
          {language === 'fr' ? 'Chargement...' : 'Loading...'}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fun-card" data-testid="users-table-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {t.users.title}
          </CardTitle>
          <Button 
            onClick={onAdd} 
            size="sm"
            data-testid="add-user-button"
            data-action="add-user"
            className="fun-button rounded-xl"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {t.users.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div data-testid="users-filters" className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.users.search}
              value={search}
              onChange={handleSearchChange}
              className="pl-9 h-10 rounded-xl"
              data-testid="user-search-input"
              data-filter-type="search"
              type="search"
              aria-label="Search users"
            />
          </div>
          <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
            <SelectTrigger 
              className="w-full sm:w-[150px] h-10 rounded-xl" 
              data-testid="role-filter-select"
              data-filter-type="role"
              aria-label="Filter by role"
            >
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-testid="role-filter-options">
              <SelectItem value="all" data-testid="role-option-all">
                {t.users.allRoles}
              </SelectItem>
              <SelectItem value="admin" data-testid="role-option-admin">
                {t.users.admin}
              </SelectItem>
              <SelectItem value="user" data-testid="role-option-user">
                {t.users.user}
              </SelectItem>
              <SelectItem value="guest" data-testid="role-option-guest">
                {t.users.guest}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger 
              className="w-full sm:w-[150px] h-10 rounded-xl" 
              data-testid="status-filter-select"
              data-filter-type="status"
              aria-label="Filter by status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-testid="status-filter-options">
              <SelectItem value="all" data-testid="status-option-all">
                {t.users.allStatus}
              </SelectItem>
              <SelectItem value="active" data-testid="status-option-active">
                {t.users.active}
              </SelectItem>
              <SelectItem value="inactive" data-testid="status-option-inactive">
                {t.users.inactive}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div data-testid="users-table-wrapper" className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <Table data-testid="users-table" aria-label="Users table">
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>{t.users.name}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t.users.email}</TableHead>
                  <TableHead>{t.users.role}</TableHead>
                  <TableHead className="hidden md:table-cell">{t.users.status}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t.users.lastLogin}</TableHead>
                  <TableHead className="w-[50px]">{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-testid="users-table-body">
                {filteredUsers.length === 0 ? (
                  <TableRow data-testid="users-empty-state">
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      {t.users.noUsers}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
                    <TableRow 
                      key={user.id} 
                      data-testid={`user-row-${user.id}`}
                      data-user-id={user.id}
                      data-user-name={user.name}
                      data-user-email={user.email}
                      data-user-role={user.role}
                      data-row-index={index}
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || ''} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-amber-400 text-white text-xs font-bold">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span data-testid={`user-name-${user.id}`} className="font-medium">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span data-testid={`user-email-${user.id}`} className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`rounded-lg text-xs ${roleConfig[user.role as keyof typeof roleConfig]?.color || 'bg-gray-100 text-gray-600'}`}
                          data-testid={`user-role-badge-${user.id}`}
                          data-role={user.role}
                        >
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {user.isActive ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span data-testid={`user-status-${user.id}`} className="text-sm text-emerald-600 dark:text-emerald-400">
                                {t.users.active}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span data-testid={`user-status-${user.id}`} className="text-sm text-red-600 dark:text-red-400">
                                {t.users.inactive}
                              </span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span data-testid={`user-lastlogin-${user.id}`} className="text-sm text-muted-foreground">
                          {user.lastLoginAt 
                            ? new Date(user.lastLoginAt).toLocaleDateString()
                            : t.users.never
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                              data-testid={`user-actions-button-${user.id}`}
                              data-user-id={user.id}
                              aria-label={`Actions for ${user.name}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end"
                            data-testid={`user-actions-menu-${user.id}`}
                          >
                            <DropdownMenuItem 
                              onClick={() => handleEditClick(user)}
                              data-testid={`edit-user-button-${user.id}`}
                              data-action="edit"
                              data-user-id={user.id}
                              className="cursor-pointer"
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              {t.common.edit}
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="cursor-pointer">
                                <Shield className="h-4 w-4 mr-2" />
                                {t.users.changeRole}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem 
                                  onClick={() => handleChangeRole(user.id, 'admin')}
                                  data-testid={`change-role-admin-${user.id}`}
                                  data-role="admin"
                                  className="cursor-pointer"
                                >
                                  {t.users.roleAdmin}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleChangeRole(user.id, 'user')}
                                  data-testid={`change-role-user-${user.id}`}
                                  data-role="user"
                                  className="cursor-pointer"
                                >
                                  {t.users.roleUser}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleChangeRole(user.id, 'guest')}
                                  data-testid={`change-role-guest-${user.id}`}
                                  data-role="guest"
                                  className="cursor-pointer"
                                >
                                  {t.users.roleGuest}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            {user.isActive ? (
                              <DropdownMenuItem 
                                onClick={() => handleToggleActive(user.id, false)}
                                data-testid={`deactivate-user-button-${user.id}`}
                                data-action="deactivate"
                                data-user-id={user.id}
                                className="cursor-pointer"
                              >
                                <UserX className="h-4 w-4 mr-2" />
                                {t.users.deactivate}
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleToggleActive(user.id, true)}
                                data-testid={`activate-user-button-${user.id}`}
                                data-action="activate"
                                data-user-id={user.id}
                                className="cursor-pointer"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {t.users.activate}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive cursor-pointer"
                              onClick={() => handleDeleteClick(user.id)}
                              data-testid={`delete-user-button-${user.id}`}
                              data-action="delete"
                              data-user-id={user.id}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t.common.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div data-testid="users-count" className="mt-4 text-sm text-muted-foreground">
          {t.users.showingOf
            .replace('{count}', filteredUsers.length.toString())
            .replace('{total}', users.length.toString())}
        </div>
      </CardContent>
    </Card>
  );
});
