import { NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const errros: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is not valid',
    },
    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      errorMessage: 'Password is required to sign in',
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errros.push(check.errorMessage);
    }
  });
  if (errros.length) {
    return NextResponse.json({ error: errros[0] }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Email or password is invalid' },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: 'Email or password is invalid' },
      { status: 401 }
    );
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .sign(secret);

  const currentuser = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  };

  const response = NextResponse.json({ ...currentuser }, { status: 200 });

  response.cookies.set({
    name: 'jwt',
    value: token,
    // cookies should be httpOnly: true
    httpOnly: false,
    maxAge: 60 * 60 * 24,
  });

  return response;
}
