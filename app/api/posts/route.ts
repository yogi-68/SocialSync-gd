import { type NextRequest, NextResponse } from "next/server"

// Mock database
let posts: any[] = [
  {
    id: 1,
    content: "Just launched our new feature! 🚀 What do you think?",
    platforms: ["twitter", "facebook", "linkedin"],
    scheduledFor: "2024-01-15T10:00:00Z",
    status: "published",
    createdAt: "2024-01-15T09:45:00Z",
    metrics: { views: 1250, likes: 89, comments: 12, shares: 5 },
  },
]

export async function GET() {
  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newPost = {
    id: posts.length + 1,
    content: body.content,
    platforms: body.platforms,
    scheduledFor: body.scheduledFor || new Date().toISOString(),
    status: body.scheduledFor ? "scheduled" : "published",
    createdAt: new Date().toISOString(),
    metrics: { views: 0, likes: 0, comments: 0, shares: 0 },
  }

  posts.push(newPost)

  // Simulate posting to social media platforms
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({
    success: true,
    post: newPost,
    message: `Successfully posted to ${body.platforms.length} platform(s)`,
  })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 })
  }

  posts = posts.filter((post) => post.id !== Number.parseInt(id))

  return NextResponse.json({ success: true, message: "Post deleted successfully" })
}
