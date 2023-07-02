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
    return NextResponse.json({ errorMessage: errros[0] });
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userWithEmail) {
    return NextResponse.json(
      { message: 'Email or password is invalid' },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, userWithEmail.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: 'Email or password is invalid' },
      { status: 401 }
    );
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .sign(secret);

  return NextResponse.json({
    status: 200,
    message: 'Come on in. The water is great.',
    JWTtoken: token,
    user: userWithEmail,
  });
}
