import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
const prisma = new PrismaClient()

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        platforms: {
          include: {
            platform: true,
          },
        },
        analytics: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    
    // Parse media_urls from JSON string to array
    const parsedPosts = posts.map(post => ({
      ...post,
      media_urls: JSON.parse(post.media_urls)
    }))
    
    return NextResponse.json({ posts: parsedPosts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }
    
    if (!body.platforms || !Array.isArray(body.platforms) || body.platforms.length === 0) {
      return NextResponse.json({ error: "At least one platform is required" }, { status: 400 })
    }
    
    // TODO: Get userId from session
    const userId = 1

    const newPost = await prisma.post.create({
      data: {
        content: body.content,
        userId: userId,
        media_urls: JSON.stringify(body.media_urls || []),
        scheduled_for: body.scheduledFor,
        status: body.scheduledFor ? "scheduled" : "published",
        platforms: {
          create: body.platforms.map((platformId: number) => ({
            platform: {
              connect: { id: platformId },
            },
          })),
        },
      },
      include: {
        platforms: true,
      },
    })

    // Simulate posting to social media platforms
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      post: {
        ...newPost,
        media_urls: JSON.parse(newPost.media_urls)
      },
      message: `Successfully posted to ${body.platforms.length} platform(s)`,
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 })
    }

    const postId = Number.parseInt(id)
    
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Delete post (cascade delete will handle related records)
    await prisma.post.delete({
      where: { id: postId }
    })

    return NextResponse.json({ success: true, message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
