import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { validateSlug, getClientIP, hashIP, securityHeaders, logSecurityEvent } from '@/lib/security';

// Rate limiting map (in production, use Redis)
const ipLikeCounts = new Map<string, { count: number; resetTime: number }>();

function checkLikeRateLimit(ipHash: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxLikes = 5; // 5 likes per minute per IP
  
  const current = ipLikeCounts.get(ipHash);
  
  if (!current || now > current.resetTime) {
    ipLikeCounts.set(ipHash, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (current.count >= maxLikes) {
    return { allowed: false, resetTime: current.resetTime };
  }
  
  current.count++;
  return { allowed: true };
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        // Apply security headers
        const headers = new Headers();
        Object.entries(securityHeaders).forEach(([key, value]) => {
            headers.set(key, value);
        });

        // Validate slug
        const slugValidation = validateSlug(params.slug);
        if (!slugValidation.isValid) {
            logSecurityEvent('Invalid slug in GET request', { slug: params.slug, ip: getClientIP(request) });
            return NextResponse.json(
                { error: slugValidation.error },
                { status: 400, headers }
            );
        }

        await dbConnect();

        const post = await Post.findOne({ slug: params.slug });
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404, headers }
            );
        }

        return NextResponse.json(
            { likes: post.likes || 0 },
            { status: 200, headers }
        );
    } catch (error) {
        console.error('GET /api/posts/[slug]/likes error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logSecurityEvent('API error in likes GET', { slug: params.slug, error: errorMessage });
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { 
                status: 500, 
                headers: new Headers(Object.entries(securityHeaders))
            }
        );
    }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        // Apply security headers
        const headers = new Headers();
        Object.entries(securityHeaders).forEach(([key, value]) => {
            headers.set(key, value);
        });

        // Validate slug
        const slugValidation = validateSlug(params.slug);
        if (!slugValidation.isValid) {
            logSecurityEvent('Invalid slug in POST request', { slug: params.slug, ip: getClientIP(request) });
            return NextResponse.json(
                { error: slugValidation.error },
                { status: 400, headers }
            );
        }

        // Get and validate IP
        const clientIP = getClientIP(request);
        const ipHash = hashIP(clientIP);

        // Check rate limiting
        const rateLimitCheck = checkLikeRateLimit(ipHash);
        if (!rateLimitCheck.allowed) {
            logSecurityEvent('Rate limit exceeded for likes', { slug: params.slug, ipHash });
            const resetTime = rateLimitCheck.resetTime ? Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000) : 60;
            return NextResponse.json(
                { error: 'Too many likes. Please wait before trying again.' },
                { 
                    status: 429, 
                    headers: {
                        ...headers,
                        'Retry-After': resetTime.toString()
                    }
                }
            );
        }

        await dbConnect();

        const post = await Post.findOne({ slug: params.slug });
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404, headers }
            );
        }

        // Increment likes with atomic operation
        const updatedPost = await Post.findOneAndUpdate(
            { slug: params.slug },
            { $inc: { likes: 1 } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return NextResponse.json(
                { error: 'Failed to update likes' },
                { status: 500, headers }
            );
        }

        // Log successful like (without sensitive data)
        console.log(`Post liked: ${params.slug}, new count: ${updatedPost.likes}`);

        return NextResponse.json(
            { 
                likes: updatedPost.likes,
                message: 'Post liked successfully'
            },
            { status: 200, headers }
        );

    } catch (error) {
        console.error('POST /api/posts/[slug]/likes error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logSecurityEvent('API error in likes POST', { slug: params.slug, error: errorMessage });

        return NextResponse.json(
            { error: 'Internal server error' },
            { 
                status: 500, 
                headers: new Headers(Object.entries(securityHeaders))
            }
        );
    }
}