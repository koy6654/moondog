import PageLayout from '../../Components/PageLayout';

const UserManual: React.FC = () => {
  return (
    <PageLayout>
      {/* Grid */}
      <div className="h-full grid grid-rows-3 grid-cols-2 gap-4">
        {/* Header */}
        <div className="col-span-2 bg-blue-500 p-4 text-white text-center">
          <h1 className="text-2xl">“Stake Your $moondog to play - Sip the Moonshine, Earn the Rewards!”</h1>
        </div>

        {/* Wallet */}
        <div className="row-span-2 col-span-1 bg-green-500 p-4 text-white text-center">월렛</div>

        {/* Game preview */}
        <div className="col-span-1 bg-red-500 p-4 text-white text-center">게임</div>

        {/* Leaderboard */}
        <div className="col-span-1 bg-purple-500 p-4 text-white text-center">리더보드</div>
      </div>
    </PageLayout>
  );
};

export default UserManual;
