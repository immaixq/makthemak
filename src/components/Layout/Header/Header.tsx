'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Icons/icons'
import { LayoutGroup, motion } from 'framer-motion';


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
  return (
    <div className="font-serif font-bold ">
      <div className="flex-wrap md:flex justify-between">
        <div className='mb-2'>
          <a>
            <Logo/>
          </a>
        </div>
        <LayoutGroup>
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
                    <span className="relative py-[5px] px-[10px]">
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
          </LayoutGroup>
      </div>
    </div>
  )
}

export default Header
