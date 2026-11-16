'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bed,
  Bath,
  Maximize2,
  Building2,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import type { PropertiesSectionData } from '../../types';

function ElevatorIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="m8 10 4-4 4 4" />
      <path d="m8 14 4 4 4-4" />
    </svg>
  );
}

const specIconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Bed,
  Bath,
  Maximize2,
  Building2,
  ArrowUpDown: ElevatorIcon,
};

export default function Properties({ data }: { data: PropertiesSectionData }) {
  if (!data) return null;

  return (
    <section id="properties" className="pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading matching screenshot */}
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
          singleRule={true}
        />

        {/* 3 Property Cards Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {data.items?.map((prop, idx) => {
            return (
              <motion.div
                key={prop.id || idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(10,37,64,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Property Image Container */}
                  <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={prop.image || '/images/properties/luxury-villa.webp'}
                      alt={prop.image_alt || prop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Badge: For Sale / For Rent matching screenshot */}
                    {prop.badge && (
                      <div className="absolute top-3.5 left-3.5 bg-[#BA8C5B]/90 backdrop-blur-xs text-white text-[12px] font-semibold px-3 py-1 rounded-[4px] shadow-sm">
                        {prop.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Body: Title, Location & Price */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      {/* Left: Title & Location */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0A2540] truncate transition-colors group-hover:text-[#BA8C5B]">
                          {prop.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#556987] mt-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#0A2540] shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <span className="w-px h-9 bg-slate-200 shrink-0 mx-1" aria-hidden="true" />

                      {/* Right: Starting From & Price */}
                      <div className="text-right shrink-0">
                        <span className="text-[10.5px] font-medium text-[#718292] block leading-none">
                          Starting From
                        </span>
                        <span className="text-[16.5px] sm:text-[17.5px] font-extrabold text-[#0A2540] block mt-1 leading-tight whitespace-nowrap">
                          {prop.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Specs Bar matching screenshot */}
                {prop.specs && prop.specs.length > 0 && (
                  <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[#1E293B]">
                    {prop.specs.map((spec, sIdx) => {
                      const SpecIcon = specIconMap[spec.icon] || Maximize2;
                      return (
                        <div key={sIdx} className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-medium">
                          <SpecIcon className="w-3.5 h-3.5 text-[#1E293B] stroke-[1.8] shrink-0" />
                          <span className="whitespace-nowrap">{spec.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
