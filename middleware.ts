import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/token';
import * as jose from 'jose';

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get('Authorization') as string;

  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request BT' },
      { status: 401 }
    );
  }

  const token = bearerToken as string;

  if (!token) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request TO' },
      { status: 401 }
    );
  }

  try {
    await verifyJWT(token);
  } catch (error) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request SEC' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/auth/me'],
};
