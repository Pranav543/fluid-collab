import { Card, Title, Text, TextInput, Flex, Button } from '@tremor/react';
import UsersTable from './table';
import UserForm from './form';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

export default async function IndexPage() {
  const users = await prisma.user.findMany();
  // Extract only the required properties from each user object
  const filteredUsers = users.map((user) => ({
    id: user.id,
    email: user.email || '',
    name: user.name || '',
    image: user.image || ''
  }));

  const session = await getServerSession(authOptions);
  const currentUser = filteredUsers.filter(
    (usr) => usr.name === session?.user?.name
  );

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        streams(
          where: {
            receiver: "0x6528fa8c77a99d0ca68178e982aefa44b664f19f"
            token: "0x42bb40bf79730451b11f6de1cba222f17b87afd7"
          }
        ) {
          currentFlowRate
          token {
            symbol
          }
          sender {
            id
          }
          receiver {
            id
          }
        }
      }
    `
  });

  console.log(data);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {session ? (
        <>
          <Title>Create Your Own Subscription Checkout</Title>
          <Card className="mt-6">
            <UserForm user={currentUser[0]} />
          </Card>
          <Text>
            A list of users retrieved from a MySQL database (PlanetScale).
          </Text>
          <Card className="mt-6">
            <UsersTable users={filteredUsers} />
          </Card>
        </>
      ) : (
        <Title>Please Log in with Discord</Title>
      )}
    </main>
  );
}
