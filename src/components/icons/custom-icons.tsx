'use client';

import { memo } from 'react';

// Custom 3D-style playful icons
interface IconProps {
  className?: string;
  size?: number;
}

export const RocketIcon = memo(function RocketIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="rocket-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="rocket-fire" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Rocket body */}
      <path d="M24 4C24 4 36 12 36 28C36 36 32 40 24 44C16 40 12 36 12 28C12 12 24 4 24 4Z" fill="url(#rocket-body)" />
      {/* Window */}
      <circle cx="24" cy="20" r="5" fill="white" opacity="0.9" />
      <circle cx="24" cy="20" r="3" fill="#3B82F6" />
      {/* Fins */}
      <path d="M12 28L6 36L14 34" fill="#7C3AED" />
      <path d="M36 28L42 36L34 34" fill="#7C3AED" />
      {/* Fire */}
      <path d="M20 38C20 38 18 42 24 46C30 42 28 38 28 38" fill="url(#rocket-fire)" />
      {/* Sparkle */}
      <circle cx="8" cy="12" r="2" fill="#FBBF24" />
      <circle cx="40" cy="8" r="1.5" fill="#EC4899" />
      <circle cx="38" cy="16" r="1" fill="#8B5CF6" />
    </svg>
  );
});

export const PackageIcon = memo(function PackageIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="box-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Box */}
      <path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" fill="url(#box-gradient)" />
      {/* Top flap */}
      <path d="M24 6L42 16L24 26L6 16L24 6Z" fill="#60A5FA" />
      {/* Tape */}
      <path d="M24 26V42" stroke="white" strokeWidth="3" opacity="0.8" />
      <path d="M18 20L24 26L30 20" stroke="white" strokeWidth="2" opacity="0.6" />
      {/* Shadow */}
      <path d="M24 26L42 16V32L24 42V26Z" fill="#1E40AF" opacity="0.3" />
    </svg>
  );
});

export const TaskIcon = memo(function TaskIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="task-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      {/* Clipboard */}
      <rect x="10" y="8" width="28" height="36" rx="4" fill="url(#task-gradient)" />
      {/* Clip */}
      <rect x="18" y="4" width="12" height="8" rx="2" fill="#065F46" />
      {/* Check marks */}
      <circle cx="18" cy="22" r="3" fill="white" />
      <path d="M16 22L17.5 23.5L21 20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="32" r="3" fill="white" />
      <path d="M16 32L17.5 33.5L21 30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lines */}
      <rect x="26" y="20" width="10" height="3" rx="1.5" fill="white" opacity="0.7" />
      <rect x="26" y="30" width="8" height="3" rx="1.5" fill="white" opacity="0.5" />
    </svg>
  );
});

export const BellIcon = memo(function BellIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="bell-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      {/* Bell body */}
      <path d="M24 4C24 4 36 10 36 26V32H12V26C12 10 24 4 24 4Z" fill="url(#bell-gradient)" />
      {/* Bell bottom */}
      <ellipse cx="24" cy="32" rx="12" ry="4" fill="#D97706" />
      {/* Clapper */}
      <circle cx="24" cy="38" r="5" fill="#92400E" />
      {/* Shine */}
      <ellipse cx="18" cy="18" rx="3" ry="4" fill="white" opacity="0.4" />
      {/* Notification dot */}
      <circle cx="36" cy="12" r="6" fill="#EF4444" />
      <text x="36" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3</text>
    </svg>
  );
});

export const ChartIcon = memo(function ChartIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Bars */}
      <rect x="8" y="28" width="8" height="16" rx="2" fill="#8B5CF6" />
      <rect x="20" y="16" width="8" height="28" rx="2" fill="#EC4899" />
      <rect x="32" y="8" width="8" height="36" rx="2" fill="#06B6D4" />
      {/* Trend line */}
      <path d="M12 24L24 14L36 6" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrow */}
      <path d="M32 6L36 6L36 10" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      <circle cx="12" cy="24" r="3" fill="#10B981" />
      <circle cx="24" cy="14" r="3" fill="#10B981" />
    </svg>
  );
});

export const ExportIcon = memo(function ExportIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="export-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      {/* Document */}
      <path d="M10 8H30L38 16V42H10V8Z" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      <path d="M30 8V16H38" fill="#E5E7EB" />
      {/* Arrow */}
      <path d="M24 36V18" stroke="url(#export-gradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 24L24 18L30 24" stroke="url(#export-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lines */}
      <rect x="16" y="28" width="12" height="2" rx="1" fill="#D1D5DB" />
      <rect x="16" y="32" width="8" height="2" rx="1" fill="#D1D5DB" />
    </svg>
  );
});

export const ReportIcon = memo(function ReportIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Paper */}
      <rect x="8" y="6" width="32" height="36" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      {/* Pie chart */}
      <circle cx="24" cy="24" r="10" fill="#FCD34D" />
      <path d="M24 14V24L31.5 28" fill="#F97316" />
      <path d="M24 24L17 28" fill="#EF4444" />
      <circle cx="24" cy="24" r="4" fill="#FEF3C7" />
      {/* Lines */}
      <rect x="14" y="36" width="20" height="2" rx="1" fill="#D97706" />
    </svg>
  );
});

export const UserIcon = memo(function UserIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="user-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Avatar background */}
      <circle cx="24" cy="24" r="22" fill="url(#user-gradient)" />
      {/* Head */}
      <circle cx="24" cy="18" r="8" fill="white" />
      {/* Body */}
      <path d="M8 44C8 36 16 32 24 32C32 32 40 36 40 44" fill="white" />
      {/* Eyes */}
      <circle cx="21" cy="17" r="2" fill="#1F2937" />
      <circle cx="27" cy="17" r="2" fill="#1F2937" />
      {/* Smile */}
      <path d="M20 22C20 22 22 25 24 25C26 25 28 22 28 22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
});

export const SparkleIcon = memo(function SparkleIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4L26.5 18.5L40 24L26.5 29.5L24 44L21.5 29.5L8 24L21.5 18.5L24 4Z" fill="#FBBF24" />
      <path d="M36 8L37 14L42 15L37 16L36 22L35 16L30 15L35 14L36 8Z" fill="#EC4899" />
      <path d="M12 32L13 36L17 37L13 38L12 42L11 38L7 37L11 36L12 32Z" fill="#8B5CF6" />
    </svg>
  );
});

export const RefreshIcon = memo(function RefreshIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="refresh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Circular arrows */}
      <path d="M40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8C30 8 35.5 11.5 38.5 16.5" stroke="url(#refresh-gradient)" strokeWidth="4" strokeLinecap="round" />
      {/* Arrow head */}
      <path d="M38.5 8L40 17L31 15.5" fill="#3B82F6" />
    </svg>
  );
});

export const MoonIcon = memo(function MoonIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Moon */}
      <path d="M40 28C40 36.8366 32.8366 44 24 44C15.1634 44 8 36.8366 8 28C8 19.1634 15.1634 12 24 12C16 16 18 28 28 32C32 34 38 30 40 28Z" fill="url(#moon-gradient)" />
      {/* Stars */}
      <circle cx="14" cy="14" r="2" fill="#FBBF24" />
      <circle cx="36" cy="10" r="1.5" fill="#FBBF24" />
      <circle cx="38" cy="20" r="1" fill="#FBBF24" />
      <circle cx="10" cy="24" r="1.5" fill="#FBBF24" />
    </svg>
  );
});

export const SunIcon = memo(function SunIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="sun-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Sun body */}
      <circle cx="24" cy="24" r="10" fill="url(#sun-gradient)" />
      {/* Rays */}
      <path d="M24 4V10" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 38V44" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 24H10" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 24H44" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 10L14 14" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 34L38 38" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 38L14 34" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 14L38 10" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
});

export const GlobeIcon = memo(function GlobeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Globe */}
      <circle cx="24" cy="24" r="20" fill="url(#globe-gradient)" />
      {/* Continents */}
      <ellipse cx="18" cy="18" rx="8" ry="6" fill="#22C55E" />
      <ellipse cx="32" cy="28" rx="6" ry="8" fill="#22C55E" />
      <ellipse cx="16" cy="32" rx="4" ry="3" fill="#22C55E" />
      {/* Grid lines */}
      <ellipse cx="24" cy="24" rx="20" ry="10" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
      <ellipse cx="24" cy="24" rx="10" ry="20" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M4 24H44" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  );
});

export const LogoutIcon = memo(function LogoutIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="logout-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Door */}
      <path d="M8 8H32V40H8V8Z" fill="#374151" rx="4" />
      <rect x="10" y="10" width="20" height="28" fill="#1F2937" rx="2" />
      {/* Handle */}
      <circle cx="14" cy="24" r="2" fill="#6B7280" />
      {/* Arrow */}
      <path d="M28 24H44" stroke="url(#logout-gradient)" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 18L44 24L38 30" fill="none" stroke="url(#logout-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

// Animated loading spinner
export const LoadingSpinner = memo(function LoadingSpinner({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`animate-spin ${className}`}>
      <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
      <path d="M24 4C35.0457 4 44 12.9543 44 24" stroke="url(#user-gradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
});
