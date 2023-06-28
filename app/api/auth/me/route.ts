import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';

import prisma from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get('Authorization') as string;
  const token = bearerToken as string;

  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
      reviews: true,
    },
  });

  return NextResponse.json({ user }, { status: 200 });
}
