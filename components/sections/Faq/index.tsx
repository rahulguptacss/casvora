'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FaqSectionData } from '../../types';

export default function Faq({ data }: { data: FaqSectionData }) {
  if (!data) return null;

  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>(data.items?.[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          
          {/* ========================================================= */}
          {/* 1. LEFT COLUMN: EYEBROW, HEADLINE & DESCRIPTION          */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            {/* Eyebrow: Single horizontal hairline rule + "F A Q" */}
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#BA8C5B] shrink-0" aria-hidden="true" />
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.28em] text-[#0A2540]">
                {data.eyebrow}
              </span>
            </div>

            {/* Headline: "Frequently Asked Questions" */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0A2540] tracking-tight leading-[1.15]">
              <span className="block">{data.heading_prefix}</span>
              <span className="block font-serif italic font-normal text-[#BA8C5B] mt-0.5 sm:mt-1">
                {data.heading_highlight}
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed text-[#556987] font-normal max-w-sm">
              {data.subtitle}
            </p>
          </motion.div>

          {/* ========================================================= */}
          {/* 2. RIGHT COLUMN: ACCORDION LIST                          */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-3.5"
          >
            {data.items?.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-[#FAF3EA] border-[#EADCCB] shadow-[0_2px_12px_rgba(186,140,91,0.06)]'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Accordion Header / Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 sm:py-4.5 gap-4 cursor-pointer select-none group"
                  >
                    <span className="text-[15px] sm:text-[15.5px] font-bold text-[#0A2540] transition-colors leading-snug">
                      {item.question}
                    </span>

                    {/* Bare Plus / Minus icon matching screenshot */}
                    <span className="shrink-0 text-[#0A2540] transition-transform duration-200">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Content / Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-0 text-[13.5px] sm:text-[14px] text-[#556987] leading-relaxed font-normal">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
