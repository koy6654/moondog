'use client';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { Chain, polygon } from 'wagmi/chains';
import { cookieStorage, createStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface WagmiProviderProps {
  children: ReactNode;
}

const chains: readonly [Chain, ...Chain[]] = [polygon];
const projectId = '65da2c65-18ba-5557-8a38-e78865e37cce';
const metadata = {
  name: 'puggyStaking',
  description: 'puggyStaking',
  url: 'staking.puggy.world',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20,
  },
});

const queryClient = new QueryClient();

const Connector: React.FC<WagmiProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Connector;
