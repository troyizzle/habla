import { clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export type UserValidateEmail = {
  valid: boolean
  msg: string
  taken: boolean
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")
  if (!email) {
    const jsonResponse: UserValidateEmail = {
      valid: false,
      msg: "No email provided",
      taken: false
    }
    return NextResponse.json(jsonResponse, { status: 200 })
  }

  const users = await clerkClient.users.getUserList({
    emailAddress: [email]
  })

  const hasEmail = users.length > 0

  const jsonResponse: UserValidateEmail = {
    valid: hasEmail ? false : true,
    msg: hasEmail ? "Email already taken" : "Email is available",
    taken: hasEmail
  }

  return NextResponse.json(jsonResponse, { status: 200 })
}
