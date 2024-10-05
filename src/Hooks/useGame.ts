'use client';

import { parseUnits, formatUnits, Hash, Abi } from 'viem';
import moondogGameRewardAbi from '../Assets/Abis/MoondogGameReward.json';
import { gameContractAddress, getVeimPublicContract } from '../config';
import { DECIMAL } from '../Constants';
import { useAccount, useWriteContract } from 'wagmi';
import BigNumber from 'bignumber.js';

const useGame = () => {
  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const publicContract = getVeimPublicContract(gameContractAddress, moondogGameRewardAbi.abi as Abi);
  const walletContract = async (functionName: string, args: any) => {
    return await writeContractAsync({
      address: gameContractAddress,
      abi: moondogGameRewardAbi.abi,
      functionName,
      args,
      account: address,
    });
  };

  const getUserGameReward = async (address: Hash): Promise<[string, string] | null> => {
    try {
      const rewards = (await publicContract.read.getUserGameReward([address])) as bigint[];
      if (Array.isArray(rewards) === false || rewards.length !== 2) {
        throw new Error('2d5cc620-0ae6-5823-aeb4-fb6f5523ac33');
      }

      const result = [];
      for (const reward of rewards) {
        result.push(new BigNumber(parseFloat(formatUnits(reward, DECIMAL)).toFixed(1)).toString());
      }

      return [result[0], result[1]];
    } catch (error: any) {
      console.error(error.toString());

      return null;
    }
  };

  const gameRewardClaim = async () => {
    await walletContract('gameRewardClaim', []);
  };

  const topPlayerRewardClaim = async () => {
    await walletContract('topTierRewardClaim', []);
  };

  return {
    getUserGameReward,
    gameRewardClaim,
    topPlayerRewardClaim,
  };
};

export default useGame;
