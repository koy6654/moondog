import './Components.css';
import RewardBoxRamp from '../Assets/Images/RewardBoxRamp.png';
import RewardBoxThreeStars from '../Assets/Images/RewardBoxThreeStars.png';

interface RewardBoxProps {
  title: string;
  subTitle?: string;
  rewardValue: string;
  backgroundColor: string;
  claimOnClick: () => void;
  children: React.ReactNode;
}

const RewardBox: React.FC<RewardBoxProps> = ({
  title,
  subTitle,
  rewardValue,
  backgroundColor,
  claimOnClick,
  children,
}) => {
  return (
    <div className="h-2/3 w-auto lg:w-1/3 flex flex-col justify-center items-center">
      <div
        className="flex flex-col justify-center items-center border border-[3px] rounded-[32px] px-4 pb-4"
        style={{ backgroundColor }}
      >
        <div className="relative flex flex-col justify-center items-center">
          <img src={RewardBoxRamp} className="overflow-hidden w-[100px] h-[60px]" />
          <img
            src={RewardBoxThreeStars}
            className="absolute top-1/2 left-1/2"
            style={{ transform: 'translate(-53%, -50%)' }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="font-concert-one text-2xl">{title}</div>
          <div>{children}</div>
          <div className="font-comic-sans-ms text-xl">{subTitle}</div>
        </div>
      </div>
      <div className="relative w-full flex flex-row justify-center items-center font-concert-one text-xl mt-[10px]">
        <div className="w-full h-[50px] bg-[#ffffff] border border-[3px] rounded-[32px] pl-6 py-2">{rewardValue}</div>
        <button className="absolute right-0 w-[80px] h-[55px] bg-[#FFCC00] border border-[3px]" onClick={claimOnClick}>
          Claim
        </button>
      </div>
    </div>
  );
};

export default RewardBox;
