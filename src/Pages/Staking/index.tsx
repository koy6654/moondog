import MainDashboard from './MainDashboard';
import Rewards from './Rewards';
import UserManual from './UserManual';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Footer from './Footer';
import Playground from '../../Components/Playground';

const Staking: React.FC = () => {
  return (
    <div className="h-full w-full relative pb-[298px] overflow-auto bg-staking-texture flex flex-col">
      <Playground />
      <MainDashboard />
      <Rewards />
      <UserManual />
      <FrequentlyAskedQuestions />
      <Footer />
    </div>
  );
};

export default Staking;
