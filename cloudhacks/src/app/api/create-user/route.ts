import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/app/services/userService';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await createUser(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}