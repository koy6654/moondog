import PlaygroundTitle from '../../Assets/Images/PlaygroundTitle.png';
import Divider from '../../Components/Divider';

const Playground: React.FC = () => {
  return (
    <>
      <div className="w-full mb-12">
        <div className="flex flex-row justify-center items-center">
          <Divider />
          <div className="mx-20">
            <img src={PlaygroundTitle} alt="PlaygroundTitle" className="w-[240px] h-auto" />
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
};

export default Playground;
