// 'use client';

// import token from '../app/abi/PuggyCoin.json';
// import { useState, useEffect } from 'react';
// import { useSignedContract, publicClient } from './useConnector';
// import { parseUnits, formatUnits, Address } from 'viem';
// import { userAvailablePuggyRecoil } from '../state/Account';
// import { useRecoilState } from 'recoil';

// const COIN_DECIMALS = 18;
// const COIN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Address | undefined;

// const useContract = (address: Address) => {
//   const [userAvailablePuggy, setUserAvailablePuggy] = useRecoilState(userAvailablePuggyRecoil);

//   const tokenAddress = COIN_ADDRESS;
//   const tokenABI = token.abi;
//   const tokenContract = useSignedContract(tokenAddress, tokenABI);
//   if (tokenContract == null) {
//     throw new Error('af6b1d61-949c-5fca-bef7-bd62a859a4cb');
//   }

//   const getBalance = async () => {
//     try {
//       const value = (await tokenContract.read.balanceOf([address])) as bigint;
//       let token = parseFloat(formatUnits(value, 18)).toFixed(1);
//       return {
//         res: true,
//         token,
//       };
//     } catch (error: any) {
//       const errorMessage = error.message || error.toString();
//       const firstLine = errorMessage.split('\n')[0];
//       return {
//         res: false,
//         error: firstLine,
//       };
//     }
//   };

//   const allowance = async (spendAddress: string) => {
//     try {
//       const value = (await tokenContract.read.allowance([address, spendAddress])) as bigint;
//       let token = formatUnits(value, 18);

//       return {
//         res: true,
//         token,
//       };
//     } catch (error: any) {
//       const errorMessage = error.message || error.toString();
//       const firstLine = errorMessage.split('\n')[0];

//       return {
//         res: false,
//         error: firstLine,
//       };
//     }
//   };

//   const approve = async (spendAddress: string, amount: number) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const hash = await tokenContract.write.approve([spendAddress, parseUnits(amount.toString(), COIN_DECIMALS)]);
//         const transaction = await publicClient.waitForTransactionReceipt({
//           hash,
//         });
//         if (transaction && transaction.status === 'success') {
//           resolve({
//             res: true,
//             hash,
//           });
//         }
//       } catch (error: any) {
//         const errorMessage = error.message || error.toString();
//         const firstLine = errorMessage.split('\n')[0];

//         resolve({
//           res: false,
//           error: firstLine,
//         });
//       }
//     });
//   };

//   const readData = async () => {
//     const resUserAvailablePuggy = await getBalance();

//     setUserAvailablePuggy(resUserAvailablePuggy.token);
//   };

//   const initUserDataFn = () => {
//     setUserAvailablePuggy(0);
//   };

//   useEffect(() => {
//     if (address) {
//       readData();
//     }
//   }, [address]);

//   return {
//     getBalance,

//     allowance,
//     approve,
//     initUserDataFn,
//     readData,
//   };
// };

// export default useContract;
