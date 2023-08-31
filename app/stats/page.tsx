import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import UsersTable from './table';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default async function UserStatsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    <Title>Please Log in with Discord</Title>;
  }
  const user = await prisma.user.findUnique({
    where: { name: session?.user?.name || '' }
  });
  const hasCheckout = user?.hasCheckout;
  const lowerCaseAddress = user?.accountAddress
    ? user.accountAddress.toLowerCase()
    : '';

  let streamsReceiving = [];
  let streamsSending = [];

  if (hasCheckout) {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          streams(
            where: {
              receiver: "${lowerCaseAddress}"
              token: "0x42bb40bf79730451b11f6de1cba222f17b87afd7"
              currentFlowRate_not: "0"
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

    streamsReceiving = data;
  }

  if (hasCheckout) {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          streams(
            where: {
              sender: "${lowerCaseAddress}"
              token: "0x42bb40bf79730451b11f6de1cba222f17b87afd7"
              currentFlowRate_not: "0"
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

    streamsSending = data;
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {hasCheckout ? (
        <UsersTable
          streamsReceiving={streamsReceiving}
          streamsSending={streamsSending}
        />
      ) : (
        <Title>
          Super checkout for user <strong>{user?.name}</strong> doesn&apos;t
          exist. Please create it first.
        </Title>
      )}
    </main>
  );
}
