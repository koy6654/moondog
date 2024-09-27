'use client';

import { useState, useEffect } from 'react';
import { parseUnits, formatUnits, Hash, Abi } from 'viem';
import { useRecoilState, useRecoilValue } from 'recoil';
import moondogTokenAbi from '../Assets/Abis/MoondogCoin.json';
import { environment, getVeimContract, tokenContractAddress, veimPublicClient } from '../config';
import { DECIMAL } from '../Constants';
import { userAvailableMoondogRecoil } from '../State';
import { useAccount } from 'wagmi';

interface ContractResult {
  res: boolean;
  data?: Hash | string;
  error?: string;
}

const useToken = () => {
  const { address } = useAccount();

  const contract = getVeimContract(tokenContractAddress, moondogTokenAbi.abi as Abi);

  const getBalance = async () => {
    try {
      const balance = (await contract.read.balanceOf([address])) as bigint;
      let data = parseFloat(formatUnits(balance, DECIMAL)).toFixed(1);

      return data;
    } catch (error: any) {
      console.error(error.toString());

      return null;
    }
  };

  const allowance = async (spendAddress: Hash) => {
    try {
      const allowanceResult = (await contract.read.allowance([address, spendAddress])) as bigint;
      let token = formatUnits(allowanceResult, DECIMAL);

      return {
        res: true,
        token,
      };
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      const firstLine = errorMessage.split('\n')[0];
      console.error(firstLine);

      return {
        res: false,
        error: firstLine,
      };
    }
  };

  const approve = async (spendAddress: Hash, amount: string): Promise<ContractResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await contract.write.approve([spendAddress, parseUnits(amount.toString(), DECIMAL)], {
          account: address,
        });
        const transaction = await veimPublicClient.waitForTransactionReceipt({
          hash,
        });

        if (transaction && transaction.status === 'success') {
          resolve({
            res: true,
            data: hash,
          });
        }
      } catch (error: any) {
        const errorMessage = error.message || error.toString();
        const firstLine = errorMessage.split('\n')[0];
        console.error(error.toString());

        resolve({
          res: environment === 'dev' ? true : false,
          error: firstLine,
        });
      }
    });
  };

  // const initUserDataFn = () => {
  //   setUserAvailableMoondog('0');
  // };

  // useEffect(() => {
  //   if (ownerAddress) {
  //     getUserAvailableBalance();
  //   }
  // }, [ownerAddress]);

  return {
    getBalance,
    allowance,
    approve,
    // initUserDataFn,
  };
};

export default useToken;
