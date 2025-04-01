'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Blog {
    slug: string;
    title: string;
    publishedAt: string;
    summary: string;
    tags?: string[];
    likes: number; // Assuming likes might be used later
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
        return Array.from(tags).sort(); // Added sort for consistent order
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = !searchTerm ||
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.summary.toLowerCase().includes(searchTerm.toLowerCase());

            // Ensure blog.tags exists and includes selectedTag
            const matchesTag = !selectedTag || (blog.tags && blog.tags.includes(selectedTag));

            return matchesSearch && matchesTag;
        });
    }, [blogs, searchTerm, selectedTag]);

    // Revised Grouping Logic - simpler approach when filters are active
    const displayData = useMemo(() => {
        if (filteredBlogs.length === 0) {
            // Use a distinct key for no results
            return { "No results match your filters": [] };
        }

        // If no filters are active, show all under one heading
        if (!searchTerm && !selectedTag) {
            // Sort blogs by date (newest first) when showing all
            const sortedBlogs = [...filteredBlogs].sort((a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
            return { "All Blogs": sortedBlogs };
        }

        // If filters ARE active, just return the filtered list under a dynamic heading
        // You could get more complex here if needed (e.g., group by selected tag)
        let heading = "Filtered Results";
        if (selectedTag && !searchTerm) {
            heading = `Tag: ${selectedTag}`;
        } else if (searchTerm && !selectedTag) {
            heading = `Search Results for "${searchTerm}"`;
        } else if (searchTerm && selectedTag) {
             heading = `Search Results for "${searchTerm}" under Tag: ${selectedTag}`;
        }

         // Sort filtered results too
         const sortedFilteredBlogs = [...filteredBlogs].sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
         );

        return { [heading]: sortedFilteredBlogs };

    }, [filteredBlogs, searchTerm, selectedTag]);


    return (
        <div className="flex">
            {/* Consider a sidebar layout if tags become numerous */}
            <div className="w-full"> {/* Changed from empty class */}
                <input
                    type="text"
                    placeholder="Search blogs by title or summary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // Removed hide-on-mobile unless specifically needed
                    className="w-full p-2 mb-4 border-transparent rounded bg-transparent border-b border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-amber-400"
                />

                {/* Tag buttons are now always visible */}
                {allTags.length > 0 && ( // Only show tags if there are any
                    <div className="mb-4">
                         <p className="text-sm font-semibold mb-2 dark:text-gray-400 text-gray-600">Filter by Tag:</p>
                        <button
                            onClick={() => setSelectedTag(null)}
                            // Apply active style correctly when no tag is selected
                            className={`text-xs font-mono mr-2 mb-2 px-3 py-1 relative transition-colors duration-300 border rounded-md ${!selectedTag ? 'bg-blue-600 text-white border-blue-600 dark:bg-amber-500 dark:border-amber-500' : 'bg-transparent border-gray-400 dark:border-gray-600 hover:border-blue-500 dark:hover:border-amber-400'}`}
                        >
                            All
                            {/* Optional: Underline logic can be kept or simplified */}
                            {/* <span className={`scribbly-underline ${!selectedTag ? 'active' : ''}`}></span> */}
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`text-xs font-mono mr-2 mb-2 px-3 py-1 relative transition-colors duration-300 border rounded-md ${selectedTag === tag ? 'bg-blue-600 text-white border-blue-600 dark:bg-amber-500 dark:border-amber-500' : 'bg-transparent border-gray-400 dark:border-gray-600 hover:border-blue-500 dark:hover:border-amber-400'}`}
                            >
                                {tag}
                                {/* <span className={`scribbly-underline ${selectedTag === tag ? 'active' : ''}`}></span> */}
                            </button>
                        ))}
                    </div>
                )}

                {/* Display Logic using displayData */}
                {Object.entries(displayData).map(([heading, blogsInSection]) => (
                    <div key={heading} className="mb-8 font-mono">
                        {/* Always show the heading */}
                        <h2 className="text-2xl font-bold mb-4 dark:text-gray-200 text-gray-800">{heading}</h2>

                        {blogsInSection.length === 0 && heading !== "No results match your filters" ? (
                            <p className="text-gray-500 dark:text-gray-400">No blogs found in this section.</p>
                        ): null }
                        {/* Special message for no results overall */}
                         {heading === "No results match your filters" && (
                             <p className="text-gray-500 dark:text-gray-400">No blog posts match your current search term or selected tag.</p>
                         )}

                        {blogsInSection.map((blog : Blog) => (
                            <Link
                                key={blog.slug}
                                href={`/blog/${blog.slug}`}
                                className="block p-4 mb-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200" // Enhanced styling for link block
                            >
                                <div className="w-full flex flex-col">
                                    <p className='text-xs font-mono mb-2 text-gray-500 dark:text-gray-400'>{blog.publishedAt}</p>
                                    <h3 className="mb-2 text-lg font-bold dark:text-amber-400 text-blue-700">{blog.title}</h3>
                                    <p className='text-sm text-gray-700 dark:text-gray-300'>{blog.summary}</p>
                                </div>
                                {blog.tags && blog.tags.length > 0 && ( // Render tags section only if tags exist
                                    <div className="flex flex-wrap mt-3">
                                        {blog.tags.map((tag, i) => (
                                            <div key={i} className='mr-2 mb-1 text-xs border border-sky-500 dark:border-sky-700 text-sky-700 dark:text-sky-300 rounded-md px-2 py-0.5'> {/* Adjusted padding/margin */}
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;