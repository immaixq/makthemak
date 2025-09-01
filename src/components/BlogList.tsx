'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Blog {
    slug: string;
    title: string;
    publishedAt: string;
    summary: string;
    tags?: string[];
    likes: number;
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
        return Array.from(tags).sort();
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = !searchTerm ||
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.summary.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTag = !selectedTag || (blog.tags && blog.tags.includes(selectedTag));

            return matchesSearch && matchesTag;
        });
    }, [blogs, searchTerm, selectedTag]);

    const displayData = useMemo(() => {
        if (filteredBlogs.length === 0) {
            return { "No results match your filters": [] };
        }

        if (!searchTerm && !selectedTag) {
            const sortedBlogs = [...filteredBlogs].sort((a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
            return { "All Blogs": sortedBlogs };
        }

        let heading = "Filtered Results";
        if (selectedTag && !searchTerm) {
            heading = `Tag: ${selectedTag}`;
        } else if (searchTerm && !selectedTag) {
            heading = `Search Results for "${searchTerm}"`;
        } else if (searchTerm && selectedTag) {
             heading = `Search Results for "${searchTerm}" under Tag: ${selectedTag}`;
        }

        const sortedFilteredBlogs = [...filteredBlogs].sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        return { [heading]: sortedFilteredBlogs };
    }, [filteredBlogs, searchTerm, selectedTag]);

    return (
        <div className="flex">
            <div className="w-full space-y-6">
                {/* Search container with glass effect */}
                <div className="glass p-4">
                    <input
                        type="text"
                        placeholder="Search blogs by title or summary..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border-transparent rounded-lg bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500/50 dark:focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                    />
                </div>

                {/* Tag buttons with glass container */}
                {allTags.length > 0 && (
                    <div className="glass p-4">
                        <p className="text-sm font-semibold mb-3 dark:text-gray-300 text-gray-600">Filter by Tag:</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`text-xs font-mono px-3 py-1.5 relative transition-all duration-300 rounded-full glass-button ${!selectedTag ? 'bg-blue-600 text-white border-blue-600 dark:bg-amber-500 dark:border-amber-500' : 'text-gray-700 dark:text-gray-300 hover:bg-white/10'}`}
                            >
                                All
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`text-xs font-mono px-3 py-1.5 relative transition-all duration-300 rounded-full glass-button ${selectedTag === tag ? 'bg-blue-600 text-white border-blue-600 dark:bg-amber-500 dark:border-amber-500' : 'text-gray-700 dark:text-gray-300 hover:bg-white/10'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Display Logic using displayData */}
                {Object.entries(displayData).map(([heading, blogsInSection]) => (
                    <div key={heading} className="space-y-4">
                        {/* Section heading with glass effect */}
                        <div className="glass p-4">
                            <h2 className="text-2xl font-bold dark:text-gray-200 text-gray-800 font-mono">{heading}</h2>
                        </div>

                        {blogsInSection.length === 0 && heading !== "No results match your filters" ? (
                            <div className="glass p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400">No blogs found in this section.</p>
                            </div>
                        ) : null}

                        {heading === "No results match your filters" && (
                            <div className="glass p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400">No blog posts match your current search term or selected tag.</p>
                            </div>
                        )}

                        {/* Blog cards with enhanced glass effects */}
                        <div className="space-y-4">
                            {blogsInSection.map((blog: Blog) => (
                                <Link
                                    key={blog.slug}
                                    href={`/blog/${blog.slug}`}
                                    className="block group"
                                >
                                    <div className="glass glass-hover p-6 relative overflow-hidden transition-all duration-300">
                                        {/* Subtle gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="w-full flex flex-col space-y-3">
                                                {/* Date with icon */}
                                                <div className="flex items-center space-x-2">
                                                    <svg className="h-3 w-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className='text-xs font-mono text-gray-500 dark:text-gray-400'>{blog.publishedAt}</p>
                                                </div>
                                                
                                                {/* Title with subtle hover effect */}
                                                <h3 className="text-lg font-bold dark:text-amber-400 text-blue-700 group-hover:text-blue-800 dark:group-hover:text-amber-300 transition-colors duration-200">
                                                    {blog.title}
                                                </h3>
                                                
                                                {/* Summary */}
                                                <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                                                    {blog.summary}
                                                </p>
                                                
                                                {/* Tags with glass effect */}
                                                {blog.tags && blog.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {blog.tags.map((tag, i) => (
                                                            <span key={i} className='text-xs border border-sky-500 dark:border-sky-700 text-sky-700 dark:text-sky-300 rounded-full px-3 py-1 glass-subtle transition-colors duration-200 hover:bg-sky-500/10'> 
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                {/* Read more indicator */}
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors mt-4">
                                                    <span className="text-sm font-medium">Read more</span>
                                                    <svg className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;