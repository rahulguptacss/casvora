'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { SocialIcon } from '../../ui/SocialIcons';
import type { FooterData } from '../../types';

export default function Footer({ data }: { data: FooterData }) {
  if (!data) return null;

  return (
    <footer className="bg-white border-t border-[#E8ECF0] text-[#0A2540] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-4 sm:pb-5">
        
        {/* Main 3-Column Content with Vertical Divider Lines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0 items-start"
        >
          {/* Column 1: Brand Logo & Centered Tagline */}
          <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:pr-12 lg:border-r lg:border-[#CBD5E1]">
            <Link href="#home" className="inline-block group focus:outline-none">
              <Image
                src={data.logo || '/logo/logo.webp'}
                alt={data.logo_text || 'CASVORA'}
                width={160}
                height={80}
                unoptimized
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-[13.5px] font-medium text-[#0A2540] leading-relaxed max-w-[260px] mt-2.5 whitespace-pre-line text-center">
              {data.tagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="px-4 sm:px-8 lg:px-14 lg:border-r lg:border-[#CBD5E1]">
            <h4 className="text-lg sm:text-xl font-bold text-[#0A2540] tracking-tight">
              {data.quick_links_title || 'Quick Links'}
            </h4>
            
            {/* Caramel Accent Underline Bar */}
            <div className="w-7 h-[2px] bg-[#C39A70] rounded-full mt-2 mb-5" />

            <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2.5 sm:gap-y-3">
              {data.quick_links?.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-medium text-[#0A2540] hover:text-[#C39A70] transition-colors duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#0A2540] group-hover:text-[#C39A70] group-hover:translate-x-1 transition-all duration-200 stroke-[2.5]" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 whitespace-nowrap">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="px-4 sm:px-8 lg:pl-14">
            <h4 className="text-lg sm:text-xl font-bold text-[#0A2540] tracking-tight">
              {data.contact_title || 'Get in Touch'}
            </h4>

            {/* Caramel Accent Underline Bar */}
            <div className="w-7 h-[2px] bg-[#C39A70] rounded-full mt-2 mb-4" />

            <div className="space-y-2.5 sm:space-y-3">
              {/* Phone */}
              {data.phone && (
                <a
                  href={data.phone_href || `tel:${data.phone}`}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg bg-[#0C3B4E] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0A2540] group-hover:scale-105 transition-all duration-200">
                    <Phone className="w-4 h-4 text-white stroke-[2]" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold text-[#0A2540] group-hover:text-[#C39A70] transition-colors duration-200">
                    {data.phone}
                  </span>
                </a>
              )}

              {/* Email */}
              {data.email && (
                <a
                  href={data.email_href || `mailto:${data.email}`}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg bg-[#0C3B4E] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0A2540] group-hover:scale-105 transition-all duration-200">
                    <Mail className="w-4 h-4 text-white stroke-[2]" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold text-[#0A2540] group-hover:text-[#C39A70] transition-colors duration-200">
                    {data.email}
                  </span>
                </a>
              )}

              {/* Address */}
              {data.address && (
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg bg-[#0C3B4E] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0A2540] group-hover:scale-105 transition-all duration-200">
                    <MapPin className="w-4 h-4 text-white stroke-[2]" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold text-[#0A2540] leading-snug whitespace-pre-line group-hover:text-[#C39A70] transition-colors duration-200">
                    {data.address}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright & Bare Dark Navy Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-7 sm:mt-8 pt-4 sm:pt-5 border-t border-[#D5DCE4] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        >
          {/* Copyright */}
          <p className="text-xs sm:text-[13px] font-medium text-[#0A2540] text-center sm:text-left">
            {data.copyright}
          </p>

          {/* Social Icons with Vertical Divider */}
          {data.socials && data.socials.length > 0 && (
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-[1.5px] h-4 bg-[#CBD5E1] hidden sm:block" />
              {data.socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="text-[#0C3B4E] hover:text-[#C39A70] transition-colors duration-200"
                >
                  <SocialIcon
                    name={social.name || social.icon}
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  />
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </footer>
  );
}
