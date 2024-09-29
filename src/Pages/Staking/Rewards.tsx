import PageLayout from '../../Components/PageLayout';
import CloudSquare1 from '../../Assets/Images/cloud_square.png';
import CloudSquare2 from '../../Assets/Images/cloud_square.png';
import CloudSquare3 from '../../Assets/Images/cloud_square.png';
import CloudSquare4 from '../../Assets/Images/cloud_square.png';
import CloudSquare5 from '../../Assets/Images/cloud_square.png';
import PageTitle from '../../Components/PageTitle';

const images = [CloudSquare1, CloudSquare2, CloudSquare3, CloudSquare4, CloudSquare5];

const Rewards: React.FC = () => {
  return (
    <PageLayout>
      <div className="h-full grid grid-rows-3 grid-cols-4 gap-4">
        {/* Header */}
        <div className="row-span-1 col-span-4 p-4 text-center">
          <PageTitle title={'Put your $MOONDOG to work'} />
        </div>

        {/* Images */}
        {/* <div className="h-full row-span-2 col-span-1 p-4 text-center">
          <div className="flex flex-wrap flex-row justify-evenly">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={''}
                className="min-w-5 min-h-5 object-cover transition-transform duration-75"
              />
            ))}
          </div>
          Put your Moondog to work. Stake, play and earn to become a part of the legend
        </div> */}
        <div className="h-full row-span-2 col-span-1 p-4 text-center">
          <div className="flex flex-wrap justify-center items-center h-full">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="w-10 h-10 max-w-full object-cover m-2 transition-transform duration-75"
              />
            ))}
            <p>Put your Moondog to work. Stake, play and earn to become a part of the legend.</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="row-span-1 col-span-1 p-4 text-center">Staking reward</div>
        <div className="row-span-1 col-span-1 p-4 text-center">Game reward</div>
        <div className="row-span-1 col-span-1 p-4 text-center">Top player reward</div>

        {/* Exchange logos */}
        <div className="row-span-1 col-span-3 p-4 text-center">리더보드</div>
      </div>
    </PageLayout>
  );
};

export default Rewards;
