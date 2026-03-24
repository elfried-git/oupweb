'use client';

import { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const StatsCardSkeleton = memo(function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
});

export const ProductsTableSkeleton = memo(function ProductsTableSkeleton() {
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-background/50">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-16 ml-auto" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
});

export const TasksListSkeleton = memo(function TasksListSkeleton() {
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>
      <Skeleton className="h-2 w-full mb-4 rounded-full" />
      <Skeleton className="h-9 w-36 mb-4" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex-1">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
});

export const NotificationsSkeleton = memo(function NotificationsSkeleton() {
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-3 rounded-lg bg-background/50">
            <div className="flex gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export const ChartsSkeleton = memo(function ChartsSkeleton() {
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <Skeleton className="h-6 w-24 mb-4" />
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-2 flex-1" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
});

export const DashboardSkeleton = memo(function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Quick Actions & Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/50 p-4">
          <Skeleton className="h-6 w-28 mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <ChartsSkeleton />
        </div>
      </div>
      
      {/* Tasks & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TasksListSkeleton />
        <div className="space-y-6">
          <NotificationsSkeleton />
          <div className="rounded-xl border bg-card/50 p-4">
            <Skeleton className="h-6 w-28 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
