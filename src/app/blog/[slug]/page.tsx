import { allBlogs } from "contentlayer/generated";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from "@/components/MDXComponents/mdx";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    // get all mdx files
    slug: post.slug,
  }));
}


export default async function Post({params}: { params: { slug: string}}) {
  const post = allBlogs.find((post) => post.slug == params.slug)
  if (!post) {
    notFound();
  }

  return (
    <section>
        <div>
          <div className="font-bold text-3xl font-serif">
            <h1>{post.title}</h1>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm ">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
              {post.publishedAt}
            </div>
            <div className="ml-5 flex flex-inline tracking-tighter">
              {post.tags?.map((tag,i) => {
                const label = tag
                return (
                  <div key={i}>
                    <div className='text-xs ml-4 border-solid border-2 border-sky-500 rounded-md px-2 py-1 tracking-tighter'>{label}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="grid grid-flow-col gap-6">
            <div className="col-span-4">
              <Mdx code={post.body.code} />
            </div>
            <div className="font-serif">
              <h1 className=" font-bold dark:text-amber-400	text-blue-700	">Table of Contents</h1>
              <ul className=" mt-4 space-y-5 text-xs">
                <li key="content-1" className="line-clamp-2 hover:text-accent">
                  <a href="">Testing</a>
                </li>
                <li key="content-2" className="line-clamp-2 hover:text-accent">
                  <a href="">Another dummy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
  )
}
