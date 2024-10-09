import Playground from '../../Components/Playground';
import GameArea from './GameArea';
import GameLeaderboard from './GameLeaderboard';
import GameTitle from './GameTitle';
import GameWalletAndScore from './GameWalletAndScore';

const Staking: React.FC = () => {
  return (
    <div className="h-full w-full overflow-auto bg-game-texture flex flex-col items-center">
      <Playground />
      <GameTitle title={'Earn points to claim $MOONDOG'} />
      <GameArea />
      <GameWalletAndScore />
      <GameLeaderboard />
    </div>
  );
};

export default Staking;
