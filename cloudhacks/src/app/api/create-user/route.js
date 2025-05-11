// /src/app/api/users/route.js
import { NextResponse } from 'next/server'
import { createUser } from '@/app/services/userService'

export async function POST(req) {
  const body = await req.json()

  try {
    await createUser(body)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}