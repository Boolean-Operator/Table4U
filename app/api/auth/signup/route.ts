import { NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import prisma from '@/utils/prisma';

// export async function GET(request: Request) {
//   return NextResponse.json({ hello: 'There' }, { status: 200 });
// }

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();

  const errros: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 25,
      }),
      errorMessage: 'First name field is empty',
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 25,
      }),
      errorMessage: 'Last name field is empty',
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is not valid',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number is not valid',
    },
    {
      valid: validator.isLength(city, {
        min: 1,
      }),
      errorMessage: 'City is not valid',
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage:
        'Password is must be at least 8 characters long and contain a number, a symbol, at least one upper case and at least one lower case letter.',
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

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    return NextResponse.json(
      { message: 'Email is already in use' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      phone,
      email,
    },
  });

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
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return response;
}
