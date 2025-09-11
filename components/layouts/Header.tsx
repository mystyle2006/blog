import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-3 items-center">
          <div className="flex items-center justify-start">
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">INHO&apos;s Blog</span>
            </Link>
          </div>
          <nav className="flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary font-medium">
              About
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
