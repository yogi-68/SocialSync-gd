import { NextResponse } from "next/server"

// Mock analytics data
const analyticsData = {
  totalFollowers: 41600,
  followerGrowth: 12.5,
  engagementRate: 4.8,
  engagementGrowth: 2.1,
  postsThisMonth: 127,
  postsGrowth: 8.2,
  totalReach: 89200,
  reachGrowth: 15.3,
  platformMetrics: [
    {
      platform: "twitter",
      followers: 12500,
      engagement: 4.2,
      growth: 0.8,
      posts: 45,
    },
    {
      platform: "facebook",
      followers: 8200,
      engagement: 3.8,
      growth: 1.2,
      posts: 32,
    },
    {
      platform: "instagram",
      followers: 15800,
      engagement: 5.4,
      growth: 2.1,
      posts: 38,
    },
    {
      platform: "linkedin",
      followers: 5100,
      engagement: 6.2,
      growth: 1.5,
      posts: 12,
    },
  ],
  weeklyData: [
    { week: "Week 1", reach: 18500, engagement: 892 },
    { week: "Week 2", reach: 21200, engagement: 1045 },
    { week: "Week 3", reach: 19800, engagement: 967 },
    { week: "Week 4", reach: 29700, engagement: 1456 },
  ],
}

export async function GET() {
  return NextResponse.json(analyticsData)
}
