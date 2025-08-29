import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
const prisma = new PrismaClient()

export async function GET() {
  try {
    // TODO: Get userId from session
    const userId = 1

    const allPlatforms = await prisma.platform.findMany()
    const userAccounts = await prisma.userAccount.findMany({
      where: { userId },
    })

    const platforms = allPlatforms.map((platform) => {
      const account = userAccounts.find((acc) => acc.platformId === platform.id)
      return {
        id: platform.id,
        name: platform.name,
        connected: !!account,
        followers: account?.followers_count || 0,
      }
    })

    return NextResponse.json({ platforms })
  } catch (error) {
    console.error("Error fetching platforms:", error)
    return NextResponse.json({ error: "Failed to fetch platforms" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platformId, action } = body
    
    if (!platformId) {
      return NextResponse.json({ error: "Platform ID is required" }, { status: 400 })
    }
    
    if (!action) {
      return NextResponse.json({ error: "Action is required" }, { status: 400 })
    }

    // TODO: Get userId from session
    const userId = 1

    const platform = await prisma.platform.findUnique({ 
      where: { id: platformId } 
    })
    
    if (!platform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 })
    }

    let message = ""
    let result

    if (action === "connect") {
      // Check if already connected
      const existingAccount = await prisma.userAccount.findUnique({
        where: {
          userId_platformId: {
            userId,
            platformId,
          },
        }
      })
      
      if (existingAccount) {
        return NextResponse.json({ 
          error: `${platform.name} is already connected` 
        }, { status: 400 })
      }
      
      result = await prisma.userAccount.create({
        data: {
          userId,
          platformId,
          account_name: "example", // TODO: Get from OAuth
          access_token: "example", // TODO: Get from OAuth
          followers_count: Math.floor(Math.random() * 10000) + 1000,
        },
      })
      message = `Successfully connected ${platform.name}`
    } else if (action === "disconnect") {
      const existingAccount = await prisma.userAccount.findUnique({
        where: {
          userId_platformId: {
            userId,
            platformId,
          },
        }
      })
      
      if (!existingAccount) {
        return NextResponse.json({ 
          error: `${platform.name} is not connected` 
        }, { status: 400 })
      }
      
      result = await prisma.userAccount.delete({
        where: {
          userId_platformId: {
            userId,
            platformId,
          },
        },
      })
      message = `Successfully disconnected ${platform.name}`
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      platform: result,
      message,
    })
  } catch (error) {
    console.error("Error managing platform connection:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
