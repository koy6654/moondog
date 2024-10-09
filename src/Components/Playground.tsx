import PlaygroundTitle from '../Assets/Images/PlaygroundTitle.png';
import Divider from './Divider';

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
    </>
  );
};

export default Playground;
