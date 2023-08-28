import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const users = [
    {
      id: 1,
      name: 'pranav',
      username: 'pranav',
      email: 'pranavnaik543@getMaxListeners.com'
    },
    {
      id: 2,
      name: 'John Doe',
      username: 'john_doe',
      email: 'john.doe@example.com'
    },
    {
      id: 3,
      name: 'Jane Smith',
      username: 'jane_smith',
      email: 'jane.smith@example.com'
    },
    {
      id: 4,
      name: 'Alice Johnson',
      username: 'alice_johnson',
      email: 'alice.johnson@example.com'
    },
    {
      id: 5,
      name: 'Bob Williams',
      username: 'bob_williams',
      email: 'bob.williams@example.com'
    }
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
