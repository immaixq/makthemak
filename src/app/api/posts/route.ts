import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(request: Request) {
    await dbConnect();
    // test if db connection is ok
    // console.log(await dbConnect());

    try {
        const posts = await Post.find();
        return NextResponse.json(posts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching posts.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {
        const post = await request.json();
        await Post.create(post);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating a post.' }, { status: 500 });
    }
}