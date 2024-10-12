import PlaygroundTitle from '../../Assets/Images/PlaygroundTitle.png';
import FooterHome from '../../Assets/Images/FooterHome.png';
import FooterPaperPlane from '../../Assets/Images/FooterPaperPlane.png';
import FooterTwitter from '../../Assets/Images/FooterTwitter.png';
import BackgroundFooter from '../../Assets/Images/Background_footer.png';

const Footer: React.FC = () => {
  const handleOnClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div
      className='className="z-10 absolute w-full bottom-0 h-[578px]'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${BackgroundFooter})`,
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="w-full absolute bottom-0
         justify-between items-center pb-8
         flex
         flex-col
         md:flex-row 
         md:pb-24
         px-10
         sm:px-20
         md:px-30
         lg:px-40
         xl:px-50
         2xl:px-60"
      >
        <img className="w-[180px] h-[85px]" src={PlaygroundTitle} />
        <div className="text-center text-[#a2845e] text-xs font-bold font-comic-sans-ms mt-3 md:mt-0">
          (C)2024. MOONDOG. All Right Reserved.
        </div>
        <div className="flex flex-row justify-between items-center mt-3 md:mt-0 space-x-5 md:space-x-3">
          <div className="w-[32px] h-[32px] cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterHome} />
          </div>
          <div className="w-[32px] h-[32px] cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterPaperPlane} />
          </div>
          <div className="w-[32px] h-[32px] cursor-pointer" onClick={() => handleOnClick('')}>
            <img src={FooterTwitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
