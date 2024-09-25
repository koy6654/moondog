import { http, createConfig } from 'wagmi';
import { Chain, bsc, bscTestnet } from 'wagmi/chains';
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from 'connectkit';
import { Abi, createPublicClient, fallback, getContract } from 'viem';

export let chain: Chain;
export let contractRpcUrl: string;
export const projectId = process.env.REACT_APP_CONTRACT_PROJECT_ID || '';
if (process.env.REACT_APP_ENVIRONMENT === 'prod') {
  chain = bsc;
  contractRpcUrl = `https://bnb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_CONTRACT_API_KEY}`;
} else {
  chain = bscTestnet;
  contractRpcUrl = `https://bnb-testnet.g.alchemy.com/v2/${process.env.REACT_APP_CONTRACT_API_KEY}`;
}

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [chain],
    // connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
    transports: {
      [chain.id]: http(contractRpcUrl),
    },
    walletConnectProjectId: projectId,
    appName: 'Moondog Staking',

    // // Optional App Info
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export const veimClient = createPublicClient({
  chain: chain,
  transport: fallback([http(contractRpcUrl)]),
});
