'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BackToTopData } from '../types';

export default function BackToTop({ data }: { data: BackToTopData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={data.aria_label || 'Scroll to top'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#C69255] text-white shadow-[0_8px_20px_rgba(198,146,85,0.45)] hover:bg-[#b58044] transition-colors focus:outline-none"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

