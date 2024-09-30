'use client';

import { parseUnits, formatUnits, Hash, Abi } from 'viem';
import moondogTokenAbi from '../Assets/Abis/MoondogCoin.json';
import { getVeimPublicContract, tokenContractAddress } from '../config';
import { DECIMAL } from '../Constants';
import { useAccount, useWriteContract } from 'wagmi';

const useToken = () => {
  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const publicContract = getVeimPublicContract(tokenContractAddress, moondogTokenAbi.abi as Abi);
  const walletContract = async (functionName: string, args: any) => {
    return await writeContractAsync({
      address: tokenContractAddress,
      abi: moondogTokenAbi.abi,
      functionName,
      args,
      account: address,
    });
  };

  const getBalance = async () => {
    try {
      const balance = (await publicContract.read.balanceOf([address])) as bigint;
      let data = parseFloat(formatUnits(balance, DECIMAL)).toFixed(1);

      return data;
    } catch (error: any) {
      console.error(error.toString());

      return null;
    }
  };

  const allowance = async (spendAddress: Hash) => {
    try {
      const allowanceResult = (await publicContract.read.allowance([address, spendAddress])) as bigint;
      let token = formatUnits(allowanceResult, DECIMAL);

      return {
        res: true,
        token,
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

  const approve = async (spendAddress: Hash, amount: string): Promise<Hash> => {
    const hash = await walletContract('approve', [spendAddress, parseUnits(amount.toString(), DECIMAL)]);
    return hash;
  };

  return {
    getBalance,
    allowance,
    approve,
  };
};

export default useToken;
