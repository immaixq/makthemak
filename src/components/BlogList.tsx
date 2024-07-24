// components/BlogList.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Blog {
    slug: string;
    title: string;
    publishedAt: string;
    summary: string;
    tags?: string[];
}

interface BlogListProps {
    blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogs.forEach(blog => blog.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (!searchTerm) return blogs;
        return blogs.filter(blog =>
            (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedTag || blog.tags?.includes(selectedTag))
        );
    }, [blogs, searchTerm, selectedTag]);

    const groupedBlogs = useMemo(() => {
        if (!searchTerm) return { "All Blogs": blogs };
        const groups: { [key: string]: Blog[] } = {};
        filteredBlogs.forEach(blog => {
            blog.tags?.forEach(tag => {
                if (!groups[tag]) groups[tag] = [];
                groups[tag].push(blog);
            });
        });
        return groups;
    }, [filteredBlogs, searchTerm, blogs]);

    return (
        <div className="flex">
            <div className="w-5/6">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border-transparent rounded bg-transparent border-b-gray-300 text-gray-700 focus:outline-none"
                />
                {searchTerm && (
                    <div className="mb-4">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`mr-2 mb-2 px-3 py-1 relative transition-colors duration-300 ${!selectedTag ? 'text-white' : 'bg-transparent'}`}
                        >
                            All
                            <span className={`scribbly-underline ${!selectedTag ? 'active' : ''}`}></span>
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`text-sm  mr-2 mb-2 px-3 py-1 relative transition-colors duration-300 ${selectedTag === tag ? 'text-white' : 'bg-transparent'}`}
                            >
                                {tag}
                                <span className={`scribbly-underline ${selectedTag === tag ? 'active' : ''}`}></span>
                            </button>
                        ))}
                    </div>
                )}
                {Object.entries(groupedBlogs).map(([tag, blogs]) => (
                    <div key={tag} className="mb-8">
                        {searchTerm && <h2 className="text-2xl font-bold mb-4">{tag}</h2>}
                        {blogs.map((blog) => (
                            <div key={blog.slug} className="flex flex-col space-y-1 mb-4">
                                <div className="w-full flex flex-col">
                                    <p className='text-xs font-mono mb-2'>{blog.publishedAt}</p>
                                    <Link href={`/blog/${blog.slug}`} className="mb-2 text-lg font-bold dark:text-amber-400 text-blue-700 hover:">
                                        {blog.title}
                                    </Link>
                                    <p className='text-sm'>{blog.summary}</p>
                                </div>
                                <div className="flex flex-wrap">
                                    {blog.tags?.map((tag, i) => (
                                        <div key={i} className='mr-2 mb-2 text-xs border-solid border-2 border-sky-500 rounded-md px-2 py-1'>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}            </div>
        </div>

    );
};

export default BlogList;
