import { Card, Title, Text, TextInput, Flex, Button } from '@tremor/react';
import UserForm from './form';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function IndexPage() {
  const session = await getServerSession(authOptions);

  const currentUser = await prisma.user.findUnique({
    where: { name: session?.user?.name || '' }
  });

  const hasCheckout = currentUser?.hasCheckout || false;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {session ? (
        <>
          {hasCheckout ? (
            <Title>
              Your Super Checkout Page has already been Created{' '}
              <Link
                className="text-blue-500 hover:underline"
                href={`/pricing/${currentUser?.name}`}
              >
                here
              </Link>{' '}
              💫{' '}
            </Title>
          ) : (
            <Title>Create Your Own Super Subscription Checkout 💫</Title>
          )}
          <Card className="mt-6">
            {/* @ts-ignore */}
            <UserForm user={currentUser} hasCheckout={hasCheckout} />
          </Card>
        </>
      ) : (
        <Title>Please Log in with Discord 😵</Title>
      )}
    </main>
  );
}
