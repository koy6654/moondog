import { atom } from 'recoil';

export const stakingAmountState = atom<number>({
  key: 'stakingAmountState',
  default: 0,
});

export const tokenBalanceState = atom<number>({
  key: 'tokenBalanceState',
  default: 0,
});
