import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
const prisma = new PrismaClient()
import { hash } from "bcrypt"
import { createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const password_hash = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password_hash,
        plan: 'free' // Default plan for new users
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Create response object to modify with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })

    // Set the session cookie
    return await createSession(user.id, response)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
