"use client";
import { useEffect, useState } from 'react';

interface LikeButtonProps {
    initialLikes: number;
    slug: string;
}

interface LikeResponse {
    likes: number;
    message?: string;
}

interface LikeState {
    likes: number;
    isLiking: boolean;
    hasLiked: boolean;
    error: string | null;
    loading: boolean;
    rateLimited: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, slug }) => {
    const [state, setState] = useState<LikeState>({
        likes: initialLikes,
        isLiking: false,
        hasLiked: false,
        error: null,
        loading: true,
        rateLimited: false,
    });

    // Load like state and fetch current likes
    useEffect(() => {
        const hasLiked = typeof window !== 'undefined' 
            ? localStorage.getItem(`liked_${slug}`) === 'true'
            : false;

        const fetchLikes = async () => {
            try {
                const response = await fetch(`/api/posts/${slug}/likes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch likes');
                }
                const data: LikeResponse = await response.json();
                setState(prev => ({
                    ...prev,
                    likes: data.likes,
                    hasLiked,
                    loading: false,
                    error: null,
                }));
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load likes',
                    hasLiked,
                }));
            }
        };

        fetchLikes();
    }, [slug]);

    const handleLike = async () => {
        if (state.isLiking || state.hasLiked || state.rateLimited) return;

        setState(prev => ({ ...prev, isLiking: true, error: null }));

        try {
            const response = await fetch(`/api/posts/${slug}/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data: LikeResponse = await response.json();

            if (response.ok) {
                setState(prev => ({
                    ...prev,
                    likes: data.likes,
                    hasLiked: true,
                    isLiking: false,
                    error: null,
                }));

                // Remember that user liked this post
                if (typeof window !== 'undefined') {
                    localStorage.setItem(`liked_${slug}`, 'true');
                }
            } else {
                // Handle different error types
                let errorMessage = data.message || 'Failed to like post';
                let rateLimited = false;

                if (response.status === 429) {
                    errorMessage = 'Too many likes! Please wait before trying again.';
                    rateLimited = true;
                    
                    // Clear rate limit after 1 minute
                    setTimeout(() => {
                        setState(prev => ({ ...prev, rateLimited: false, error: null }));
                    }, 60000);
                } else if (response.status === 400) {
                    errorMessage = 'Invalid request';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }

                setState(prev => ({
                    ...prev,
                    isLiking: false,
                    error: errorMessage,
                    rateLimited,
                }));
            }
        } catch (error) {
            console.error('Network error liking the post:', error);
            setState(prev => ({
                ...prev,
                isLiking: false,
                error: 'Network error. Please check your connection.',
            }));
        }
    };

    const handleRetry = () => {
        setState(prev => ({ ...prev, error: null, rateLimited: false }));
    };

    if (state.loading) {
        return (
            <div className="flex items-center font-mono">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded px-4 py-2 mr-2 h-10 w-24"></div>
                <span className="text-gray-500">Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col font-mono">
            <div className="flex items-center">
                <button
                    onClick={handleLike}
                    disabled={state.isLiking || state.hasLiked || state.rateLimited}
                    className={`mr-3 px-4 py-2 rounded-lg transition-all duration-200 border-2 glass-button ${
                        state.hasLiked
                            ? 'bg-green-500 border-green-500 text-white cursor-not-allowed'
                            : state.rateLimited
                            ? 'bg-yellow-200 dark:bg-yellow-800 border-yellow-400 text-yellow-800 dark:text-yellow-200 cursor-not-allowed'
                            : state.isLiking
                            ? 'bg-blue-400 border-blue-400 text-white cursor-wait'
                            : 'bg-transparent border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white hover:scale-105'
                    }`}
                    title={
                        state.hasLiked 
                            ? 'You already liked this post' 
                            : state.rateLimited 
                            ? 'Rate limited - please wait'
                            : 'Like this post'
                    }
                    aria-label={state.hasLiked ? 'Already liked' : 'Like post'}
                >
                    {state.isLiking ? (
                        <span className="flex items-center">
                            <span className="animate-spin mr-1">⏳</span>
                            Liking...
                        </span>
                    ) : state.hasLiked ? (
                        <span>✅ Liked {state.likes}</span>
                    ) : (
                        <span>👍 Like {state.likes}</span>
                    )}
                </button>
            </div>

            {/* Error message */}
            {state.error && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300 glass-subtle">
                    <div className="flex items-center justify-between">
                        <span>{state.error}</span>
                        {!state.hasLiked && (
                            <button
                                onClick={handleRetry}
                                className="ml-2 text-red-600 dark:text-red-400 hover:underline"
                            >
                                Retry
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Success message */}
            {state.hasLiked && !state.error && (
                <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                    Thanks for liking this post! ✨
                </div>
            )}
        </div>
    );
};

export default LikeButton;
