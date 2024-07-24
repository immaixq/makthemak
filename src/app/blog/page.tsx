import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog',
  description: 'Writing me thoughts down in progess..'
}
export default async function BlogPage() {
  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-5xl font-serif mb-6">Blog</h1>
      <BlogList blogs={sortedBlogs} />
    </section>
  );
}


