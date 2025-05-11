// /src/app/api/users/route.js
import { NextResponse } from 'next/server'
import { createUser, getUser } from '@/app/services/userService'
import { ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { dynamo } from '@/app/configs/dynamo'

const client = DynamoDBDocumentClient.from(dynamo)

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

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  
  try {
    if (userId) {
      // Get single user
      console.log('Fetching user:', userId)
      const user = await getUser(userId)
      return NextResponse.json({ exists: !!user, user }, { status: 200 })
    } 
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
