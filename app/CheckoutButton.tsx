'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import SuperfluidWidget, { EventListeners } from '@superfluid-finance/widget';

import superTokenList from '@superfluid-finance/widget/tokenlist';

import { PaymentDetails } from '@superfluid-finance/widget';
import { PaymentOption } from '@superfluid-finance/widget';
import { ProductDetails } from '@superfluid-finance/widget';

import { Button } from '@tremor/react';
import { useMemo } from 'react';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  accountAddress: string | null;
}

export default function CheckoutButton({
  user,
  subscriptionAmount
}: {
  user: User;
  subscriptionAmount: number;
}) {
  const eventListeners: EventListeners = useMemo(
    () => ({
      onSuccess: () => console.log('onSuccess'),
      onSuccessButtonClick: () => console.log('onSuccessButtonClick')
    }),
    []
  );
  const productDetails: ProductDetails = {
    name: user.name || '',
    description: user.bio || '',
    imageURI:
      user.image ||
      'data:image/jpeg;base64,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'
  };

  const receiverAddress: string = user.accountAddress
    ? `${user.accountAddress}`
    : '';

  const paymentOptions: PaymentOption[] = [
    {
      chainId: 80001,
      receiverAddress: receiverAddress as `0x${string}`,
      superToken: {
        address: '0x42bb40bf79730451b11f6de1cba222f17b87afd7'
      },
      flowRate: {
        amountEther: `${Number(subscriptionAmount)}`,
        period: 'month'
      }
    }
  ];

  const paymentDetails: PaymentDetails = {
    paymentOptions
  };
  return (
    <>
      <ConnectButton.Custom>
        {({ openConnectModal, connectModalOpen }) => {
          const walletManager = {
            open: async () => openConnectModal(),
            isOpen: connectModalOpen
          };
          return (
            <>
              <SuperfluidWidget
                productDetails={productDetails}
                paymentDetails={paymentDetails}
                tokenList={superTokenList}
                type="drawer"
                walletManager={walletManager}
                eventListeners={eventListeners}
              >
                {({ openModal }) => (
                  <Button
                    variant="primary"
                    color="lime"
                    onClick={() => openModal()}
                  >
                    Subscribe 🚀
                  </Button>
                )}
              </SuperfluidWidget>
            </>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
}
