"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import LikeButton from "@/components/MDXComponents/LikeButton";

interface PostClientProps {
    slug: string;
    initialLikes: number;
}

const PostClient: React.FC<PostClientProps> = ({ slug, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);

    useEffect(() => {
        const fetchLikes = async () => {
            const response = await fetch(`/api/posts/${slug}/likes`);
            if (response.ok) {
                const data = await response.json();
                setLikes(data.likes);
            } else {
                console.error('Failed to fetch likes:', response.statusText);
            }
        };

        fetchLikes();
    }, [slug]);

    return (
        <LikeButton initialLikes={likes} slug={slug} />
    );
};

export default PostClient;