import Playground from '../../Components/Playground';
import GameArea from './GameArea';
import GameLeaderboard from './GameLeaderboard';
import GameTitle from './GameTitle';
import GameWalletAndScore from './GameWalletAndScore';

const Staking: React.FC = () => {
  return (
    <div className="h-full w-full overflow-auto bg-game-texture bg-[#E3C094] bg-cover bg-center flex flex-col">
      <Playground />
      <GameTitle />
      <GameArea />
      <GameWalletAndScore />
      <GameLeaderboard />
    </div>
  );
};

export default Staking;
