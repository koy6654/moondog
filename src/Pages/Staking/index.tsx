import MainDashboard from './MainDashboard';
import Rewards from './Rewards';
import UserManual from './UserManual';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

const Staking: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <MainDashboard />
      <Rewards />
      <UserManual />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Staking;
