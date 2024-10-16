import PageLayout from '../../Components/PageLayout';
import PageTitle from '../../Components/PageTitle';
import Step from '../../Components/Step';

const UserManual: React.FC = () => {
  return (
    <PageLayout>
      <div className="h-full w-full flex flex-col justify-center items-center mt-10 sm:mt-14 lg:mt-[128px]">
        {/* <div className="h-full w-full flex flex-col justify-center items-center sm:mt-14 lg:mt-[128px]"> */}
        {/* Header */}
        <div className="py-4 sm:px-1 text-white text-center">
          <PageTitle title={'How to smuggle your $MOONDOG'} />
        </div>
        <div className="step-container w-full max-w-[1244px] mt-[15px] lg:mt-[56px]">
          <Step
            stepNumber="01"
            title={
              <>
                Deposit and
                <br />
                connect
              </>
            }
            chevronRightMargin={66}
            description={<>Connect Metamask to the MOONDOG Staking Platform</>}
          />
          <Step
            stepNumber="02"
            title={<>Staking</>}
            chevronRightMargin={102}
            description={<>Earn $MOONDOG by staking</>}
          />
          <Step
            stepNumber="03"
            title={
              <>
                Receive
                <br />
                Staking Rewards
              </>
            }
            chevronRightMargin={39}
            description={<>Rewards are claimable after 7days</>}
          />
          <Step
            stepNumber="04"
            title={<>Play Game</>}
            chevronRightMargin={82}
            description={
              <>
                Play game to earn additional reward.
                <br />
                You don’t have to stake to play the game
              </>
            }
          />
          <Step
            stepNumber="05"
            title={
              <>
                Receive
                <br />
                Gaming Rewards
              </>
            }
            chevronRightMargin={33}
            description={
              <>Rewards are claimable after playing the game and when you are in the top 10 of the weekly leaderboard</>
            }
          />
          <Step
            stepNumber="06"
            title={<>Claim Rewards</>}
            chevronRightMargin={52}
            description={<>Connect Metamask to the MOONDOG Staking Platform</>}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default UserManual;
