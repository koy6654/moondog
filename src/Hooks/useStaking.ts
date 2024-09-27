import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { useRecoilState } from 'recoil';
import { parseUnits, formatUnits, getContract, Abi, Hash } from 'viem';

import {
  userAccountAddressRecoil,
  userTotalStakedRecoil,
  userAvailableMoondogRecoil,
  userStakingAmountRecoil,
  userReceivedRecoil,
  userRewardRecoil,
  userClaimRecoil,
  totalStakedRecoil,
} from '../State';
import {
  chain,
  contractRpcUrl,
  getVeimContract,
  stakingContractAddress,
  veimPublicClient,
  veimWalletClient,
  wagmiConfig,
} from '../config';
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

  const [amount, setAmount] = useState<string>('');

  const [userAccountAddress, setUserAccountAddress] = useRecoilState(userAccountAddressRecoil);
  const [userTotalStaked, setUserTotalStaked] = useRecoilState(userTotalStakedRecoil);
  const [userAvailableMoondog, setUserAvailableMoondog] = useRecoilState(userAvailableMoondogRecoil);
  const [userStakingAmount, setUserStakingAmount] = useRecoilState(userStakingAmountRecoil);
  const [userReceived, setUserReceived] = useRecoilState(userReceivedRecoil);
  const [userReward, setUserReward] = useRecoilState(userRewardRecoil);
  const [userClaim, setUserClaim] = useRecoilState(userClaimRecoil);
  const [totalStaked, setTotalStaked] = useRecoilState(totalStakedRecoil);

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
        const errorMessage = error.message || error.toString();
        const firstLine = errorMessage.split('\n')[0];
        console.error(error.toString());
        resolve({
          res: false,
          error: firstLine,
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
      const firstLine = error.message || error.toString().split('\n')[0];
      console.error(error.toString());
      return {
        res: false,
        error: firstLine,
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

  // const publicData = async () => {
  //   const resGetTotalStaking = await getTotalStaking();
  //   setTotalState(resGetTotalStaking.token);
  //   if (resGetTotalStaking) return true;
  // };

  // const userReadData = async () => {
  //   const resGetUserStakingAmount = await getUserStakingAmount(userAddress);
  //   setUserTotalStaked(resGetUserStakingAmount.token);

  //   const userReward = await getUserReward(userAddress);
  //   setUserReward(userReward.token);

  //   const userClaim = await getUserClaim(userAddress);
  //   setUserClaim(userClaim.token);

  //   await readData();

  //   const totalStatekd = await publicData();

  //   if (resGetUserStakingAmount && userReward && totalStatekd) {
  //     return true;
  //   }
  // };
  // const initUserDataFn = () => {
  //   setUserTotalStaked(0);
  //   //setTotalState(0);
  //   setUserReward(0);
  //   setUserClaim(0);
  // };

  // useEffect(() => {
  //   if (userAddress != null) {
  //     setStateUserAddress(userAddress);
  //     userReadData();
  //   }
  //   publicData();
  // }, [userAddress]);

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
    // stake: () => stake(amount),
    // unstake: () => unstake(amount),
    // stakeAmount,
    // tokenBalance,
    // setAmount,
    // amount,
  };
};

export default useStaking;
