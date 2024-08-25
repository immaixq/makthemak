"use client";
import { useEffect, useState } from 'react';

interface LikeButtonProps {
    initialLikes: number;
    slug: string;
}

interface LikeResponse {
    likes: number;
}

const useFetchLikes = (slug: string) => {
    const [likes, setLikes] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLikes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/posts/${slug}/likes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch likes');
                }
                const data: LikeResponse = await response.json();
                setLikes(data.likes);
            } catch {
                // Handle error here
            } finally {
                setLoading(false);
            }
        };
        fetchLikes();
    }, [slug]);

    return { likes, error, loading };
};

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, slug }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const { likes, error, loading } = useFetchLikes(slug);

    const handleLike = async () => {
        if (hasLiked) return;

        try {
            const response = await fetch(`/api/posts/${slug}/likes`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to like post');
            }

            const data: LikeResponse = await response.json();
            setHasLiked(true);
            // Update likes count after liking
            setLikes(data.likes);
        } catch (error) {
            console.error('Error liking post:', error);
            // Optionally handle error state here, e.g., show a message
        }
    };

    return (
        <div>
            {loading ? (
                <span>Loading...</span>
            ) : error ? (
                <span>Error: {error}</span>
            ) : (
                <button
                    onClick={handleLike}
                    className="font-mono border-solid border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                    disabled={hasLiked}
                    aria-label={hasLiked ? "You liked this post" : "Like this post"}
                >
                    {hasLiked ? '👍 Liked' : '👍 Like'} {likes}
                </button>
            )}
        </div>
    );
};

export default LikeButton;

function setLikes(likes: number) {
    throw new Error('Function not implemented.');
}
