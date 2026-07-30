'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 p-1" />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark and light theme"
      className="relative w-14 h-8 rounded-full bg-zinc-200/90 dark:bg-zinc-900/90 border border-zinc-300/60 dark:border-zinc-800 p-1 flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 shadow-inner group"
    >
      <Sun
        size={14}
        className={`text-amber-500 transition-opacity duration-200 z-10 ml-0.5 ${
          isDark ? 'opacity-40 group-hover:opacity-70' : 'opacity-100 font-bold'
        }`}
      />
      <Moon
        size={13}
        className={`text-indigo-400 transition-opacity duration-200 z-10 mr-0.5 ${
          isDark ? 'opacity-100 font-bold' : 'opacity-40 group-hover:opacity-70'
        }`}
      />

      {/* Animated Sliding Pill */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute w-6 h-6 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-black/5 dark:border-white/10 ${
          isDark ? 'left-[29px]' : 'left-[3px]'
        }`}
      />
    </button>
  );
}
