import { allBlogs } from "contentlayer/generated";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from "@/components/MDXComponents/mdx";
import Footer from '@/components/Layout/Footer/Footer'
import Tags from "@/components/Tags";
import LikeButton from "@/components/MDXComponents/LikeButton";
import PostClient from "@/components/PostClient"; // Import the new client component

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    // get all mdx files
    slug: post.slug,
  }));
}


export default async function Post({ params }: { params: { slug: string } }) {
  const post = allBlogs.find((post) => post.slug == params.slug)
  if (!post) {
    notFound();
  }



  return (
    <section>
      <div>
        <div className="font-bold text-3xl font-serif">
          <h2>{post.title}</h2>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm ">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
            {post.publishedAt}
          </div>
          <div className="text-xs ml-5 flex flex-inline tracking-tighter">
            <Tags tags={post.tags || []} />
          </div>
          {post.revisedAt && (
            <div className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
              Revised on: {post.revisedAt}
            </div>
          )}
        </div>
        <div className="">
          <div className="">
            <Mdx code={post.body.code} />
          </div>
        </div>

        <PostClient slug={post.slug} initialLikes={post.likes} />
      </div>
      <Footer />
    </section>
  )
}
