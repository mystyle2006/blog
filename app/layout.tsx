import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from '@/app/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | INHO 블로그',
    default: 'INHO 블로그',
  },
  description: '개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  keywords: ['Next.js', '프론트엔드', '웹개발', '코딩', '프로그래밍', '리액트'],
  authors: [{ name: 'INHO', url: 'https://github.com/mystyle2006' }],
  creator: 'INHO',
  publisher: 'INHO',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Header 영역 */}
            <Header />

            {/* Main 영역 */}
            <main className="flex-1">{children}</main>

            {/* Footer 영역 */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
