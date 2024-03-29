import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

export const metadata = {
  title: 'Blog',
  description: 'Writing me thoughts down in progess..'
}
export default async function BlogPage() {

    return (
      <section>
        <h1 className="font-bold text-3xl md:text-5xl font-serif mb-6">Blog</h1>
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-10"
              href={`/blog/${post.slug}`}
              >
                <div className="mb-4 w-full flex flex-col">
                  <p className='text-xs font-mono mb-2'>{post.publishedAt}</p>
                    <h1 className="mb-3 text-base md:text-lg font-bold dark:text-amber-400 text-blue-700 ">{post.title}</h1>
                    <p className='text-sm md:text-base'>{post.summary}</p>
                    {/* <ViewCounter slug={post.slug} trackView={false} /> */}
                </div>
                <div className="flex flex-inline tracking-tighter">
                {post.tags?.map((tag,i) => {
                  const label = tag
                  return (
                    <div key={i}>
                      <div className='mr-4 text-xs border-solid border-2 border-sky-500 rounded-md px-2 py-1 tracking-tighter'>{label}</div>
                    </div>
                  )
                })}
            </div>
            </Link>
          ))}

      </section>
    );
  }


