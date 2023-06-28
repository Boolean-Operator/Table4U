import { NextResponse } from 'next/server';

import prisma from '@/utils/prisma';

export async function GET(request: Request) {
  const userList = await prisma.user.findMany();
  return NextResponse.json({ Users: userList }, { status: 200 });
}
