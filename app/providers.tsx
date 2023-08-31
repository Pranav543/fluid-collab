'use client';

import * as React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { polygonMumbai } from 'wagmi/chains';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: 'Qn9nywHADxq4Xiif5pW8nmbkhmLzGEtC' }), publicProvider()]
);

const walletConnectProjectId = "72dc5cd398f7ea6d81b62dd8704793d2";

const appInfo = {
  appName: 'Fluid Checkout'
};

const { connectors } = getDefaultWallets({
    appName: 'Fluid Checkout',
    chains,
    projectId: walletConnectProjectId
  });

// Set up wagmi config
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains} appInfo={appInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
