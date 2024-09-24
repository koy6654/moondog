'use client';

import { createPublicClient, fallback, http, getContract, Address, Abi } from 'viem';
import { useWalletClient } from 'wagmi';
import { polygon, polygonAmoy } from 'viem/chains';

const chain = process.env.NEXT_PUBLIC_AMOY_CHAIN === 'true' ? polygonAmoy : polygon;
const rpcApi =
  process.env.NEXT_PUBLIC_AMOY_CHAIN === 'true'
    ? process.env.NEXT_PUBLIC_AMOY_RPC
    : process.env.NEXT_PUBLIC_POLYGON_RPC;

export const useSignedContract = (address: Address | undefined, abi: Abi | readonly unknown[]) => {
  if (address == null) {
    throw new Error('1979a3cc-a959-5ea1-a4fd-9e80194a8a8f');
  }

  const { data: walletClient } = useWalletClient();

  const contract = getContract({
    address,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  });

  return contract ? contract : null;
};

const getAlchemyHttp = () => {
  //  return http(`https://polygon-amoy.g.alchemy.com/v2/${apiKey}`);

  return http(rpcApi);
};

export const publicClient = createPublicClient({
  chain,
  transport: fallback([getAlchemyHttp()]),
});
