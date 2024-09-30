import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient, useWriteContract } from 'wagmi';
import { useRecoilState } from 'recoil';
import { parseUnits, formatUnits, getContract, Abi, Hash } from 'viem';

import { getVeimPublicContract, stakingContractAddress, veimPublicClient } from '../config';
import moondogStakingAbi from '../Assets/Abis/MoondogStaking.json';
import { DECIMAL } from '../Constants';

interface ContractParams {
  functionCall: any;
  inputVal?: number | Hash | string;
}
interface ContractResult {
  res: boolean;
  data?: Hash | string;
  error?: string;
}

const truncateToFixed = (value: string) => {
  const dotIndex = value.indexOf('.');
  if (dotIndex !== -1) {
    return value.substring(0, dotIndex + 2);
  }
  return value;
};

const useStaking = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: writeContractHash, writeContractAsync } = useWriteContract();

  const publicContract = getVeimPublicContract(stakingContractAddress, moondogStakingAbi.abi as Abi);
  const walletContract = async (functionName: string, args: any) => {
    return await writeContractAsync({
      address: stakingContractAddress,
      abi: moondogStakingAbi.abi,
      functionName,
      args,
      account: address,
    });
  };

  const contractRead = async ({ functionCall, inputVal }: ContractParams): Promise<ContractResult> => {
    try {
      let data;
      let res;
      if (inputVal != undefined) {
        res = formatUnits(await functionCall([inputVal]), DECIMAL);
      } else {
        res = formatUnits(await functionCall(), DECIMAL);
      }

      data = truncateToFixed(String(res));

      return {
        res: true,
        data,
      };
    } catch (error: any) {
      const errorMessage = error.toString();
      console.error(errorMessage);

      return {
        res: false,
        error: errorMessage,
      };
    }
  };

  const staking = async (stakingAmount: string) => {
    const hash = await walletContract('staking', [parseUnits(stakingAmount.toString(), DECIMAL)]);
    return hash;
  };

  const unstaking = async (unstakingAmount: string) => {
    const hash = await walletContract('unStaking', [parseUnits(unstakingAmount.toString(), DECIMAL)]);
    return hash;
  };

  const claim = async () => {
    await walletContract('rewardClaim', []);
  };

  const getTotalStaking = async () => {
    const result = await contractRead({ functionCall: publicContract.read.getTotalStaking });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserStakingAmount = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: publicContract.read.getUserStakingAmount, inputVal: address });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserClaimedReward = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: publicContract.read.getUserClaimedReward, inputVal: address });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserReward = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: publicContract.read.getUserReward, inputVal: address });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  return {
    connectors,
    connect,
    disconnect,
    getTotalStaking,
    getUserStakingAmount,
    getUserClaimedReward,
    getUserReward,
    staking,
    unstaking,
  };
};

export default useStaking;
