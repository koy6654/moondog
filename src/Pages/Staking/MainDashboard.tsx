import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import PageLayout from '../../Components/PageLayout';
import useStaking from '../../Hooks/useStaking';
import Loading from '../../Components/Loading';
import useToken from '../../Hooks/useToken';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { totalStakedRecoil, userAvailableMoondogRecoil, userStakingAmountRecoil } from '../../State';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { stakingContractAddress, veimWalletClient } from '../../config';
import Alert, { AlertProps } from '../../Components/Alert';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const MainDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();

  const { getBalance, allowance, approve } = useToken();
  const { connect, disconnect, staking, unstaking, getTotalStaking, getUserStakingAmount } = useStaking();

  const [totalStaked, setTotalStaked] = useRecoilState(totalStakedRecoil);
  const [userAvailableMoondog, setUserAvailableMoondog] = useRecoilState(userAvailableMoondogRecoil);
  const [userStakingAmount, setUserStakingAmount] = useRecoilState(userStakingAmountRecoil);

  const navigate = useNavigate();

  const [tvl, setTvl] = useState('0');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({ type: null, message: '' });
  const [enterTokensAmount, setEnterTokensAmount] = useState('');

  const onClickStaking = async () => {
    setLoading(true);

    const test = await veimWalletClient.getAddresses();
    console.log(test);

    if (isConnected === false) {
      setLoading(false);
      setAlert({ type: 'warning', message: 'Need to connect my wallet' });
      return;
    }

    const amountLessThenZero = new BigNumber(enterTokensAmount).lte(0);
    if (enterTokensAmount === '' || amountLessThenZero) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Invalid enter tokens amount' });
      return;
    }

    const allowanceToken = (await allowance(stakingContractAddress))?.token;
    if (allowanceToken == null) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Invalid allowance' });
      return;
    }

    const allowanceGreaterThenZero = new BigNumber(allowanceToken).gt(0);
    const allowanceGreaterThenOrEqualAmount = new BigNumber(allowanceToken).gte(enterTokensAmount);
    if (allowanceGreaterThenZero && allowanceGreaterThenOrEqualAmount) {
      const result = await staking(enterTokensAmount);
      if (result == null) {
        setLoading(false);
        setAlert({ type: 'error', message: 'Staking failed' });
        return;
      }
    } else {
      const approveResult = (await approve(stakingContractAddress, enterTokensAmount)).res;
      if (approveResult === true) {
        const result = await staking(enterTokensAmount);
        if (result == null) {
          setLoading(false);
          setAlert({ type: 'error', message: 'Staking failed' });
          return;
        }
      } else {
        setLoading(false);
        setAlert({ type: 'error', message: 'Invalid approve' });
        return;
      }
    }

    await getAvailableMoondogAndStakingAmount();

    setLoading(false);
    setEnterTokensAmount('');
    setAlert({ type: 'success', message: 'Done' });
  };

  const onClickUnstaking = async () => {
    if (isConnected === false) {
      setAlert({ type: 'warning', message: 'Need to connect my wallet' });
      setLoading(false);
      return;
    }

    setLoading(true);

    const result = await unstaking(enterTokensAmount);
    if (result == null) {
      setAlert({ type: 'error', message: 'Unstaking failed' });
    }

    await getAvailableMoondogAndStakingAmount();

    setEnterTokensAmount('');
    setLoading(false);
  };

  const getTvlAndTotalStaked = async () => {
    const total = (await getTotalStaking()) ?? '0';
    const totalString = new BigNumber(total).toString();
    const { data: usdPrice } = await axios.get<string>(`https://info.puggy.world/usd`);
    const tvl = new BigNumber(usdPrice).multipliedBy(totalString).toString();
    setTotalStaked(totalString);
    setTvl(tvl);
  };

  const getAvailableMoondogAndStakingAmount = async () => {
    let availableMoondog = '0';
    let stakingAmount = '0';

    if (isConnected === true) {
      availableMoondog = (await getBalance()) ?? '0';
      stakingAmount = (await getUserStakingAmount(address)) ?? '0';
    }

    setUserAvailableMoondog(availableMoondog);
    setUserStakingAmount(stakingAmount);
  };

  const disconnectWallet = () => {
    disconnect();

    setUserAvailableMoondog('0');
    setUserStakingAmount('0');
  };

  useEffect(() => {
    getTvlAndTotalStaked();
  }, [tvl, totalStaked]);

  useEffect(() => {
    getAvailableMoondogAndStakingAmount();
  }, [isConnected]);

  useEffect(() => {
    if (alert.type != null) {
      const timer = setTimeout(() => {
        setAlert({ type: null, message: '' });
      }, 3000);
      clearTimeout(timer);
    }
  }, [alert]);

  return (
    <PageLayout>
      <div className="h-full grid grid-rows-3 grid-cols-2 gap-4">
        {/* Header */}
        <div className="col-span-2 bg-blue-500 p-4 text-white text-center">
          <h1 className="text-2xl">“Stake Your $moondog to play - Sip the Moonshine, Earn the Rewards!”</h1>
        </div>

        {/* Wallet */}
        <div className="row-span-2 col-span-1 bg-blue-500 p-4 text-white text-center">
          <div className="grid grid-rows-4 grid-cols-4">
            {/* Connect my wallet */}
            <div className="col-span-4 flex justify-center items-center">
              <ConnectButton label={'Connect My Wallet'} />
            </div>
            {/* Enter Tokens Amount */}
            <div className="col-span-4">
              <div className="flex flex-col mb-4">
                <div className="text-left w-full text-xs md:text-sm">Enter Tokens Amount</div>
                <input
                  onChange={(event) => {
                    const inputValue = new BigNumber(event.target.value);
                    if (inputValue.gte(0)) {
                      setEnterTokensAmount(inputValue.toString());
                    } else {
                      setEnterTokensAmount('');
                    }
                  }}
                  value={enterTokensAmount}
                  type="number"
                  step="any"
                  className="text-black w-full rounded-lg focus:outline-none pl-2 py-2 text-lg"
                  placeholder={'0.00'}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">TVL</div>
              <div className="text-sm">{tvl}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Total Staked</div>
              <div className="text-sm">{totalStaked}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Available $moondog</div>
              <div className="text-sm">{userAvailableMoondog}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Staking Amount</div>
              <div className="text-sm">{userStakingAmount}</div>
            </div>
            <div className="col-span-2">
              <Button label={'STAKE'} onClick={onClickStaking} />
            </div>
            <div className="col-span-2">
              <Button label={'UNSTAKE'} onClick={onClickUnstaking} />
            </div>
          </div>
        </div>

        {/* Game preview */}
        <div className="col-span-1 bg-blue-500 p-4 text-white text-center">
          <div>Game preview</div>
          <div>
            <Button label={'Play Moondog Game'} onClick={() => navigate('/game')} />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="col-span-1 bg-blue-500 p-4 text-white text-center">
          <div>Leaderboard</div>
          <div>Ranking</div>
        </div>
      </div>
      {loading && <Loading />}
      <Alert type={alert.type} message={alert.message} />
      {/* Grid */}
    </PageLayout>
  );
};

export default MainDashboard;
