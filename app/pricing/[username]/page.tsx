import { prisma } from '@/lib/prisma';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

interface Props {
  params: {
    username: string;
  };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.username } });
  return { title: `User profile of ${user?.name}` };
}
export default async function PricingPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { name: params.username }
  });
  const hasCheckout = user?.hasCheckout

  console.log(user);
  if (!hasCheckout) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-5xl">
        <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem]">
          <div className="mx-auto w-full max-w-[58rem] text-center">
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
              Super checkout for user <strong>{params.username}</strong> doesn&apos;t exist.
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
            Unlock all features and also chance to win some perks.
          </p>
        </div>

        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the PRO plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Unlimited Posts
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Unlimited Users
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Custom domain
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Dashboard Analytics
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Access to Discord
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            {/* <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
        Get Started
      </Link> */}
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4 text-center">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            Taxonomy is a demo app.{' '}
            <strong>You can test the upgrade and won&apos;t be charged.</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
