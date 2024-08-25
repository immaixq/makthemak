"use client";
import { useEffect, useState } from 'react';

interface LikeButtonProps {
    initialLikes: number;
    slug: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, slug }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);

    // fetch data from mongodb
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`/api/posts/${slug}/likes`);
                if (!response.ok) {

                    throw new Error('Failed to fetch likes');
                }
                const data = await response.json();
                setLikes(data.likes);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };
        fetchLikes();
    }, [slug]); // fetch likes whenever slug changes

    const handleLike = async () => {
        if (hasLiked) return;

        try {
            const response = await fetch(`/api/posts/${slug}/likes`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to like post');
            }

            const data = await response.json();
            setLikes(data.likes);
            setHasLiked(true);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className="font-mono border-solid border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            disabled={hasLiked}
        >
            {hasLiked ? '👍 Liked' : '👍 Like'} ({likes})
        </button>
    );
};

export default LikeButton;