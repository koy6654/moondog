import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button';
import PageLayout from '../../../Components/PageLayout';
import useStaking from '../../../Hooks/useStaking';
import Loading from '../../../Components/Loading';
import useToken from '../../../Hooks/useToken';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { totalStakedRecoil, userAvailableMoondogRecoil, userStakingAmountRecoil } from '../../../State';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingContractAddress } from '../../../config';
import Alert, { AlertProps } from '../../../Components/Alert';
import { Hash } from 'viem';
import ConnectWalletButton from '../../../Components/ConnectWalletButton';
import PageTitle from '../../../Components/PageTitle';
import Gem from '../../../Assets/Images/Gem.png';

const MainDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();

  const { getBalance, allowance, approve } = useToken();
  const { staking, unstaking, getTotalStaking, getUserStakingAmount } = useStaking();

  const [totalStaked, setTotalStaked] = useRecoilState(totalStakedRecoil);
  const [userAvailableMoondog, setUserAvailableMoondog] = useRecoilState(userAvailableMoondogRecoil);
  const [userStakingAmount, setUserStakingAmount] = useRecoilState(userStakingAmountRecoil);

  const navigate = useNavigate();

  const [tvl, setTvl] = useState('0');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({ type: null, message: '' });
  const [enterTokensAmount, setEnterTokensAmount] = useState('');
  const [stakingHash, setStakingHash] = useState<Hash | undefined>(undefined);
  const { status: waitForTransactionReceiptStatus } = useWaitForTransactionReceipt({ hash: stakingHash });

  const onClickStaking = async () => {
    setLoading(true);
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

    try {
      const allowanceGreaterThenZero = new BigNumber(allowanceToken).gt(0);
      const allowanceGreaterThenOrEqualAmount = new BigNumber(allowanceToken).gte(enterTokensAmount);
      if (allowanceGreaterThenZero && allowanceGreaterThenOrEqualAmount) {
        await staking(enterTokensAmount);
      } else {
        await approve(stakingContractAddress, enterTokensAmount);
        await staking(enterTokensAmount);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setAlert({ type: 'error', message: 'Transaction failed' });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await getTvlAndTotalStaked();
    await getAvailableMoondogAndStakingAmount();

    setEnterTokensAmount('');
    setAlert({ type: 'success', message: 'Done' });
    setLoading(false);
  };

  const onClickUnstaking = async () => {
    if (isConnected === false) {
      setAlert({ type: 'warning', message: 'Need to connect my wallet' });
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      await unstaking(enterTokensAmount);
    } catch (error: any) {
      console.error(error.toString());

      setAlert({ type: 'error', message: 'Unstaking failed' });
      setLoading(false);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await getTvlAndTotalStaked();
    await getAvailableMoondogAndStakingAmount();

    setEnterTokensAmount('');
    setAlert({ type: 'success', message: 'Done' });
    setLoading(false);
  };

  const getTvlAndTotalStaked = async () => {
    const total = (await getTotalStaking()) ?? '0';
    const totalString = new BigNumber(total).toString();

    const { data: usdPrice } = await axios.get<string>(`http://43.216.121.155:9000/api/token/setStart`);

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

  useEffect(() => {
    getTvlAndTotalStaked();
    getAvailableMoondogAndStakingAmount();
  }, [tvl, totalStaked, isConnected, stakingHash]);

  return (
    <PageLayout>
      <div className="h-full grid grid-rows-6 grid-cols-5 gap-4">
        <div className="row-span-1 col-span-5 p-4 text-black text-center">
          <PageTitle title={'Sip the $MOONDOG, Earn the Rewards!'} />
        </div>

        {/* Wallet */}
        <div className="bg-[#FFFFFF] bg-opacity-50 row-span-5 col-span-3 p-4 text-black text-center .shape-rectangle">
          <div className="grid grid-rows-4 grid-cols-4 p-5">
            {/* Connect my wallet */}
            <div className="col-span-4 h-20	flex justify-center items-center">
              <ConnectWalletButton />
            </div>
            {/* Enter Tokens Amount */}
            <div className="col-span-4">
              <div className="flex flex-col mt-4 mb-4">
                <div className="flex items-center w-full h-full">
                  <img src={Gem} alt="Gem" className="h-full" />
                  <div className="font-concert-one text-left text-2xl">Enter Tokens Amount</div>
                </div>
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
                  className="w-full bg-white border-2 border-solid border-black rounded-[32px] focus:outline-none font-concert-one text-black text-lg pl-8 p-3"
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
        <div className="row-span-2 col-span-2 p-4 text-black text-center">
          <div>Game preview</div>
          <div>
            <Button label={'Play Moondog Game'} onClick={() => navigate('/game')} />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="row-span-3 col-span-2 p-4 text-black text-center">
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
