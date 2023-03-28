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
    default: 'MaktheMak',
    template: '%s | MaktheMak',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"
    className={clsx(
      "text-neutral-800 bg-neutral-100 dark:text-slate-300 dark:bg-[#111010]",
      roboto.variable
    )}
    >
      <body className="max-w-4xl md:flex-row lg:mt-28 lg:mx-auto">
        <Nav/>
        <main className="container min-w-0 mt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
