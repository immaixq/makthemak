import '@/styles/globals.css'
import clsx from 'clsx';
import Nav from '@/components/Layout/Header/Header'

import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Mak',
    template: '%s | Mak',
  },
  icons: {
    icon: '/avatar.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en"
      className={clsx(
        "text-neutral-700 bg-slate-100 dark:text-slate-400 dark:bg-[#111010]",
        roboto.variable
      )}
    >
      <body className="max-w-3xl mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto font-mono">
        <section className='layout'>
          <Nav />
          <main className="mt-12">
            {children}
          </main>
        </section>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"/>
      </body>
    </html>
    
  )
}
