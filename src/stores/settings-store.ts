'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StatTrend {
  products: { value: string; isUp: boolean | null };
  tasks: { value: string; isUp: boolean | null };
  completed: { value: string; isUp: boolean | null };
  notifications: { value: string; isUp: boolean | null };
}

interface SettingsState {
  statTrends: StatTrend;
  updateStatTrend: (key: keyof StatTrend, value: { value: string; isUp: boolean | null }) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      statTrends: {
        products: { value: '+12%', isUp: true },
        tasks: { value: '0%', isUp: null },
        completed: { value: '+8%', isUp: true },
        notifications: { value: '-3', isUp: false },
      },
      updateStatTrend: (key, value) =>
        set((state) => ({
          statTrends: { ...state.statTrends, [key]: value },
        })),
      companyName: 'Oupweb',
      setCompanyName: (name) => set({ companyName: name }),
    }),
    {
      name: 'settings-storage',
    }
  )
);
