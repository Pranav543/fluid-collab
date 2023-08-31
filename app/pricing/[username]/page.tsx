import { prisma } from '@/lib/prisma';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@tremor/react';
import { Metadata } from 'next';

interface Props {
  params: {
    username: string;
  };
}

interface Tier {
  name: string;
  benefits: string[];
  amount: number;
  // ... other properties if applicable
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.username } });
  return { title: `User profile of ${user?.name}` };
}
export default async function PricingPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { name: params.username }
  });
  const hasCheckout = user?.hasCheckout;

  const tiers: Tier[] | undefined = user?.tiers as unknown as Tier[];
  if (!hasCheckout) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-5xl">
        <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem]">
          <div className="mx-auto w-full max-w-[58rem] text-center">
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
              Super checkout for user <strong>{params.username}</strong>{' '}
              doesn&apos;t exist.
            </p>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-5xl">
      <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem]  ">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Become A Super Supporter!
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto">
            {user.bio}
          </p>
        </div>

        <div className="w-full grid items-start gap-5 p-6 md:flex md:items-center md:justify-center">
          {tiers.map((tier, index) => (
            <div
              className="border rounded-lg p-6 flex flex-col items-center gap-6"
              key={index}
            >
              <div className="text-center">
                <h4 className="text-7xl font-bold">${tier.amount}</h4>
                <p className="text-sm font-medium text-muted-foreground">
                  Per Month
                </p>
              </div>
              <h3 className="text-xl font-bold sm:text-1xl">{tier.name}</h3>
              <ul className="grid gap-3 text-sm text-muted-foreground">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li className="flex items-center" key={benefitIndex}>
                    ✅ {benefit}
                  </li>
                ))}
              </ul>
              <Button variant='primary' color='lime'>Subscribe 🚀</Button>
            </div>
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4 text-center">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            <strong>Every contribution to an artist is a brushstroke on the canvas of culture. </strong> - Unknown
          </p>
        </div>
      </section>
    </main>
  );
}
