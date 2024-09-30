import { http, createConfig, createStorage, cookieStorage, useWalletClient, UseWalletClientReturnType } from 'wagmi';
import { Chain, bsc, bscTestnet } from 'wagmi/chains';
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { Abi, Hash, createPublicClient, createWalletClient, fallback, getContract } from 'viem';
import { injected, metaMask, safe, walletConnect } from '@wagmi/connectors';
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  argentWallet,
  bestWallet,
  bifrostWallet,
  binanceWallet,
  bitgetWallet,
  bitskiWallet,
  bitverseWallet,
  bloomWallet,
  braveWallet,
  bybitWallet,
  clvWallet,
  coin98Wallet,
  coinbaseWallet,
  compassWallet,
  coreWallet,
  dawnWallet,
  desigWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  gateWallet,
  imTokenWallet,
  iopayWallet,
  kaiaWallet,
  kaikasWallet,
  krakenWallet,
  kresusWallet,
  ledgerWallet,
  magicEdenWallet,
  mewWallet,
  nestWallet,
  oktoWallet,
  okxWallet,
  omniWallet,
  oneInchWallet,
  oneKeyWallet,
  paraSwapWallet,
  phantomWallet,
  rabbyWallet,
  ramperWallet,
  roninWallet,
  safeheronWallet,
  safepalWallet,
  seifWallet,
  subWallet,
  tahoWallet,
  talismanWallet,
  tokenPocketWallet,
  tokenaryWallet,
  trustWallet,
  uniswapWallet,
  valoraWallet,
  xdefiWallet,
  zealWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';
export const environment = process.env.REACT_APP_ENVIRONMENT;
export const projectId = process.env.REACT_APP_CONTRACT_PROJECT_ID;
export const apiKey = process.env.REACT_APP_CONTRACT_API_KEY;
export const tokenContractAddress = process.env.REACT_APP_CONTRACT_TOKEN_ADDRESS as Hash;
export const stakingContractAddress = process.env.REACT_APP_CONTRACT_STAKING_ADDRESS as Hash;
export const gameContractAddress = process.env.REACT_APP_CONTRACT_GAME_ADDRESS as Hash;
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

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [walletConnectWallet, metaMaskWallet, injectedWallet, coinbaseWallet, safeWallet],
    },
    {
      groupName: 'Else',
      wallets: [
        argentWallet,
        bestWallet,
        bifrostWallet,
        binanceWallet,
        bitgetWallet,
        bitskiWallet,
        bitverseWallet,
        bloomWallet,
        braveWallet,
        bybitWallet,
        clvWallet,
        coin98Wallet,
        compassWallet,
        coreWallet,
        dawnWallet,
        desigWallet,
        enkryptWallet,
        foxWallet,
        frameWallet,
        frontierWallet,
        gateWallet,
        imTokenWallet,
        iopayWallet,
        kaiaWallet,
        kaikasWallet,
        krakenWallet,
        kresusWallet,
        ledgerWallet,
        magicEdenWallet,
        metaMaskWallet,
        mewWallet,
        nestWallet,
        oktoWallet,
        okxWallet,
        omniWallet,
        oneInchWallet,
        oneKeyWallet,
        paraSwapWallet,
        phantomWallet,
        rabbyWallet,
        ramperWallet,
        rainbowWallet,
        roninWallet,
        safeheronWallet,
        safepalWallet,
        seifWallet,
        subWallet,
        tahoWallet,
        talismanWallet,
        tokenPocketWallet,
        tokenaryWallet,
        trustWallet,
        uniswapWallet,
        valoraWallet,
        xdefiWallet,
        zealWallet,
        zerionWallet,
      ],
    },
  ],
  {
    appName: 'Moondog',
    projectId: projectId,
  }
);

export const wagmiConfig = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(contractRpcUrl),
  },
  connectors,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const veimPublicClient = createPublicClient({
  chain: chain,
  transport: fallback([http(contractRpcUrl)]),
});

export const getVeimPublicContract = (contractAddress: Hash, abi: Abi) => {
  const contract = getContract({
    address: contractAddress,
    abi,
    client: veimPublicClient,
  });

  if (contract == null) {
    throw new Error('useVeimPublicContract error');
  }

  return contract;
};
