// src/app/api/like/route.ts
import { NextResponse } from 'next/server';
import { allBlogs } from 'contentlayer/generated';

export async function POST(req: Request) {
  const { slug } = await req.json();

  // Find the post by slug
  const post = allBlogs.find(post => post.slug === slug);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Initialize likes if it doesn't exist
  if (typeof post.likes !== 'number') {
    post.likes = 0;
  }

  // Increment likes
  post.likes += 1;

  return NextResponse.json({ message: "Liked", likesCount: post.likes });
}