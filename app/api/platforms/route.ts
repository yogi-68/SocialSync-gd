import { type NextRequest, NextResponse } from "next/server"

// Mock platform connections
const connectedPlatforms = [
  { id: "twitter", name: "Twitter/X", connected: true, followers: 12500 },
  { id: "facebook", name: "Facebook", connected: true, followers: 8200 },
  { id: "instagram", name: "Instagram", connected: true, followers: 15800 },
  { id: "linkedin", name: "LinkedIn", connected: true, followers: 5100 },
  { id: "tiktok", name: "TikTok", connected: false, followers: 0 },
  { id: "youtube", name: "YouTube", connected: false, followers: 0 },
]

export async function GET() {
  return NextResponse.json({ platforms: connectedPlatforms })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { platformId, action } = body

  const platformIndex = connectedPlatforms.findIndex((p) => p.id === platformId)

  if (platformIndex === -1) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 })
  }

  if (action === "connect") {
    connectedPlatforms[platformIndex].connected = true
    // Simulate getting follower count
    connectedPlatforms[platformIndex].followers = Math.floor(Math.random() * 10000) + 1000
  } else if (action === "disconnect") {
    connectedPlatforms[platformIndex].connected = false
    connectedPlatforms[platformIndex].followers = 0
  }

  return NextResponse.json({
    success: true,
    platform: connectedPlatforms[platformIndex],
    message: `Successfully ${action}ed ${connectedPlatforms[platformIndex].name}`,
  })
}
