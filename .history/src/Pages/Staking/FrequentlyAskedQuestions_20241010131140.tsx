import PageLayout from '../../Components/PageLayout';
import PageTitle from '../../Components/PageTitle';
import { ReactComponent as InfoSign } from '../../Assets/Icons/InfoSign.svg';
import { ReactComponent as FaqShapeLine } from '../../Assets/Images/FaqShapeLine.svg';

import FaqBox from '../../Components/FaqBox';

const FrequentlyAskedQuestions: React.FC = () => {
  return (
    <PageLayout>
      {/* Grid */}
      <div
        id="section-faq"
        className="h-full grid grid-rows-1 grid-cols-2 gap-[39px] mt-14 lg:mt-[128px] mb-[330px] lg:mb-[250px]"
      >
        {/* Header */}
        <div className="col-span-2 py-4 sm:px-1 text-white text-center">
          <PageTitle title={'FAQ'} subTitle="We are the speakeasy for you to know too much" />
        </div>

        <div className="col-span-2 md:col-auto font-comic-sans-ms font-bold w-full max-w-[703px]">
          <div className="title flex flex-col items-start">
            <div className="flex items-center">
              <i>
                <InfoSign />
              </i>
              <h2 className="text-[32px] leading-none mx-[11px]">Basic Info.</h2>
            </div>
            <div className="my-[12px] w-full">
              <FaqShapeLine style={{ width: '100%' }} />
            </div>
          </div>
          <div className="faq-container py-[8px]" style={{ background: 'rgba(206, 166, 114, 0.49)' }}>
            <FaqBox
              question="Q. What is $MOONDOG staking?"
              answer="Moondog staking allows users to lock their $MOONDOG tokens for a specified period
in return for earning rewards. This incentivizes long-term holding and contributes 
to the network’s stability and growth."
            />
            <FaqBox
              question="Q. What is Moondog game?"
              answer="The Moondog game is part of the play-to-earn ecosystem where users can engage in 
              various fun and interactive activities. By playing, users can earn $MOONDOG tokens; 
              moreover, the users in the top 100 will be rewarded with a bonus tokens. "
            />
            <FaqBox
              question="Q. Wen?"
              answer="The launch dates and specific features of Moondog staking and the games are 
              announced via the official channels. Keep an eye on Moondog’s website and social 
              media for updates."
            />
            <FaqBox
              question="Q. How to stake $MOONDOG?"
              answer="To stake $MOONDOG, users will connect their wallets to the Moondog platform, 
              choose the amount to stake. After confirming the transaction, the tokens will be 
              locked, and rewards will begin accruing."
            />
            <FaqBox
              question="Q. When can I claim the rewards?"
              answer="Rewards can typically be claimed at the end of the staking period which occurs weeklys"
            />
            <FaqBox
              question="Q. Will there be benefits?"
              answer="Yes, staking provides several benefits, including earning passive income through 
              token rewards, gaining access to exclusive future drops, and possibly qualifying for
               rare NFTs or additional bonuses."
            />
            <FaqBox
              question="Q. Who can I contact for more info?"
              answer="For more information, you can reach out via Moondog’s official social media channels, 
              such as Telegram and Twitter."
            />
          </div>
        </div>
        <div className="col-span-2 md:col-auto font-comic-sans-ms font-bold w-full max-w-[703px]">
          <div className="title flex flex-col items-start">
            <div className="flex items-center">
              <i>
                <InfoSign />
              </i>
              <h2 className="text-[32px] leading-none mx-[11px]">Game Play</h2>
            </div>
            <div className="my-[12px] w-full">
              <FaqShapeLine style={{ width: '100%' }} />
            </div>
          </div>
          <div className="faq-container py-[8px]" style={{ background: 'rgba(206, 166, 114, 0.49)' }}>
            <FaqBox question="Q. Is Moondog game free?" answer="Yes, the Moondog game is free to play." />
            <FaqBox
              question="Q. How does the game work?"
              answer="The Moondog game operates on a play-to-earn model. Players can collect items 
              in the game to score points and aim for the highest score."
            />
            <FaqBox
              question="Q. Say more about the prize."
              answer="Prizes in the Moondog game include $MOONDOG tokens, future drops that offer 
              additional perks such as NFT, additional airdrops. Users in the top 100 can earn extra 
              $MOONDOG."
            />
            <FaqBox
              question="Q. How does the leaderboard work?"
              answer="The Moondog leaderboard tracks players’ progress based on highest scores in the game."
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FrequentlyAskedQuestions;
