import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { pages } from '../components/types';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased selection:bg-[#C69255] selection:text-white">
        {children}
      </body>
    </html>
  );
}
