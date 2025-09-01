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
  description: 'Personal blog sharing thoughts and insights on technology, programming, and more.',
  keywords: ['blog', 'technology', 'programming', 'thoughts'],
  authors: [{ name: 'Mak' }],
  creator: 'Mak',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/avatar.png',
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Mak Blog',
    title: 'Mak',
    description: 'Personal blog sharing thoughts and insights on technology, programming, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mak',
    description: 'Personal blog sharing thoughts and insights on technology, programming, and more.',
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
        "text-neutral-700 bg-slate-100 dark:text-slate-400 dark:bg-[#111010]",
        roboto.variable
      )}
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"/>
      </head>
      <body className="max-w-3xl mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto font-mono">
        <section className='layout'>
          <Nav />
          <main className="mt-12">
            {children}
          </main>
        </section>
      </body>
    </html>
    
  )
}
