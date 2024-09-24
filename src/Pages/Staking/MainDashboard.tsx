import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Button from '../../Components/Button';
import PageLayout from '../../Components/PageLayout';
import useStaking from '../../Hooks/useStaking';

const MainDashboard: React.FC = () => {
  const { isConnected } = useStaking();

  const navigate = useNavigate();

  const goToGamePage = () => {
    navigate('/game');
  };

  return (
    <PageLayout>
      {/* Grid */}
      <div className="h-full grid grid-rows-3 grid-cols-2 gap-4">
        {/* Header */}
        <div className="col-span-2 bg-blue-500 p-4 text-white text-center">
          <h1 className="text-2xl">“Stake Your $moondog to play - Sip the Moonshine, Earn the Rewards!”</h1>
        </div>

        {/* Wallet */}
        <div className="row-span-2 col-span-1 bg-blue-500 p-4 text-white text-center">
          <div className="grid grid-rows-4 grid-cols-4">
            {/* Connect my wallet */}
            <div className="col-span-4">
              {isConnected === true ? (
                <div>Connected</div>
              ) : (
                <Button label={'Connect my wallet'} onClick={() => console.log('button')} />
              )}
            </div>
            {/* Enter Tokens Amount */}
            <div className="col-span-4">
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-left text-black">{'Enter Tokens Amount'}</label>
                <input
                  type="text"
                  className="bg-white text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">TVL</div>
              <div className="text-sm">000</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Total Staked</div>
              <div className="text-sm">0</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Available $moondog</div>
              <div className="text-sm">0</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm">Staking Amount</div>
              <div className="text-sm">0</div>
            </div>
            <div className="col-span-2">
              <Button label={'STAKE'} onClick={() => console.log('button')} />
            </div>
            <div className="col-span-2">
              <Button label={'UNSTAKE'} onClick={() => console.log('button')} />
            </div>
          </div>
        </div>

        {/* Game preview */}
        <div className="col-span-1 bg-blue-500 p-4 text-white text-center">
          <div>Game preview</div>
          <div>
            <Button label={'Play Moondog Game'} onClick={goToGamePage} />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="col-span-1 bg-blue-500 p-4 text-white text-center">
          <div>Leaderboard</div>
          <div>Ranking</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MainDashboard;
