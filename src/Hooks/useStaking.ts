import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRecoilState } from 'recoil';
import { createPublicClient, fallback, http } from 'viem';
import { polygon } from 'viem/chains';
import { parseUnits, formatUnits } from 'viem';
import MoondogStakingAbi from '../Assets/Abis/MoondogStaking.json';
import { stakingAmountState, tokenBalanceState } from '../State';

const STAKING_CONTRACT_ADDRESS = 'YOUR_STAKING_CONTRACT_ADDRESS';
const TOKEN_CONTRACT_ADDRESS = 'YOUR_TOKEN_CONTRACT_ADDRESS';

const useStaking = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const disconnect = useDisconnect();

  const [amount, setAmount] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useRecoilState(stakingAmountState);
  const [tokenBalance, setTokenBalance] = useRecoilState(tokenBalanceState);

  const client = createPublicClient({
    chain: polygon,
    transport: fallback([http('https://YOUR_INFURA_OR_ALCHEMY_URL')]),
  });

  // const stake = async (amount: string) => {
  //   if (!isConnected || !address || !amount) return;

  //   const tx = await client.sendTransaction({
  //     to: STAKING_CONTRACT_ADDRESS,
  //     data: '0x' + MoondogStakingAbi.encodeFunctionData('stake', [parseUnits(amount, 18)]),
  //   });
  //   await client.waitForTransaction(tx);
  //   fetchStakeAmount();
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
    isConnected,
    connect,
    disconnect,
    // connectors,
    // stake: () => stake(amount),
    // unstake: () => unstake(amount),
    // stakeAmount,
    // tokenBalance,
    // setAmount,
    // amount,
  };
};

export default useStaking;
