import Playground from './Playground';
import MainDashboard from './MainDashboard';
import Rewards from './Rewards';
import UserManual from './UserManual';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

const Staking: React.FC = () => {
  return (
    // <div className="bg-texture bg-[#E3C094] bg-cover flex flex-col w-full h-full">
    <div className="bg-texture bg-[#E3C094] bg-cover flex flex-col w-full h-auto min-h-screen overflow-y-auto">
      <Playground />
      <MainDashboard />
      <Rewards />
      <UserManual />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Staking;
