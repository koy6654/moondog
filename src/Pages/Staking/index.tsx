import Playground from './Playground';
import MainDashboard from './MainDashboard';
import Rewards from './Rewards';
import UserManual from './UserManual';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

const Staking: React.FC = () => {
  return (
    <div className="h-full w-full overflow-auto bg-texture bg-[#E3C094] bg-cover flex flex-col">
      <Playground />
      <MainDashboard />
      <Rewards />
      <UserManual />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Staking;
