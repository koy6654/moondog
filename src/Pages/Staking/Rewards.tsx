import PageLayout from '../../Components/PageLayout';
import PageTitle from '../../Components/PageTitle';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import useStaking from '../../Hooks/useStaking';
import useGame from '../../Hooks/useGame';
import RewardBox from '../../Components/RewardBox';
import RewardBoxStakingReward from '../../Assets/Images/RewardBoxStakingReward.png';
import RewardBoxGameReward from '../../Assets/Images/RewardBoxGameReward.png';
import RewardBoxTopPlayer from '../../Assets/Images/RewardBoxTopPlayer.png';
import { useRecoilState } from 'recoil';
import { alertRecoil, loadingRecoil } from '../../State';
import Alert, { AlertProps } from '../../Components/Alert';
import Loading from '../../Components/Loading';
import RewardSwatch from '../../Components/RewardSwatch';
import WhereToBuyQuestionMark1 from '../../Assets/Images/WhereToBuyQuestionMark1.png';
import WhereToBuyQuestionMark2 from '../../Assets/Images/WhereToBuyQuestionMark2.png';
import WhereToBuyAnnotation from '../../Assets/Images/WhereToBuyAnnotation.png';
import BigNumber from 'bignumber.js';

const Rewards: React.FC = () => {
  const { address } = useAccount();
  const { getUserReward, stakingClaim } = useStaking();
  const { getUserGameReward, gameRewardClaim, topPlayerRewardClaim } = useGame();

  const [loading, setLoading] = useRecoilState(loadingRecoil);
  const [alert, setAlert] = useRecoilState<AlertProps>(alertRecoil);

  const [userStakingReward, setUserStakingReward] = useState('0');
  const [userGameReward, setUserGameReward] = useState('0');
  const [topPlayerReward, setTopPlayerReward] = useState('0');

  const getRewards = async () => {
    let stakingReward = null;
    let gameReward = null;
    let topReward = null;

    if (address != null) {
      const staking = (await getUserReward(address)) ?? '0';
      const [game, top] = (await getUserGameReward(address)) ?? ['0', '0'];

      stakingReward = staking;
      gameReward = game;
      topReward = top;
    } else {
      stakingReward = '0';
      gameReward = '0';
      topReward = '0';
    }

    setUserStakingReward(stakingReward);
    setUserGameReward(gameReward);
    setTopPlayerReward(topReward);
  };

  const onClickStakingClaim = async () => {
    if (new BigNumber(userStakingReward).isEqualTo('0')) {
      setAlert({ type: 'warning', message: 'Reward is zero' });
      return;
    }

    setLoading(true);

    try {
      await stakingClaim();
      setAlert({ type: 'success', message: 'Staking claim done' });
    } catch (err) {
      console.error(err);

      setAlert({ type: 'error', message: 'Staking claim failed' });
    }

    setLoading(false);
  };

  const onClickGameRewardClaim = async () => {
    if (new BigNumber(userGameReward).isEqualTo('0')) {
      setAlert({ type: 'warning', message: 'Reward is zero' });
      return;
    }

    setLoading(true);

    try {
      await gameRewardClaim();
      setAlert({ type: 'success', message: 'Game reward claim done' });
    } catch (err) {
      console.error(err);

      setAlert({ type: 'error', message: 'Game reward claim failed' });
    }

    setLoading(false);
  };

  const onClickTopPlayerRewardClaim = async () => {
    if (new BigNumber(topPlayerReward).isEqualTo('0')) {
      setAlert({ type: 'warning', message: 'Reward is zero' });
      return;
    }

    setLoading(true);

    try {
      await topPlayerRewardClaim();
      setAlert({ type: 'success', message: 'Top player reward claim done' });
    } catch (err) {
      console.error(err);

      setAlert({ type: 'error', message: 'Top player reward claim failed' });
    }

    setLoading(false);
  };

  useEffect(() => {
    getRewards();
  }, [userStakingReward, userGameReward, topPlayerReward]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ type: null, message: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <PageLayout>
      <div className="h-full w-full flex flex-col justify-center items-center mt-[128px]">
        <PageTitle title={'Put your $MOONDOG to work'} subTitle="Stake, play and earn to become part of the legend" />

        {/* Rewards */}
        <div className="h-full w-full flex flex-row justify-center items-center gap-12 mt-12 px-24">
          <RewardBox
            title={'Staking Reward'}
            subTitle={'“Staking means family”'}
            rewardValue={userStakingReward}
            claimOnClick={onClickStakingClaim}
          >
            <img src={RewardBoxStakingReward} className="mt-2" />
          </RewardBox>
          <RewardBox
            title={'Game Reward'}
            subTitle={'“Get rich or die tryin’”'}
            rewardValue={userGameReward}
            claimOnClick={onClickGameRewardClaim}
          >
            <img src={RewardBoxGameReward} />
          </RewardBox>
          <RewardBox
            title={'Top Player Reward'}
            subTitle={'“Who is the boss”'}
            rewardValue={topPlayerReward}
            claimOnClick={onClickTopPlayerRewardClaim}
          >
            <img src={RewardBoxTopPlayer} />
          </RewardBox>
        </div>

        {/* Where to Buy */}
        <div className="h-full w-full flex flex-row justify-center items-center gap-12 mt-12 px-24">
          <div className="flex flex-col justify-center items-start">
            <div className="relative flex flex-row justify-center items-center" style={{ marginBottom: 0 }}>
              <img src={WhereToBuyQuestionMark1} className="w-[20px] h-[20px] mr-5" />
              <img src={WhereToBuyQuestionMark2} className="w-[11px] h-[11px] absolute" />
            </div>
            <div
              className="flex flex-row justify-start items-center font-concert-one text-lg relative"
              style={{ transform: 'rotate(-5deg)', top: '-15px' }}
            >
              <div>Where to </div>
              <div className="relative flex flex-row justify-center items-center">
                <img src={WhereToBuyAnnotation} className="min-w-[85px] h-[40px] mt-2" />
                <span className="absolute left-2 text-xl">Buy?</span>
              </div>
            </div>
          </div>
          <RewardSwatch
            url={
              'https://pancakeswap.finance/swap?outputCurrency=0xe06342e11e420e723eee4b04e3e6fe1c8c9e741c&inputCurrency=0x55d398326f99059fF775485246999027B3197955'
            }
          >
            Dextools
          </RewardSwatch>
          <RewardSwatch
            url={
              'https://pancakeswap.finance/swap?outputCurrency=0xe06342e11e420e723eee4b04e3e6fe1c8c9e741c&inputCurrency=0x55d398326f99059fF775485246999027B3197955'
            }
          >
            <span>DEX</span>
            <span>Screener</span>
          </RewardSwatch>
          <RewardSwatch
            url={
              'https://pancakeswap.finance/swap?outputCurrency=0xe06342e11e420e723eee4b04e3e6fe1c8c9e741c&inputCurrency=0x55d398326f99059fF775485246999027B3197955'
            }
          >
            ETC
          </RewardSwatch>
        </div>
      </div>
      {loading && <Loading />}
      <Alert type={alert.type} message={alert.message} />
    </PageLayout>
  );
};

export default Rewards;
