'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Icons/icons'
// import React from "react";
// import { useState } from "react";

const navItems = {
  '/': {
    name: 'Home',
  },
  '/about': {
    name: 'About',
  },
  '/blog': {
    name: 'Blog',
  },
  '/contant': {
    name: 'Contact',
  },
};

const Header = () => {
  let pathname = usePathname() || '/';
  // const [isOpen, setIsOpen] = useState(false);
  // const genericHamburgerLine = `h-1 w-7 my-1 rounded-full bg-white transition ease transform duration-300`;
  return (
    <div className="font-serif font-bold ">
      <div className="flex-wrap md:flex justify-between">
        <div className='mb-2'>
          <a>
            <Logo/>
          </a>
        </div>
        <div className="items-center">
          {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                    <Link
                      key={path}
                      href={path}
                      className={clsx(
                        "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 pr-8 ", 
                        {
                          'text-neutral-500': !isActive,
                          'font-bold': isActive,
                        },
                      )}
                    >
                      {name}
                    </Link>
              );
            })}
          </div>
          {/* <div className=' md:hidden flex item-center'>
            <button
      className="mobile-menu-btn flex flex-col h-7 w-10  rounded justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>

            </div> */}
      </div>
    </div>
  )
}

export default Header
