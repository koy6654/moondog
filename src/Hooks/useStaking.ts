import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { useRecoilState } from 'recoil';
import { parseUnits, formatUnits, getContract, Abi, Hash } from 'viem';

import { getVeimContract, stakingContractAddress, veimPublicClient } from '../config';
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
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const contract = getVeimContract(stakingContractAddress, moondogStakingAbi.abi as Abi);

  const contractWrite = async ({ functionCall, inputVal }: ContractParams): Promise<ContractResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        let data: Hash;
        if (inputVal != undefined) {
          data = await functionCall([parseUnits(inputVal.toString(), DECIMAL)]);
        } else {
          data = await functionCall();
        }
        const transaction = await veimPublicClient.waitForTransactionReceipt({
          hash: data,
        });

        if (transaction.status === 'success') {
          resolve({
            res: true,
            data,
          });
        } else {
          resolve({
            res: false,
            error: 'contract call fail',
          });
        }
      } catch (error: any) {
        const errorMessage = error.toString();
        console.error(errorMessage);

        resolve({
          res: false,
          error: errorMessage,
        });
      }
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
    const result = await contractWrite({ functionCall: contract.write.staking, inputVal: stakingAmount });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const unstaking = async (unstakingAmount: string) => {
    const result = await contractWrite({ functionCall: contract.write.unStaking, inputVal: unstakingAmount });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const claim = async () => {
    const result = await contractWrite({ functionCall: contract.write.rewardClaim });
    if (result.res) {
      return result.data;
    }

    return result;
  };

  const getTotalStaking = async () => {
    const result = await contractRead({ functionCall: contract.read.getTotalStaking });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserStakingAmount = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: contract.read.getUserStakingAmount, inputVal: address });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserReward = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: contract.read.getUserClaimedReward, inputVal: address });
    if (result.res) {
      return result.data;
    }

    return null;
  };

  const getUserClaim = async (address: Hash | undefined) => {
    const result = await contractRead({ functionCall: contract.read.getUserReward, inputVal: address });
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
    getUserReward,
    getUserClaim,
    staking,
    unstaking,
  };
};

export default useStaking;
