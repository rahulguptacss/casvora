'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import type { GallerySectionData } from '../../types';

export default function Gallery({ data }: { data: GallerySectionData }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!data) return null;

  const images = data.images || [];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };

  return (
    <section id="gallery" className="pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-[#FAF8F5]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={data.eyebrow}
          headingPrefix={data.heading_prefix}
          headingHighlight={data.heading_highlight}
          subtitle={data.subtitle}
        />

        {/* 6-Photo Masonry Grid matching screenshot */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {images.map((img, idx) => {
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onClick={() => setSelectedIdx(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_16px_rgba(10,37,64,0.06)] bg-slate-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-600 ease-out"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0A2540]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    {img.category}
                  </span>
                  <span className="text-white/80 text-[11px] mt-0.5 line-clamp-1">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src={images[selectedIdx].src}
                alt={images[selectedIdx].alt}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

