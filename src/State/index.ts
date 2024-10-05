import { atom } from 'recoil';
import { AlertProps } from '../Components/Alert';

export const userAccountAddressRecoil = atom({
  key: 'UserAccountAddressRecoil',
  default: null,
});

export const userTotalStakedRecoil = atom({
  key: 'UserTotalStakedRecoil',
  default: null,
});

export const userAvailableMoondogRecoil = atom<string>({
  key: 'UserAvailableMoondogRecoil',
  default: '0',
});

export const userStakingAmountRecoil = atom<string>({
  key: 'UserStakingAmountRecoil',
  default: '0',
});

export const userReceivedRecoil = atom({
  key: 'UserStakingReceivedRecoil',
  default: null,
});

export const userRewardRecoil = atom({
  key: 'UserStakingRewardRecoil',
  default: null,
});

export const userClaimRecoil = atom({
  key: 'UserStakingClaimRecoil',
  default: null,
});

export const totalStakedRecoil = atom<string>({
  key: 'TotalStakedRecoil',
  default: '0',
});

export const loadingRecoil = atom<boolean>({
  key: 'LoadingRecoil',
  default: false,
});

export const alertRecoil = atom<AlertProps>({
  key: 'AlertRecoil',
  default: { type: null, message: '' },
});
