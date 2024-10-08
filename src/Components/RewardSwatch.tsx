import './Components.css';
import RewardSwatchImage from '../Assets/Images/RewardSwatch.png';

interface RewardSwatchProps {
  url: string;
  children: React.ReactNode;
}

const RewardSwatch: React.FC<RewardSwatchProps> = ({ url, children }) => {
  const handleOnClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-[100px] h-[100px] cursor-pointer" onClick={handleOnClick}>
      <img src={RewardSwatchImage} className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 flex flex-col justify-center items-center font-concert-one text-lg">
        {children}
      </div>
    </div>
  );
};

export default RewardSwatch;
