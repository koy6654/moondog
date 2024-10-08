import PlaygroundTitle from '../../Assets/Images/PlaygroundTitle.png';
import Divider from '../../Components/Divider';
import PageTitle from '../../Components/PageTitle';
import PageTitle2 from '../../Components/PageTitle2';
import PageTitle3 from '../../Components/PageTitle3';
import PageTitle4 from '../../Components/PageTitle4';

const Playground: React.FC = () => {
  return (
    <>
      <div className="min-h-20 w-full">
        <div className="flex flex-row justify-center items-center px-2 sm:px-4 md:px-12 lg:px-20 xl:px-28">
          <Divider />
          <div className="mx-2.5 sm:mx-6 md:mx-14 lg:mx-16 xl:mx-[75px]">
            <img
              src={PlaygroundTitle}
              alt="PlaygroundTitle"
              className="w-[320px] md:w-[300px] lg:w-[280px] xl:w-[260px] 2xl:w-[240px] h-auto !max-w-none"
            />
          </div>
          <Divider />
        </div>
      </div>
      {/* PageTitle Test */}
      <div className="w-full flex flex-col justify-center items-center">
        <PageTitle title={'Sip the $MOONDOG, Earn the Rewards!'} />
        <PageTitle2 title={'Sip the $MOONDOG, Earn the Rewards!'} />
        <PageTitle3 title={'Sip the $MOONDOG, Earn the Rewards!'} />
        <PageTitle4 title={'Sip the $MOONDOG, Earn the Rewards!'} />
      </div>
    </>
  );
};

export default Playground;
