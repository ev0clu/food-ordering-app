import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fooder',
  description: 'Next app for ordering food'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 py-2">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
