'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  User,
  Home,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import type { ContactSectionData } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
};

// Vector Architectural Logo Emblem matching the header banner
function ArchitectureEmblem({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central High-rise */}
      <rect
        x="21"
        y="4"
        width="16"
        height="32"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Window Louvers */}
      <line x1="25" y1="9" x2="33" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="14" x2="33" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="19" x2="33" y2="19" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="24" x2="33" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <line x1="25" y1="29" x2="33" y2="29" stroke="currentColor" strokeWidth="1.5" />

      {/* Left Tower */}
      <path
        d="M9 19L18 13V36H9V19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="12" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="26" x2="15" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="31" x2="15" y2="31" stroke="currentColor" strokeWidth="1.5" />

      {/* Signature roofline swoosh */}
      <path
        d="M3 36L19 25L43 38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 25L32 17L49 29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function Contact({ data }: { data: ContactSectionData }) {
  if (!data) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    message: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyType: '',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle organic background lines / curves matching screenshot */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path
          d="M-80,600 C250,850 420,400 880,720 C1100,840 1320,640 1520,740"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <path
          d="M-80,720 C220,950 480,500 950,800 C1160,900 1380,720 1550,820"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          opacity="0.6"
        />
        <path
          d="M700,-60 C980,180 1200,-20 1520,160"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <path
          d="M850,-80 C1100,160 1300,-10 1560,130"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-[2px] bg-[#C39A70] rounded-full inline-block" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#0A2540]">
                {data.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A2540] tracking-tight leading-[1.18] mb-4">
              {data.heading_prefix}{' '}
              <span className="font-serif italic font-normal text-[#C39A70] block sm:inline">
                {data.heading_highlight}
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-[#4B5E71] leading-relaxed mb-8 sm:mb-10 max-w-lg font-normal">
              {data.description}
            </p>

            {/* Contact Info Items (No outer border cards, matching screenshot) */}
            <div className="space-y-6 sm:space-y-7">
              {data.contact_cards?.map((card, idx) => {
                const IconComponent = iconMap[card.icon] || Phone;
                const Wrapper = card.href ? motion.a : motion.div;
                return (
                  <Wrapper
                    key={card.id || idx}
                    {...(card.href
                      ? {
                          href: card.href,
                          target: card.href.startsWith('http') ? '_blank' : undefined,
                          rel: 'noopener noreferrer',
                        }
                      : {})}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center group cursor-pointer"
                  >
                    {/* Dark Petrol Navy Rounded Square Icon */}
                    <div className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-xl bg-[#0C3B4E] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#0A2540] transition-colors duration-200">
                      <IconComponent className="w-5 h-5 text-white stroke-[2]" />
                    </div>

                    {/* Thin vertical separator line */}
                    <div className="h-8 w-[1.5px] bg-[#CBD5E1] mx-4 sm:mx-5 flex-shrink-0" />

                    {/* Contact Details */}
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-[#0A2540] uppercase tracking-wider block mb-0.5">
                        {card.title}
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-[#0A2540] group-hover:text-[#C39A70] transition-colors duration-200 block truncate">
                        {card.line1}
                      </span>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN (FORM CARD) ================= */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(10,37,64,0.08)] border border-[#E5E9EE] overflow-hidden">
              
              {/* Card Header (Deep Petrol Teal Banner with Top-Right Caramel Diagonal Slice) */}
              <div className="relative bg-[#0C3B4E] px-6 sm:px-8 py-5 sm:py-6 overflow-hidden flex items-center">
                
                {/* Top-Right Caramel Diagonal Accent Slice */}
                <div
                  className="absolute top-0 right-0 w-16 sm:w-20 h-full bg-[#C39A70] pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />

                {/* Left Emblem */}
                <ArchitectureEmblem className="w-10 h-10 text-white flex-shrink-0" />

                {/* White vertical divider line */}
                <div className="h-9 w-[1.5px] bg-white/30 mx-4 sm:mx-5 flex-shrink-0" />

                {/* Header Title & Subtitle */}
                <div className="relative z-10 pr-12">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                    {data.form?.card_title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/80 font-normal mt-0.5 leading-tight">
                    {data.form?.card_subtitle}
                  </p>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
                
                {/* Success Notification Alert */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] flex items-start gap-3 shadow-sm overflow-hidden"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#10B981]" />
                      <span className="text-xs sm:text-sm font-medium">
                        {data.form?.success_message}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Row 1: Your Name * & Phone Number * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Your Name */}
                  <div className="relative flex items-center bg-white border border-[#D8DFE7] hover:border-[#CBD5E1] rounded-xl px-4 py-3.5 focus-within:border-[#0C3B4E] focus-within:ring-2 focus-within:ring-[#0C3B4E]/10 transition-all duration-200">
                    <User className="w-5 h-5 text-[#8C9AA8] stroke-[1.8] flex-shrink-0 mr-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={data.form?.name_placeholder}
                      className="w-full bg-transparent text-sm text-[#0A2540] placeholder-[#475569] font-normal outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative flex items-center bg-white border border-[#D8DFE7] hover:border-[#CBD5E1] rounded-xl px-4 py-3.5 focus-within:border-[#0C3B4E] focus-within:ring-2 focus-within:ring-[#0C3B4E]/10 transition-all duration-200">
                    <Phone className="w-5 h-5 text-[#8C9AA8] stroke-[1.8] flex-shrink-0 mr-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={data.form?.phone_placeholder}
                      className="w-full bg-transparent text-sm text-[#0A2540] placeholder-[#475569] font-normal outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Email Address * */}
                <div className="relative flex items-center bg-white border border-[#D8DFE7] hover:border-[#CBD5E1] rounded-xl px-4 py-3.5 focus-within:border-[#0C3B4E] focus-within:ring-2 focus-within:ring-[#0C3B4E]/10 transition-all duration-200">
                  <Mail className="w-5 h-5 text-[#8C9AA8] stroke-[1.8] flex-shrink-0 mr-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={data.form?.email_placeholder}
                    className="w-full bg-transparent text-sm text-[#0A2540] placeholder-[#475569] font-normal outline-none"
                  />
                </div>

                {/* Row 3: Custom Animated Dropdown (Interested In *) */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsDropdownOpen(!isDropdownOpen);
                      } else if (e.key === 'Escape') {
                        setIsDropdownOpen(false);
                      }
                    }}
                    className={`relative flex items-center justify-between bg-white border rounded-xl px-4 py-3.5 cursor-pointer select-none transition-all duration-200 ${
                      isDropdownOpen
                        ? 'border-[#0C3B4E] ring-2 ring-[#0C3B4E]/10'
                        : 'border-[#D8DFE7] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center min-w-0 mr-2">
                      <Home className="w-5 h-5 text-[#8C9AA8] stroke-[1.8] flex-shrink-0 mr-3" />
                      <span
                        className={`text-sm truncate ${
                          formData.propertyType
                            ? 'text-[#0A2540] font-medium'
                            : 'text-[#475569] font-normal'
                        }`}
                      >
                        {formData.propertyType || data.form?.property_placeholder}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex-shrink-0 text-[#64748B]"
                    >
                      <ChevronDown className="w-5 h-5 stroke-[2]" />
                    </motion.div>
                  </div>

                  {/* Hidden form input for standard form value compliance */}
                  <input
                    type="hidden"
                    name="propertyType"
                    value={formData.propertyType}
                  />

                  {/* Dropdown Menu with Framer Motion */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-xl border border-[#E2E8F0] shadow-[0_12px_36px_rgba(10,37,64,0.14)] overflow-hidden py-1.5"
                      >
                        {data.form?.property_options?.map((option, idx) => {
                          const isSelected = formData.propertyType === option;
                          return (
                            <motion.div
                              key={idx}
                              whileHover={{ x: 2 }}
                              onClick={() => {
                                setFormData({ ...formData, propertyType: option });
                                setIsDropdownOpen(false);
                              }}
                              className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors duration-150 ${
                                isSelected
                                  ? 'bg-[#0C3B4E]/5 text-[#0C3B4E] font-semibold'
                                  : 'text-[#0A2540] hover:bg-[#F8FAFC]'
                              }`}
                            >
                              <span>{option}</span>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#0C3B4E] stroke-[2.5]" />
                              )}
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Row 4: Your Message */}
                <div className="relative flex items-start bg-white border border-[#D8DFE7] hover:border-[#CBD5E1] rounded-xl px-4 py-3.5 focus-within:border-[#0C3B4E] focus-within:ring-2 focus-within:ring-[#0C3B4E]/10 transition-all duration-200">
                  <MessageSquare className="w-5 h-5 text-[#8C9AA8] stroke-[1.8] flex-shrink-0 mr-3 mt-0.5" />
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.form?.message_placeholder}
                    className="w-full bg-transparent text-sm text-[#0A2540] placeholder-[#475569] font-normal outline-none resize-y min-h-[96px]"
                  />
                </div>

                {/* Row 5: Submit Button with Bottom-Right Caramel Diagonal Slice */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative w-full py-4 px-6 rounded-xl bg-[#0C3B4E] hover:bg-[#0A2540] text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer overflow-hidden disabled:opacity-75"
                >
                  {/* Bottom-right diagonal caramel triangle accent */}
                  <div
                    className="absolute bottom-0 right-0 w-12 sm:w-16 h-full bg-[#C39A70] pointer-events-none group-hover:bg-[#D4AA7F] transition-colors"
                    style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
                  />

                  <span className="relative z-10 font-bold">
                    {isSubmitting ? data.form?.submitting_text : data.form?.submit_text}
                  </span>

                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin relative z-10" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.2] group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
                  )}
                </motion.button>
              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
