'use client';

import { Facebook, Instagram } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-10 border-t-2">
      <div className="mt-10 flex flex-row gap-7 md:gap-14">
        <div className="flex flex-col gap-5">
          <label className="font-bold opacity-60">
            Partner with Fooder
          </label>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                For couriers
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                For restaurant
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold opacity-60">Useful Links</label>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                Support
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                Promo codes
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                Developers
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold opacity-60">Follow us</label>
          <div className="flex flex-col gap-2">
            <a href="#" target="_blank" rel="noreferrer">
              <span className="flex flex-row gap-1">
                <Facebook />
                <p>Facebook</p>
              </span>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <span className="flex flex-row gap-1">
                <Instagram />
                <p>Instagram</p>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex h-8 w-full flex-row items-center justify-center gap-2 px-5 py-4">
        <p>Copyright © Laszlo Kis 2023</p>
        <a
          className="flex items-center justify-center text-xl text-gray-950 hover:text-neutral-400"
          href="https://github.com/ev0clu"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="hover:opacity-80 dark:text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
