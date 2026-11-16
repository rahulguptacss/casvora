'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { HeroSectionData } from '../../types';

export default function Hero({ data }: { data: HeroSectionData }) {
  if (!data) return null;

  return (
    <section
      id="home"
      className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[calc(100vh-114px)] lg:min-h-[calc(100dvh-114px)] flex items-center overflow-hidden bg-[#0F202D]"
    >
      {/* 1. HERO BACKGROUND IMAGE (Fills entire screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image || '/images/hero/hero-villa.webp'}
          alt={data.image_alt || 'CASVORA Luxury Villa at Twilight'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
        
        {/* Cinematic Gradient Overlays matching screenshot */}
        {/* Left-to-right dark vignette to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F2C]/95 via-[#0E1F2C]/75 via-50% to-transparent" />
        {/* Subtle top/bottom shadow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F2C]/50 via-transparent to-black/15 pointer-events-none" />
      </div>

      {/* 2. HERO CONTENT CONTAINER (Vertically Centered) */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20 w-full flex items-center">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Eyebrow: Single horizontal hairline rule + "PREMIUM RESIDENCES" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5"
          >
            <span className="h-[1.5px] w-5 sm:w-8 bg-white/60 shrink-0" aria-hidden="true" />
            <span className="text-[11.5px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#B8C8D6]">
              {data.eyebrow}
            </span>
          </motion.div>

          {/* Main Headline: "Find Your Dream Home with CASVORA" */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[32px] xs:text-[36px] sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold text-white tracking-tight leading-[1.1] max-w-lg"
          >
            <span className="block">{data.headline_prefix}</span>
            <span className="block font-serif italic font-normal text-[#E2C8B1] mt-0.5 sm:mt-1.5">
              {data.headline_highlight}
            </span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-3 sm:mt-5 text-[13.5px] sm:text-[15px] lg:text-[16px] leading-relaxed text-white/80 max-w-md sm:max-w-lg font-normal"
          >
            {data.description}
          </motion.p>

          {/* CTA Action Button: Frosted Glass Petrol Button with Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-5 sm:mt-8 flex items-center"
          >
            <motion.a
              href={data.button_link || '#properties'}
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group inline-flex items-center gap-2.5 rounded-md bg-[#163044]/85 hover:bg-[#1A384F] border border-white/25 hover:border-white/50 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[14.5px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300"
            >
              <span>{data.button_text}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] text-white/90 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
