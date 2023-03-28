import Image from 'next/image'
import { avatar, about } from '@/lib/info';

export default function Home() {
  return (
    <section>
      <h1 className='font-bold text-7xl font-serif '>Welcome to MaktheMak&apos;s!</h1>
      <div className=''>
        <p className='my-10 max-w-[640px] text-neutral-800 dark:text-neutral-200'>
          {about()}
        </p>
      </div>
      <div className="flex">
        <div className="pr-12">
          <Image
            alt="mak"
            className="rounded-md shadow-md border border-4 border-amber-500"
            src={avatar}
            width={150}
            />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="mb-5 pr-5 font-serif text-lg font-semibold">Find me on</h1>
            <div className='font-mono'>
              <div key="{item}" className="mb-5 flex gap-3">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb-5 pr-5 font-serif text-lg font-semibold">Hear more from me</h1>
            <div className="flex">
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" type="email" name="email" id="email" placeholder="Type your email"/>
              <button type="submit" className="text-white rounded-l-none  bg-slate-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
