import { http, createConfig } from 'wagmi';
import { Chain, bsc, bscTestnet } from 'wagmi/chains';
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
// import { getDefaultConfig } from 'connectkit';
import { Abi, Hash, createPublicClient, createWalletClient, fallback, getContract } from 'viem';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

export const environment = process.env.REACT_APP_ENVIRONMENT;
export const projectId = process.env.REACT_APP_CONTRACT_PROJECT_ID;
export const apiKey = process.env.REACT_APP_CONTRACT_API_KEY;
export const tokenContractAddress = process.env.REACT_APP_CONTRACT_TOKEN_ADDRESS as Hash;
export const stakingContractAddress = process.env.REACT_APP_CONTRACT_STAKING_ADDRESS as Hash;
if (
  environment == null ||
  projectId == null ||
  apiKey == null ||
  tokenContractAddress == null ||
  stakingContractAddress == null
) {
  throw new Error('Invalid config');
}

export let chain: Chain;
export let contractRpcUrl: string;
if (environment === 'prod') {
  chain = bsc;
  contractRpcUrl = `https://bnb-mainnet.g.alchemy.com/v2/${apiKey}`;
} else {
  chain = bscTestnet;
  contractRpcUrl = `https://bnb-testnet.g.alchemy.com/v2/${apiKey}`;
}

// export const wagmiConfig = createConfig(
//   getDefaultConfig({
//     chains: [chain],
//     transports: {
//       [chain.id]: http(contractRpcUrl),
//     },
//     walletConnectProjectId: projectId,
//     appName: 'Moondog Staking',

//     // connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],

//     // // Optional App Info
//     // appDescription: "Your App Description",
//     // appUrl: "https://family.co", // your app's url
//     // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   })
// );
export const wagmiConfig = getDefaultConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(contractRpcUrl),
  },
  projectId,
  appName: 'Moondog Staking',

  // connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],

  // // Optional App Info
  // appDescription: "Your App Description",
  // appUrl: "https://family.co", // your app's url
  // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
});

export const veimPublicClient = createPublicClient({
  chain: chain,
  transport: fallback([http(contractRpcUrl)]),
});

export const veimWalletClient = createWalletClient({
  chain: chain,
  transport: fallback([http(contractRpcUrl)]),
});

export const getVeimContract = (contractAddress: Hash, abi: Abi) => {
  const contract = getContract({
    address: contractAddress,
    abi,
    client: {
      public: veimPublicClient,
      wallet: veimWalletClient,
    },
  });

  if (contract == null) {
    throw new Error('useVeimContract error');
  }

  return contract;
};
