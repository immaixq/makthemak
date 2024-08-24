import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb'; // Adjust the import based on your project structure
import Post from '@/models/Post'; // Adjust the import based on your project structure

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    await dbConnect(); // Connect to the MongoDB database

    try {
        // Fetch the post by slug from the 'personal' collection
        const post = await Post.findOne({ slug: params.slug });

        // Check if the post exists
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Return the likes count
        return NextResponse.json({ likes: post.likes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the likes.' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
    await dbConnect(); // Connect to the MongoDB database

    try {
        // Fetch the post by slug from the my collection
        const post = await Post.findOne({ slug: params.slug });

        // Check if the post exists
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Increment the likes count
        post.likes++;
        await post.save();

        // Return the updated likes count
        return NextResponse.json({ likes: post.likes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while liking the post.' }, { status: 500 });
    }
}