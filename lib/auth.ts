import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const secretKey = process.env.SESSION_SECRET || "your-super-secure-key-at-least-32-chars-long"
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null
    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session")
    return null
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    const payload = await decrypt(session)
    if (!payload) return null
    return payload
  } catch (error) {
    console.error("Error reading session:", error)
    return null
  }
}

// This function is used by the login and signup API routes
export async function createSession(userId: number, response: NextResponse) {
  const expiresIn = 60 * 60 * 24 * 7 // 7 days in seconds
  const expiresAt = new Date(Date.now() + expiresIn * 1000)
  
  const session = await encrypt({ userId, expiresAt })
  
  response.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  })
  
  return response
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const payload = await decrypt(session)

  if (!payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: "session",
    value: await encrypt({ ...payload, expires }),
    httpOnly: true,
    expires,
  })
  return res
}
