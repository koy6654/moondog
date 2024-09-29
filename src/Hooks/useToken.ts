'use client';

import { useState, useEffect } from 'react';
import { parseUnits, formatUnits, Hash, Abi } from 'viem';
import { useRecoilState, useRecoilValue } from 'recoil';
import moondogTokenAbi from '../Assets/Abis/MoondogCoin.json';
import {
  contractRpcUrl,
  environment,
  getVeimPublicContract,
  stakingContractAddress,
  tokenContractAddress,
  veimPublicClient,
} from '../config';
import { DECIMAL } from '../Constants';
import { userAvailableMoondogRecoil } from '../State';
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
  useWalletClient,
  useWriteContract,
} from 'wagmi';

interface ContractResult {
  res: boolean;
  data?: Hash | string;
  error?: string;
}

const useToken = () => {
  const { address } = useAccount();

  const { data: writeContractHash, writeContractAsync } = useWriteContract();

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
