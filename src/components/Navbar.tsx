'use client';

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
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between gap-2 text-lg">
      {/* Desktop Navigation Start*/}
      <div className="hidden flex-row items-center gap-6 md:flex">
        <Link href="/">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>
        <div className="flex flex-row items-center gap-3">
          <Link href="/" className="hover:text-cyan-500">
            Home
          </Link>
          <Link href="/menu" className="hover:text-cyan-500">
            Menu
          </Link>
          <Link href="/contact" className="hover:text-cyan-500">
            Contact
          </Link>
          <Link href="/about" className="hover:text-cyan-500">
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
