import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { useRecoilState } from 'recoil';
import { parseUnits, formatUnits, getContract, Abi } from 'viem';
import MoondogStakingAbi from '../Assets/Abis/MoondogStaking.json';
import { stakingAmountState, tokenBalanceState } from '../State';
import { chain, contractRpcUrl, veimClient, wagmiConfig } from '../config';

export const useVeimWalletClient = (address: `0x${string}`, abi: Abi) => {
  const { data: walletClient } = useWalletClient();

  const contract = getContract({
    address,
    abi,
    client: {
      public: veimClient,
      wallet: walletClient,
    },
  });

  return contract ? contract : null;
};

const useStaking = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [amount, setAmount] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useRecoilState(stakingAmountState);
  const [tokenBalance, setTokenBalance] = useRecoilState(tokenBalanceState);

  // const stake = async (amount: string) => {
  //   if (!isConnected || !address || !amount) return;

  //   try {
  //     const tx = await veimClient.sendTransaction({
  //       to: STAKING_CONTRACT_ADDRESS,
  //       data: '0x' + MoondogStakingAbi.encodeFunctionData('stake', [parseUnits(amount, 18)]),
  //     });
  //     await veimClient.waitForTransaction(tx);
  //     await fetchStakeAmount(); // Update stake amount after staking
  //   } catch (error) {
  //     console.error('Error staking:', error);
  //   }
  // };

  // const unstake = async (amount: string) => {
  //   if (!isConnected || !address || !amount) return;

  //   const tx = await client.sendTransaction({
  //     to: STAKING_CONTRACT_ADDRESS,
  //     data: '0x' + MoondogStakingAbi.encodeFunctionData('unstake', [parseUnits(amount, 18)]),
  //   });
  //   await client.waitForTransaction(tx);
  //   fetchStakeAmount();
  // };

  // const fetchStakeAmount = async () => {
  //   if (!address) return;

  //   const stakedAmount = await client.readContract({
  //     address: STAKING_CONTRACT_ADDRESS,
  //     abi: MoondogStakingAbi.abi,
  //     functionName: 'getStakedAmount',
  //     args: [address],
  //   });
  //   setStakeAmount(Number(formatUnits(stakedAmount, 18)));

  //   fetchTokenBalance();
  // };

  // const fetchTokenBalance = async () => {
  //   if (!address) return;

  //   const balance = await client.readContract({
  //     address: TOKEN_CONTRACT_ADDRESS,
  //     abi: MoondogStakingAbi.abi,
  //     functionName: 'balanceOf',
  //     args: [address],
  //   });
  //   setTokenBalance(Number(formatUnits(balance, 18)));
  // };

  // useEffect(() => {
  //   if (isConnected) {
  //     fetchStakeAmount();
  //   }
  // }, [isConnected, address]);

  return {
    address,
    isConnected,
    connectors,
    connect,
    disconnect,
    // stake: () => stake(amount),
    // unstake: () => unstake(amount),
    // stakeAmount,
    // tokenBalance,
    // setAmount,
    // amount,
  };
};

export default useStaking;
