import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import PageLayout from '../../Components/PageLayout';
import useStaking from '../../Hooks/useStaking';
import Loading from '../../Components/Loading';
import useToken from '../../Hooks/useToken';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  alertRecoil,
  loadingRecoil,
  totalStakedRecoil,
  userAvailableMoondogRecoil,
  userStakingAmountRecoil,
} from '../../State';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingContractAddress } from '../../config';
import Alert, { AlertProps } from '../../Components/Alert';
import { Hash } from 'viem';
import ConnectWalletButton from '../../Components/ConnectWalletButton';
import PageTitle from '../../Components/PageTitle';
import Gem from '../../Assets/Images/Gem.png';
import StakingDown from '../../Assets/Images/StakingDown.png';
import UnStakingUp from '../../Assets/Images/UnStakingUp.png';
import GamePreview from '../../Assets/Images/GamePreview.png';
import LeaderboardIcon from '../../Assets/Images/Leaderboard.png';
import Divider from '../../Components/Divider';
import LeaderboardTable, { TopRankList } from '../../Components/LeaderboardTable';

const MainDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();

  const { getBalance, allowance, approve } = useToken();
  const { staking, unstaking, getTotalStaking, getUserStakingAmount } = useStaking();

  const [totalStaked, setTotalStaked] = useRecoilState(totalStakedRecoil);
  const [userAvailableMoondog, setUserAvailableMoondog] = useRecoilState(userAvailableMoondogRecoil);
  const [userStakingAmount, setUserStakingAmount] = useRecoilState(userStakingAmountRecoil);
  const [loading, setLoading] = useRecoilState(loadingRecoil);
  const [alert, setAlert] = useRecoilState<AlertProps>(alertRecoil);

  const navigate = useNavigate();

  const [tvl, setTvl] = useState('0');
  const [enterTokensAmount, setEnterTokensAmount] = useState('');
  const [topRankList, setTopRankList] = useState<TopRankList[]>([]);

  const onClickStaking = async () => {
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

    setLoading(true);

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
    await getLeaderboardInfo();

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

    const amountLessThenZero = new BigNumber(enterTokensAmount).lte(0);
    if (enterTokensAmount === '' || amountLessThenZero) {
      setLoading(false);
      setAlert({ type: 'error', message: 'Invalid enter tokens amount' });
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
    await getLeaderboardInfo();

    setEnterTokensAmount('');
    setAlert({ type: 'success', message: 'Done' });
    setLoading(false);
  };

  const getTvlAndTotalStaked = async () => {
    const total = (await getTotalStaking()) ?? '0';
    const totalBigNumber = new BigNumber(total);

    try {
      const { data: usdPrice } = await axios.get<string>(`${process.env.REACT_APP_API_DOMAIN}/api/token/setStart`);

      const tvlBigNumber = new BigNumber(usdPrice).multipliedBy(totalBigNumber);

      if (totalBigNumber.isNaN() || tvlBigNumber.isNaN()) {
        console.error('getTvlAndTotalStaked NaN occured!');
        setTotalStaked('0');
        setTvl('0');
        return;
      }

      setTotalStaked(totalBigNumber.toString());
      setTvl(tvlBigNumber.toString());
    } catch (err) {
      console.error(err);
      setTotalStaked('0');
      setTvl('0');
    }
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

  const getLeaderboardInfo = async () => {
    // TODO
    // const { data: list } = await axios.get<string>(
    //   `${process.env.REACT_APP_API_DOMAIN}/api/GetInfo?startPage=0&take=10`
    // );
    const list = {
      errCode: 0,
      message: 'message',
      totalCount: 3,
      scoreInfo: [
        {
          address: '0x121211',
          score: 500,
        },
        {
          address: '0x1234',
          score: 200,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
      ],
    };

    setTopRankList(list.scoreInfo);
  };

  useEffect(() => {
    getTvlAndTotalStaked();
    getAvailableMoondogAndStakingAmount();
  }, [isConnected, loading]);

  useEffect(() => {
    getLeaderboardInfo();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ type: null, message: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <PageLayout>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* PageTitle */}
        <div className="min-h-20 w-full lg:col-span-5 py-4 sm:px-1 text-center">
          <PageTitle title={'Sip the $MOONDOG, Earn the Rewards!'} />
        </div>
        {/* Wallet */}
        <div className="lg:col-span-3 p-4 bg-[#FFFFFF] bg-opacity-50 text-black text-center">
          <div className="h-full grid grid-cols-4 p-5">
            {/* Connect my wallet */}
            <div className="h-20 col-span-4 mb-4 flex justify-center items-center">
              <ConnectWalletButton />
            </div>
            {/* Enter Tokens Amount */}
            <div className="h-full col-span-4 mb-4">
              <div className="flex flex-col">
                <div className="flex items-center w-full h-full">
                  <img src={Gem} alt="Gem" className="h-full" />
                  <div className="font-concert-one text-left text-2xl">Enter Tokens Amount</div>
                </div>
                <input
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const bigNumberValue = new BigNumber(inputValue || 0);
                    if (bigNumberValue.gte(0)) {
                      setEnterTokensAmount(inputValue);
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
            <div className="h-full col-span-4 font-concert-one">
              <Divider />
              <div className="flex justify-between items-start py-5">
                <div className="flex flex-col w-1/2 h-full pl-8 pr-6">
                  <div className="text-xl min-h-[56px] text-left">TVL</div>
                  <div className="text-xl min-h-[56px] text-right font-comic-sans-ms">{tvl}</div>
                  <div className="text-xl min-h-[56px] text-left">Total Staked</div>
                  <div className="text-xl min-h-[56px] text-right font-comic-sans-ms">{totalStaked}</div>
                </div>
                <div className="flex flex-col w-1/2 h-full pl-8 pr-6">
                  <div className="text-xl min-h-[56px] text-left">Available $moondog</div>
                  <div className="text-xl min-h-[56px] text-right font-comic-sans-ms">{userAvailableMoondog}</div>
                  <div className="text-xl min-h-[56px] text-left">Staking Amount</div>
                  <div className="text-xl min-h-[56px] text-right font-comic-sans-ms">{userStakingAmount}</div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="h-full col-span-4">
              <div className="flex justify-center items-center gap-10">
                <button
                  className="flex justify-center items-center bg-[#FFCC00] w-[390px] h-[70px] border-2 border-solid border-black shadow-[4px_4px_0px_#B1B8BD] rounded-[1.5px] font-concert-one text-2xl"
                  onClick={onClickStaking}
                >
                  <img src={StakingDown} alt="Icon" className="w-5 h-5 mr-2" />
                  <span>STAKE</span>
                </button>
                <button
                  className="flex justify-center items-center bg-[#8E8E93] w-[390px] h-[70px] border-2 border-solid border-black shadow-[4px_4px_0px_#B1B8BD] rounded-[1.5px] font-concert-one text-2xl"
                  onClick={onClickUnstaking}
                >
                  <img src={UnStakingUp} alt="Icon" className="w-5 h-5 mr-2" />
                  <span>UNSTAKE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Game preview & Leaderboard */}
        <div className="w-full lg:col-span-2 text-black text-center _overflow-hidden">
          {/* Game preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-1/2 relative">
              <div className="w-[95%] h-full rounded-[32px] bg-[#FFFFFF] shadow-lg border-4 border-black p-6 mx-auto">
                <img src={GamePreview} alt="GamePreview" className="w-full h-full object-cover rounded-[20px]" />
                <button
                  className="absolute bottom-0 left-0 w-full h-[79.35px] bg-[#4F378B] z-10 border-4 border-black"
                  onClick={() => navigate('/game')}
                >
                  <div className="flex flex-row justify-center items-center">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Left icon">
                        <path
                          id="Vector 149"
                          d="M11.5414 2.80334C12.2113 3.3702 16.6805 7.74303 18.5395 10.2686C19.3005 11.3024 19.2667 12.8607 18.5395 13.8933C16.5376 16.4632 13.9525 19.0399 12.0287 21.0668C11.1314 21.8898 9.09168 21.5578 9.00243 20.3531C8.8306 16.4196 8.91649 7.89868 9.00243 3.84465C9.09014 2.7468 10.7512 2.13471 11.5414 2.80334Z"
                          fill="#A2845E"
                        />
                      </g>
                    </svg>
                    <span className="font-concert-one text-2xl text-light-tan ml-4">PLAY MOONDOG GAME</span>
                  </div>
                </button>
              </div>
            </div>
            {/* Leaderboard */}
            <div className="w-full h-1/2 mt-4">
              <div className="w-[95%] h-full bg-[#FFFFFF] shadow-lg border-4 border-black p-8 mx-auto">
                <div className="h-full flex flex-col font-concert-one text-left text-base">
                  <div className="h-full flex flex-row justify-start items-center mb-4">
                    <img src={LeaderboardIcon} alt="Leaderboard" className="w-[19px] h-full" />
                    <span className="ml-2 text-[32px]">Leaderboard</span>
                  </div>
                  <Divider />
                  <LeaderboardTable topRankList={topRankList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
      <Alert type={alert.type} message={alert.message} />
    </PageLayout>
  );
};

export default MainDashboard;
