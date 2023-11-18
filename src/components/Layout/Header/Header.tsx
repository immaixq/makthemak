'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Icons/icons'
import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react'


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
  '/project': {
    name: 'Project',
  },
};

const Header = () => {
  let pathname = usePathname() || '/';
  const [isOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isOpen);
  };

  return (
    <nav className="font-serif font-bold">
      <div className="flex justify-between ">
        <div>
          <a href='/'>
            <Logo/>
          </a>
        </div>
        <div className='flex justify-between'>
        {/* Hamburger Button */}
        <button
          onClick={toggleNav}
          className="md:hidden py-2 flex flex-col"
        >
              <span className={`bg-slate-700 block transition-all duration-400 ease-out 
                  h-0.5 w-5 rounded-sm ${isOpen ? 
                  'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`} >
              </span>
              <span className={`bg-slate-700 block transition-all duration-400 ease-out 
                              h-0.5 w-7 rounded-sm my-0.5 ${isOpen ? 
                              'opacity-0' : 'opacity-90'
                              }`} >
              </span>
              <span className={`bg-slate-700 block transition-all duration-400 ease-out 
                              h-0.5 w-5 rounded-sm ${isOpen ? 
                              '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                              }`} >
              </span>    
        </button>

        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row">
            {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                      <Link
                          key={path}
                          href={path}
                          className={clsx(
                            "text-xs sm:text-base transition-all hover:text-neutral-800 dark:hover:text-neutral-200 pr-5 py-1 ", 
                            {
                              'text-neutral-500': !isActive,
                              'font-bold': isActive,
                            },
                          )}
                        >
                        <span className="relative py-[5px] px-[7px]">
                          {name}
                          {path === pathname ? (
                            <motion.div
                              className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
                              layoutId="sidebar"
                              transition={{
                                type: 'spring',
                                stiffness: 350,
                                damping: 30,
                              }}
                            />
                          ) : null}
                        </span>
                      </Link>
                      );
                })}
            </div>
          </div>
        </div>
        </div>
    </nav>
  )
}

export default Header
