import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
const prisma = new PrismaClient()
import { subDays, startOfMonth, endOfMonth, format } from "date-fns"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    // Get userId from session
    const session = await getSession()
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const userId = session.userId as number

    const userAccounts = await prisma.userAccount.findMany({
      where: { userId, is_active: true },
      include: { platform: true },
    })

    const totalFollowers = userAccounts.reduce(
      (sum, acc) => sum + (acc.followers_count || 0),
      0
    )

  const now = new Date()
  const oneMonthAgo = subDays(now, 30)
  const startOfThisMonth = startOfMonth(now)
  const endOfThisMonth = endOfMonth(now)

  const postsThisMonth = await prisma.post.count({
    where: {
      userId,
      createdAt: {
        gte: startOfThisMonth,
        lte: endOfThisMonth,
      },
    },
  })

  const postsLastMonth = await prisma.post.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(oneMonthAgo),
        lte: endOfMonth(oneMonthAgo),
      },
    },
  })

  const postsGrowth =
    postsLastMonth > 0
      ? ((postsThisMonth - postsLastMonth) / postsLastMonth) * 100
      : postsThisMonth > 0
      ? 100
      : 0

  const analyticsLast30Days = await prisma.analytics.findMany({
    where: {
      post: { userId },
      recorded_at: { gte: oneMonthAgo },
    },
  })

  const totalReach = analyticsLast30Days.reduce((sum, a) => sum + a.views, 0)
  const totalEngagement = analyticsLast30Days.reduce(
    (sum, a) => sum + a.likes + a.comments + a.shares,
    0
  )
  const engagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0

  const platformMetrics = await Promise.all(
    userAccounts.map(async (account) => {
      const postsCount = await prisma.postPlatform.count({
        where: {
          platformId: account.platformId,
          post: { userId },
        },
      })
      const platformAnalytics = analyticsLast30Days.filter(
        (a) => a.platformId === account.platformId
      )
      const platformEngagement = platformAnalytics.reduce(
        (sum, a) => sum + a.likes + a.comments + a.shares,
        0
      )
      return {
        platform: account.platform.name,
        followers: account.followers_count,
        engagement: platformEngagement,
        growth: 0, // Placeholder
        posts: postsCount,
      }
    })
  )

  // Generate weekly data for the last 4 weeks
  const weeklyData = [];
  for (let i = 0; i < 4; i++) {
    const weekStart = subDays(now, (i + 1) * 7);
    const weekEnd = subDays(now, i * 7);
    
    const weeklyAnalytics = analyticsLast30Days.filter(
      a => new Date(a.recorded_at) >= weekStart && new Date(a.recorded_at) < weekEnd
    );
    
    const weekReach = weeklyAnalytics.reduce((sum, a) => sum + a.views, 0);
    const weekEngagement = weeklyAnalytics.reduce(
      (sum, a) => sum + a.likes + a.comments + a.shares, 0
    );
    
    weeklyData.unshift({
      week: `Week ${4-i}`,
      reach: weekReach,
      engagement: weekEngagement
    });
  }

  const analyticsData = {
    totalFollowers,
    followerGrowth: 5.2, // Sample growth percentage
    engagementRate,
    engagementGrowth: 2.1, // Sample growth percentage
    postsThisMonth,
    postsGrowth,
    totalReach,
    reachGrowth: 8.4, // Sample growth percentage
    platformMetrics,
    weeklyData,
  }

  return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
