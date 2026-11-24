'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { SocialIcon } from '../../ui/SocialIcons';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type PanInfo,
} from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeName, setActiveName] = useState<string>(data.links[0]?.name ?? 'Home');
  const [scrolled, setScrolled] = useState(false);
  const isNavigatingRef = useRef(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 25);
  });

  useEffect(() => {
    const pageSections = [
      { id: 'home', name: 'Home' },
      { id: 'about', name: 'About Us' },
      { id: 'properties', name: 'Properties' },
      { id: 'services', name: 'Services' },
      { id: 'gallery', name: 'Gallery' },
      { id: 'testimonials', name: 'Testimonials' },
      { id: 'faq', name: 'FAQ' },
      { id: 'contact', name: 'Contact Us' },
    ];

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollPos = window.innerHeight + window.scrollY;
      const scrollMax = document.documentElement.scrollHeight;
      if (scrollPos >= scrollMax - 80) {
        setActiveName('Contact Us');
        return;
      }

      const threshold = 130;
      let matchedName = '';
      for (const section of pageSections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > threshold) {
          matchedName = section.name;
          break;
        }
      }

      if (matchedName) {
        setActiveName(matchedName);
      } else if (window.scrollY < 100 && data.links[0]?.name) {
        setActiveName(data.links[0].name);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links]);

  const handleNavClick = (name: string) => {
    setActiveName(name);
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 80 || info.velocity.x > 300) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        {/* ========================================================= */}
        {/* 1. TOP BAR (Steel / Slate Blue Background #374B5C)       */}
        {/* ========================================================= */}
        <div
          className={`bg-[#374B5C] text-white text-[12px] sm:text-[12.5px] border-b border-white/10 transition-all duration-300 overflow-hidden ${
            scrolled ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-14 opacity-100'
          }`}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between">
          
          {/* Left Info: Address (Desktop only) | Phone | Email */}
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5 text-white/90">
            {/* Address (Hidden on mobile responsive, visible on md+) */}
            {data.top_bar?.address && (
              <div className="hidden md:flex items-center gap-1.5 shrink-0 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <span className="font-normal whitespace-nowrap">{data.top_bar.address}</span>
              </div>
            )}

            {/* Divider after Address */}
            {data.top_bar?.address && data.top_bar?.phone && (
              <span className="w-px h-3.5 bg-white/25 shrink-0 hidden md:inline-block" aria-hidden="true" />
            )}

            {/* Phone */}
            {data.top_bar?.phone && (
              <a
                href={data.top_bar.phone_href || `tel:${data.top_bar.phone}`}
                className="flex items-center gap-1.5 shrink-0 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <span className="font-normal whitespace-nowrap">{data.top_bar.phone}</span>
              </a>
            )}

            {/* Divider between Phone and Email */}
            {data.top_bar?.phone && data.top_bar?.email && (
              <span className="w-px h-3.5 bg-white/25 shrink-0 inline-block" aria-hidden="true" />
            )}

            {/* Email */}
            {data.top_bar?.email && (
              <a
                href={data.top_bar.email_href || `mailto:${data.top_bar.email}`}
                className="flex items-center gap-1.5 shrink-0 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <span className="font-normal whitespace-nowrap">{data.top_bar.email}</span>
              </a>
            )}
          </div>

          {/* Right Info: Divider + Social Media Icons */}
          {data.top_bar?.socials && data.top_bar.socials.length > 0 && (
            <div className="hidden md:flex items-center gap-3 shrink-0 pl-4">
              <span className="w-px h-3.5 bg-white/25" aria-hidden="true" />
              <div className="flex items-center gap-3 text-white/85">
                {data.top_bar.socials.map((soc) => (
                  <motion.a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="hover:text-white transition-colors flex items-center justify-center"
                  >
                    <SocialIcon name={soc.icon || soc.name} className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR (White Background, Sticky with Backdrop)  */}
      {/* ========================================================= */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-[0_4px_24px_rgba(10,37,64,0.08)] backdrop-blur-md border-b border-slate-100'
            : 'bg-white border-b border-slate-100/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px] sm:h-[78px]">
          
          {/* Logo on Left */}
          <a
            href={data.links[0]?.href ?? '#home'}
            onClick={() => handleNavClick(data.links[0]?.name ?? 'Home')}
            className="inline-flex items-center gap-2 group shrink-0"
          >
            <Image
              src={data.logo || '/logo/logo.webp'}
              alt={data.logo_text ? `${data.logo_text} - ${data.logo_subtext}` : 'CASVORA'}
              width={160}
              height={90}
              priority
              unoptimized
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {data.links.map((item) => {
              const isActive = activeName === item.name;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.name)}
                  className={`relative py-2 text-[14px] xl:text-[14.5px] font-semibold transition-colors duration-200 group ${
                    isActive
                      ? 'text-[#0A2540]'
                      : 'text-[#334155] hover:text-[#B88B58]'
                  }`}
                >
                  <span>{item.name}</span>

                  {/* Active Underline Pill matching screenshot */}
                  {isActive && (
                    <motion.span
                      layoutId="casvoraActiveIndicator"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#B88B58]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Divider + "Enquire Now →" Button + Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Subtle Vertical Divider Line matching screenshot */}
            <span className="hidden lg:inline-block w-px h-6 bg-slate-300/80" aria-hidden="true" />

            {/* "Enquire Now →" CTA Button */}
            {data.cta_button && (
              <motion.a
                href={data.cta_button.href || '#contact'}
                onClick={() => handleNavClick('Contact Us')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="hidden sm:inline-flex items-center gap-2 rounded-md bg-[#BA8C5B] hover:bg-[#A97C4B] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_8px_rgba(186,140,91,0.25)] hover:shadow-[0_4px_14px_rgba(186,140,91,0.35)] transition-all duration-300"
              >
                <span>{data.cta_button.text}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.a>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={data.menu_aria_label || 'Open menu'}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#0A2540] hover:bg-slate-100 lg:hidden focus:outline-none transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>

        </div>
      </div>
    </header>

      {/* ========================================================= */}
      {/* 3. MOBILE SLIDE-OUT DRAWER (Smooth Spring Motion)        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-[#0A2540]/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={handleDragEnd}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
                <Image
                  src={data.logo || '/logo/logo.webp'}
                  alt={data.logo_text || 'CASVORA'}
                  width={140}
                  height={78}
                  unoptimized
                  className="h-10 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={data.close_aria_label || 'Close menu'}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#0A2540] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
                {data.links.map((item, index) => {
                  const isActive = activeName === item.name;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index }}
                      onClick={() => {
                        handleNavClick(item.name);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#BA8C5B]/10 text-[#0A2540]'
                          : 'text-[#334155] hover:bg-slate-50 hover:text-[#BA8C5B]'
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#BA8C5B]" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer Bottom Info & CTA */}
              <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50">
                {data.cta_button && (
                  <motion.a
                    href={data.cta_button.href || '#contact'}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      handleNavClick('Contact Us');
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#BA8C5B] py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#A97C4B] transition-colors"
                  >
                    <span>{data.cta_button.text}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </motion.a>
                )}

                {/* Social icons in mobile drawer */}
                {data.top_bar?.socials && (
                  <div className="flex items-center justify-center gap-4 pt-2 text-slate-500">
                    {data.top_bar.socials.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={soc.name}
                        className="p-1.5 rounded-full hover:bg-slate-200 hover:text-[#BA8C5B] transition-colors"
                      >
                        <SocialIcon name={soc.icon || soc.name} className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="text-center text-[11px] text-slate-400">
                  Swipe right to dismiss
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
