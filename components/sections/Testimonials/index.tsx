'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = data?.items || [];
  const total = items.length;

  // Auto-slide effect (every 5 seconds, pauses when hovered)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!data || total === 0) return null;

  const current = items[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % total);
  };

  const formattedCurrent = String(currentIdx + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <section
      id="testimonials"
      className="pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-14 bg-[#FAF6F2] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching screenshot */}
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
          singleRule={true}
        />

        {/* Testimonial Quote & Details */}
        <div className="mt-12 sm:mt-16 max-w-3xl ml-0 lg:ml-12">
          
          {/* Top Double Quote Mark */}
          <div className="text-[#BA8C5B] text-4xl sm:text-5xl font-serif leading-none select-none mb-3">
            “
          </div>

          {/* Testimonial Quote with Vertical Copper Line */}
          <div className="relative pl-6 sm:pl-8 border-l-[2px] border-[#BA8C5B] py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id || currentIdx}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Quote Text */}
                <p className="font-serif italic font-normal text-xl sm:text-2xl lg:text-[27px] leading-[1.38] text-[#0A2540] max-w-2xl">
                  {current.quote}
                </p>

                {/* Author Info (Avatar, Name, Role) */}
                <div className="mt-7 sm:mt-8 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/80 shadow-xs bg-slate-200 shrink-0">
                    <Image
                      src={current.avatar || '/images/testimonials/arjun-mehta.webp'}
                      alt={current.avatar_alt || current.author_name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0A2540] leading-snug">
                      {current.author_name}
                    </h4>
                    <p className="text-[12.5px] sm:text-[13px] text-[#64748B] font-normal mt-0.5">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Slide Number Counter matching screenshot */}
          <div className="mt-8 sm:mt-9 flex items-center gap-4 pl-6 sm:pl-8">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-300 text-slate-600 hover:border-[#BA8C5B] hover:text-[#BA8C5B] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.8]" />
            </button>

            {/* Slide Counter: "01 / 03" */}
            <span className="text-[12.5px] sm:text-[13px] font-medium text-[#64748B] tracking-wider select-none">
              {formattedCurrent} / {formattedTotal}
            </span>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-300 text-slate-600 hover:border-[#BA8C5B] hover:text-[#BA8C5B] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.8]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
