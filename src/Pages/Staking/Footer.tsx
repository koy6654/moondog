import PageLayout from '../../Components/PageLayout';
import PlaygroundTitle from '../../Assets/Images/PlaygroundTitle.png';
import FooterHome from '../../Assets/Images/FooterHome.png';
import FooterPaperPlane from '../../Assets/Images/FooterPaperPlane.png';
import FooterTwitter from '../../Assets/Images/FooterTwitter.png';

const Footer: React.FC = () => {
  const handleOnClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="w-full h-[85.76px] justify-between items-center inline-flex pb-40 md:pb-32 lg:pb-28 px-2 md:px-6 lg:px-8">
        <img className="w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px] 2xl:w-[180px] h-auto" src={PlaygroundTitle} />
        <div className="flex-grow text-center text-[#a2845e] text-xs font-bold font-comic-sans-ms">
          (C)2024. MOONDOG. All Right Reserved.
        </div>
        <div className="w-[100px] md:w-[120px] lg:w-[150px] h-8 flex flex-row justify-between items-center">
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterHome} />
          </div>
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterPaperPlane} />
          </div>
          <div className="w-[20px] md:w-[30px] lg:w-[35px] h-8 cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterTwitter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
