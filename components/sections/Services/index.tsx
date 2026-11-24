'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Handshake, Key, TrendingUp, BarChart3, type LucideIcon } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import type { ServicesSectionData } from '../../types';

function GrowthChartIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="10" width="4" height="11" rx="1" />
      <rect x="17" y="6" width="4" height="15" rx="1" />
      <path d="M4 10 L12 4 L20 4" />
      <path d="M16 4 L20 4 L20 8" />
    </svg>
  );
}

const serviceIconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Home,
  Handshake,
  Key,
  BarChart3: GrowthChartIcon,
  TrendingUp: GrowthChartIcon,
};

export default function Services({ data }: { data: ServicesSectionData }) {
  if (!data) return null;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string = '#contact') => {
    e.preventDefault();
    const targetId = href.replace('#', '') || 'contact';
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <section id="services" className="pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading matching screenshot */}
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
          singleRule={true}
        />

        {/* 4 Service Cards Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6.5">
          {data.items?.map((srv, idx) => {
            const IconComponent = serviceIconMap[srv.icon] || Home;

            return (
              <motion.div
                key={srv.id || idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="h-full"
              >
                <Link
                  href={srv.link || '#contact'}
                  onClick={(e) => handleCardClick(e, srv.link || '#contact')}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(10,37,64,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  {/* Top Card Body */}
                  <div className="p-5 sm:p-6 pb-4">
                    {/* Icon Container: Soft warm sand square */}
                    <div className="w-13 h-13 rounded-xl bg-[#FAF5EE] text-[#BA8C5B] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#BA8C5B] group-hover:text-white">
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0A2540] mt-4 leading-snug group-hover:text-[#BA8C5B] transition-colors duration-200">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-[13px] sm:text-[13.5px] leading-relaxed text-[#556987] font-normal">
                      {srv.description}
                    </p>
                  </div>

                  {/* Bottom Photo: Flush with card bottom and sides matching screenshot */}
                  <div className="relative aspect-[16/10.5] w-full overflow-hidden bg-slate-100 mt-2">
                    <Image
                      src={srv.image || '/images/services/buy-property.webp'}
                      alt={srv.image_alt || srv.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-600 ease-out"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
