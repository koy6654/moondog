import MainDashboard from './MainDashboard/MainDashboard';
import Rewards from './Rewards';
import UserManual from './UserManual';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

const Staking: React.FC = () => {
  return (
    <div className="bg-texture bg-[#E3C094] bg-cover flex flex-col w-full h-full">
      <MainDashboard />
      <Rewards />
      <UserManual />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Staking;
