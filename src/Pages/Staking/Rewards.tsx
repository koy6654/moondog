import PageLayout from '../../Components/PageLayout';
import CloudSquare1 from '../../Assets/Images/cloud_square.png';
import CloudSquare2 from '../../Assets/Images/cloud_square.png';
import CloudSquare3 from '../../Assets/Images/cloud_square.png';
import CloudSquare4 from '../../Assets/Images/cloud_square.png';
import CloudSquare5 from '../../Assets/Images/cloud_square.png';
import PageTitle from '../../Components/PageTitle';
import Button from '../../Components/Button';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import useStaking from '../../Hooks/useStaking';
import useGame from '../../Hooks/useGame';

const images = [CloudSquare1, CloudSquare2, CloudSquare3, CloudSquare4, CloudSquare5];

const Rewards: React.FC = () => {
  const { address } = useAccount();
  const { getUserReward } = useStaking();
  const { getUserGameReward } = useGame();

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

  useEffect(() => {
    getRewards();
  }, [userGameReward, topPlayerReward]);

  return (
    <PageLayout>
      <div className="h-full grid grid-rows-3 grid-cols-4 gap-4">
        {/* Header */}
        <div className="row-span-1 col-span-4 p-4 text-center">
          <PageTitle title={'Put your $MOONDOG to work'} />
        </div>

        {/* Images */}
        {/* <div className="h-full row-span-2 col-span-1 p-4 text-center">
          <div className="flex flex-wrap flex-row justify-evenly">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={''}
                className="min-w-5 min-h-5 object-cover transition-transform duration-75"
              />
            ))}
          </div>
          Put your Moondog to work. Stake, play and earn to become a part of the legend
        </div> */}
        <div className="h-full row-span-2 col-span-1 p-4 text-center">
          <div className="flex flex-wrap justify-center items-center h-full">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="w-10 h-10 max-w-full object-cover m-2 transition-transform duration-75"
              />
            ))}
            <p>Put your Moondog to work. Stake, play and earn to become a part of the legend.</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="row-span-1 col-span-1 p-4 text-center">
          <div className="flex flex-col">
            <div>Staking reward</div>
            <div>{userStakingReward}</div>
          </div>
        </div>
        <div className="row-span-1 col-span-1 p-4 text-center">
          <div className="flex flex-col">
            <div>Game reward</div>
            <div>{userGameReward}</div>
          </div>
        </div>
        <div className="row-span-1 col-span-1 p-4 text-center">
          <div className="flex flex-col">
            <div>Top player reward</div>
            <div>{topPlayerReward}</div>
          </div>
        </div>
        <Button label={'test'} onClick={() => console.log('test')} />
        {/* Exchange logos */}
        <div className="row-span-1 col-span-3 p-4 text-center">리더보드</div>
      </div>
    </PageLayout>
  );
};

export default Rewards;
