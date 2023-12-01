'use client';

import { ToggleTheme } from '@/components/ToggleTheme';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 text-lg">
      {/* Desktop Navigation Start*/}
      <div className="hidden flex-row items-center gap-3 md:flex">
        <div>Home</div>
        <div>Menu</div>
        <div>Contact</div>
        <div>About</div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex flex-row items-center justify-between gap-2 text-lg md:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Home</MenubarItem>
              <MenubarItem>Menu</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Contact</MenubarItem>
              <MenubarItem>About</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex flex-row items-center gap-3">
        <ToggleTheme />
        <div className="flex flex-row items-center gap-3">
          <div>Name</div>
          <div>Login</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
