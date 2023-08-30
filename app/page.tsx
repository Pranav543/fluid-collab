import { Card, Title, Text, TextInput, Flex, Button } from '@tremor/react';
import UsersTable from './table';
import UserForm from './form';
import { prisma } from '@/lib/prisma';

export default async function IndexPage() {

  const users = await prisma.user.findMany();
  // Extract only the required properties from each user object
  const filteredUsers = users.map((user) => ({
    id: user.id,
    email: user.email || "",
    name: user.name || "",
    image: user.image || ""
  }));

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Create Your Own Subscription Checkout</Title>
      <Card className="mt-6">
        <UserForm users={filteredUsers} />
      </Card>

      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Card className="mt-6">
        <UsersTable users={filteredUsers} />
      </Card>
    </main>
  );
}
