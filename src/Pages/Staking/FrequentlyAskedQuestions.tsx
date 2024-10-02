import PageLayout from '../../Components/PageLayout';
import PageTitle from '../../Components/PageTitle';

const FrequentlyAskedQuestions: React.FC = () => {
  return (
    <PageLayout>
      {/* Grid */}
      <div className="h-full grid grid-rows-1 grid-cols-2 gap-4 mt-[128px]">
        {/* Header */}
        <div className="col-span-2 bg-blue-500 p-4 text-white text-center">
          <PageTitle title={'FAQ'} subTitle="We are the speakeasy for you to know too much" />
        </div>

        <div>
          <h2>Basic Info.</h2>
          <div className="faq-container">
            <div className="question">Q. What is $MOONDOG staking?</div>
            <div className="answer">
              Moondog staking allows users to lock their $MOONDOG tokens for a specified period in return for earning
              rewards. This incentivizes long-term holding and contributes to the network’s stability and growth.
            </div>
          </div>
        </div>
        <div>
          <h2>Game Play</h2>
        </div>
      </div>
    </PageLayout>
  );
};

export default FrequentlyAskedQuestions;
