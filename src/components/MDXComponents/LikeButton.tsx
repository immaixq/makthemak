"use client";
// components/LikeButton.tsx
import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
  slug: string; // Add slug to identify the post
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, slug }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false); // Track if the user has liked the post

  const handleLike = async () => {
    // Prevent multiple likes
    if (hasLiked) return;

    // Optimistically update the UI
    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true); // Mark as liked

    const response = await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });

    if (!response.ok) {
      // If the request fails, revert the optimistic update
      setLikes(likes);
      setHasLiked(false); // Revert liked state
      console.error('Failed to update likes');
    }
  };

  return (
    <button
      onClick={handleLike}
      className="font-mono border-solid border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 "
      disabled={hasLiked} // Disable button if already liked
    >
      {hasLiked ? '👍' : '👍'} {likes}
    </button>
  );
};

export default LikeButton;