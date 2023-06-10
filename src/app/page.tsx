"use client"
import { about } from '@/lib/info';
import { motion } from 'framer-motion';

// const variants = {
//   initial: { opacity: 0, y: 50, clipPath: 'inset(10% 0 0 0)' },
//   animate: {
//     opacity: 1,
//     y: 0,
//     clipPath: 'inset(0 0 0 0)',
//     transition: {
//       type: 'spring',
//       duration: 0.5}
//   },
// };

export default function Home() {
  return (
    <motion.div
    initial="initial"
    animate="animate"
    // variants={variants}
  >
    <section className='mx-auto'>
      <div className='flex'>
      <h1 className='font-bold text-5xl md:text-7xl font-serif'>Welcome to MaktheMak&apos;s!</h1>

        </div>
      <div>
        <p className='my-10 max-w-[640px] text-neutral-700 dark:text-neutral-200'>
          {about()}
        </p>
      </div>

        <div className="flex flex-col">
          <div className="flex">
            <h1 className="mb-5 pr-5 text-lg font-semibold ">Find me on</h1>
            <div>
              <div key="{item}" className="mb-5 flex gap-3">
                <svg className="fill-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
            </div>
          </div>
        </div>

  <div className="mt-8 relative flex overflow-x-hidden font-bold font-serif border-y-4">
    <div className="py-12 animate-marquee whitespace-nowrap">
      <span className="text-4xl mx-4">Data Science</span>
      <span className="text-4xl mx-4">✨</span>
      <span className="text-4xl mx-4">Web3</span>
      <span className="text-4xl mx-4">✨</span>
      <span className="text-4xl mx-4">AI</span>
      <span className="text-4xl mx-4">✨</span>
    </div>

    <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
      <span className="text-4xl mx-4">Data Science</span>
      <span className="text-4xl mx-4">✨</span>
      <span className="text-4xl mx-4">Web3</span>
      <span className="text-4xl mx-4">✨</span>
      <span className="text-4xl mx-4">AI</span>
      <span className="text-4xl mx-4">✨</span>
    </div>
  </div>

        
    </section>
    </motion.div>
  )
}
