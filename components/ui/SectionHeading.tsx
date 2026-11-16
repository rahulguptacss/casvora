import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
  maxWidth?: string;
  singleRule?: boolean;
}

export default function SectionHeading({
  eyebrow,
  headingPrefix,
  headingHighlight,
  subtitle,
  align = 'center',
  dark = false,
  maxWidth = 'max-w-3xl',
  singleRule = true,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? `mx-auto ${maxWidth} text-center` : 'text-left'}>
      {/* Eyebrow with hairline gold rules */}
      <div
        className={`mb-3 flex items-center gap-2.5 ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        <span
          className={`h-[1.5px] w-6 sm:w-8 ${
            dark ? 'bg-[#C69255]/70' : 'bg-[#BA8C5B]'
          }`}
          aria-hidden="true"
        />
        <span
          className={`text-[12px] font-bold uppercase tracking-[0.2em] sm:text-[12.5px] ${
            dark ? 'text-[#C69255]' : 'text-[#0A2540]'
          }`}
        >
          {eyebrow}
        </span>
        {!singleRule && (
          <span
            className={`h-[1.5px] w-6 sm:w-8 ${
              dark ? 'bg-[#C69255]/70' : 'bg-[#BA8C5B]'
            }`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Dual Tone Main Heading */}
      <h2
        className={`font-sans text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold tracking-tight leading-[1.2] ${
          dark ? 'text-white' : 'text-[#0A2540]'
        }`}
      >
        <span>{headingPrefix} </span>
        <span className="font-serif italic font-normal text-[#C69255]">
          {headingHighlight}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-3 text-[13.5px] sm:text-[15px] leading-relaxed mx-auto max-w-2xl ${
            dark ? 'text-slate-300' : 'text-[#5A6E85]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

