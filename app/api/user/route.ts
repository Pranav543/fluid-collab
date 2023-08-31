import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;
  if (!currentUserEmail) {
    // Handle the case when currentUserEmail is null or undefined
    return NextResponse.error();
  }
  const data = await req.json();
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail
    },
    data
  });
  return NextResponse.json(user);
}
