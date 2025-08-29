import { PrismaClient } from "../lib/generated/prisma"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create a default user
  const password_hash = await hash("password123", 10)
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@example.com",
      password_hash,
      plan: "pro",
    },
  })
  console.log(`Created user: ${user.name} (${user.email})`)

  // Create social media platforms
  const platforms = await Promise.all([
    prisma.platform.create({
      data: {
        name: "Twitter/X",
        api_endpoint: "https://api.twitter.com/2/",
      },
    }),
    prisma.platform.create({
      data: {
        name: "Facebook",
        api_endpoint: "https://graph.facebook.com/",
      },
    }),
    prisma.platform.create({
      data: {
        name: "Instagram",
        api_endpoint: "https://graph.instagram.com/",
      },
    }),
    prisma.platform.create({
      data: {
        name: "LinkedIn",
        api_endpoint: "https://api.linkedin.com/v2/",
      },
    }),
    prisma.platform.create({
      data: {
        name: "TikTok",
        api_endpoint: "https://open-api.tiktok.com/",
      },
    }),
    prisma.platform.create({
      data: {
        name: "YouTube",
        api_endpoint: "https://www.googleapis.com/youtube/v3/",
      },
    }),
  ])
  console.log(`Created ${platforms.length} social platforms`)

  // Connect user to platforms
  await Promise.all(
    platforms.slice(0, 4).map((platform) =>
      prisma.userAccount.create({
        data: {
          userId: user.id,
          platformId: platform.id,
          account_name: `${user.name.replace(" ", "")}@${platform.name.toLowerCase()}`,
          access_token: "mock-token-" + platform.id,
          followers_count: Math.floor(Math.random() * 10000) + 1000,
        },
      })
    )
  )
  console.log(`Connected user to 4 platforms`)

  // Create some sample posts
  const post1 = await prisma.post.create({
    data: {
      userId: user.id,
      content: "Just launched our new feature! 🚀 What do you think?",
      media_urls: JSON.stringify([]),
      status: "published",
      published_at: new Date(),
      platforms: {
        create: [1, 2, 3].map((id) => ({
          platform: { connect: { id } },
          status: "published",
          published_at: new Date(),
        })),
      },
    },
  })

  const post2 = await prisma.post.create({
    data: {
      userId: user.id,
      content: "Excited to announce our new partnership with @acmecorp! #partnership #growth",
      media_urls: JSON.stringify([]),
      status: "scheduled",
      scheduled_for: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      platforms: {
        create: [1, 4].map((id) => ({
          platform: { connect: { id } },
          status: "pending",
        })),
      },
    },
  })

  // Add analytics
  await Promise.all([
    prisma.analytics.create({
      data: {
        postId: post1.id,
        platformId: 1,
        views: 1250,
        likes: 89,
        comments: 12,
        shares: 5,
        engagement_rate: 8.5,
        recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    }),
    prisma.analytics.create({
      data: {
        postId: post1.id,
        platformId: 2,
        views: 980,
        likes: 67,
        comments: 8,
        shares: 3,
        engagement_rate: 7.9,
        recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.analytics.create({
      data: {
        postId: post1.id,
        platformId: 3,
        views: 1520,
        likes: 104,
        comments: 15,
        shares: 8,
        engagement_rate: 8.4,
        recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),
  ])
  console.log(`Created sample posts with analytics data`)

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
