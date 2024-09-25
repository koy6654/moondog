import { http, createConfig } from 'wagmi';
import { Chain, bsc, bscTestnet } from 'wagmi/chains';

export let chain: Chain;
export let contractRpcUrl: string;

if (process.env.REACT_APP_ENVIRONMENT === 'prod') {
  chain = bsc;
  contractRpcUrl = `https://bnb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_CONTRACT_API_KEY}`;
} else {
  chain = bscTestnet;
  contractRpcUrl = `https://bnb-testnet.g.alchemy.com/v2/${process.env.REACT_APP_CONTRACT_API_KEY}`;
}

export const WagmiConfig = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(contractRpcUrl),
  },
});
