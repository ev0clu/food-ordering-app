'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ToggleTheme } from '@/components/ToggleTheme';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Menu } from 'lucide-react';
import logo from '../../public/logo.png';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between gap-2 text-lg">
      {/* Desktop Navigation Start*/}
      <div className="hidden flex-row items-center gap-6 md:flex">
        <Link href="/">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-16'
            )}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-16'
            )}
          >
            Menu
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-16'
            )}
          >
            Contact
          </Link>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'w-16'
            )}
          >
            About
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex flex-row items-center justify-between gap-2 text-lg md:hidden ">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">Home</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/menu">Menu</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/contact">Contact</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/about">About</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex flex-row items-center gap-3">
        <ToggleTheme />
        <div className="flex flex-row items-center gap-3">
          <div>Name</div>
          <Link href="/login">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
