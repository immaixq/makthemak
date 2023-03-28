'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Icons/icons'
const navItems = {
  '/': {
    name: 'home',

  },
  '/about': {
    name: 'about',
    x: 64,
    y: 35,
    w: '65px',
  },
  '/blog': {
    name: 'blog',
  },
  '/contant': {
    name: 'contact',
  },
};

const Header = () => {
  let pathname = usePathname() || '/';
  
  return (
    <div className="container font-serif font-bold">
      <div className="flex justify-between">
        <div>
          <a>
            <Logo/>
          </a>
        </div>
        <div className="flex">
          {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                    <Link
                      key={path}
                      href={path}
                      className={clsx(
                        "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 pr-8",
                        {
                          'text-neutral-500': !isActive,
                          'font-bold': isActive,
                        }
                      )}
                    >
                      {name}
                    </Link>
              );
            })}
          </div>
      </div>
    </div>
  )
}

export default Header
