'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, Award, Users, type LucideIcon } from 'lucide-react';
import type { AboutSectionData } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Award,
  Users,
};

export default function About({ data }: { data: AboutSectionData }) {
  if (!data) return null;

  return (
    <section id="about" className="pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">

          {/* ========================================================= */}
          {/* 1. LEFT COLUMN: VILLA PHOTO WITH GREEN BADGE             */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden aspect-[405/388] w-full max-w-lg mx-auto lg:max-w-none shadow-[0_12px_36px_rgba(10,37,64,0.08)]">
              <Image
                src={data.image || '/images/about/about-villa.webp'}
                alt={data.image_alt || 'CASVORA Building Spaces'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />

              {/* Green Banner matching screenshot: "— EST. 2010 | REAL ESTATE EXPERTS" */}
              {data.badge_text && (
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-[#253616] text-white px-5 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 shadow-md">
                  <span className="w-5 h-[1.5px] bg-white/70 shrink-0" aria-hidden="true" />
                  <span className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-white whitespace-nowrap">
                    {data.badge_text}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* 2. RIGHT COLUMN: CONTENT & 3 FEATURE PILLARS            */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 lg:pl-4"
          >
            {/* Eyebrow: Single horizontal hairline rule + "ABOUT CASVORA" */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="h-[1.5px] w-6 sm:w-8 bg-[#BA8C5B] shrink-0" aria-hidden="true" />
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#0A2540]">
                {data.eyebrow}
              </span>
            </div>

            {/* Headline: "Building Spaces for Better Living" */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0A2540] tracking-tight leading-[1.15]">
              <span className="block">{data.heading_prefix}</span>
              <span className="block font-serif italic font-normal text-[#BA8C5B] mt-0.5 sm:mt-1">
                {data.heading_highlight}
              </span>
            </h2>

            {/* Paragraph Description */}
            <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-[#5A6E85] font-normal max-w-xl">
              {data.description}
            </p>

            {/* 3 Feature Pillars Row with Dividers */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-7">
              {data.features?.map((feat, idx) => {
                const IconComponent = iconMap[feat.icon] || Home;
                const parts = feat.title.split(' ');
                const line1 = parts[0];
                const line2 = parts.slice(1).join(' ');

                return (
                  <React.Fragment key={feat.id || idx}>
                    {/* Thin vertical divider between features */}
                    {idx > 0 && (
                      <span className="hidden sm:inline-block w-px h-8 bg-slate-200" aria-hidden="true" />
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * idx }}
                      className="flex items-center gap-2.5 sm:gap-3"
                    >
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#BA8C5B] stroke-[1.6] shrink-0" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0A2540]">
                          {line1}
                        </span>
                        {line2 && (
                          <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0A2540]">
                            {line2}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
