import './Components.css';
import PageTitle1 from '../Assets/Images/PageTitle1.png';
import PageTitle2 from '../Assets/Images/PageTitle2.png';

interface PageTitleProps {
  title: string;
  subTitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subTitle }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <img
          className="flex w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] xl:w-[56px] xl:h-[56px] 2xl:w-[60px] 2xl:h-[60px]"
          src={PageTitle1}
          alt="Left"
        />
        <div className="label mx-[5px] sm:mx-[10px] md:mx-[20px] lg:mx-[30px]">
          <p
            className="font-comic-sans-ms-bold font-bold leading-normal text-[#FFF] text-center 
          text-shadow-1px text-[20px] 
          sm:text-shadow-2px sm:text-[24px]
          md:text-shadow-2px md:text-[28px] 
          lg:text-shadow-3px lg:text-[32px]
          xl:text-shadow-3px xl:text-[46px]
          2xl:text-shadow-3px 2xl:text-[42px]"
          >
            {title}
          </p>
        </div>
        <img
          className="flex w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] xl:w-[56px] xl:h-[56px] 2xl:w-[60px] 2xl:h-[60px]"
          src={PageTitle2}
          alt="Right"
        />
      </div>
      {Boolean(subTitle) && (
        <h4 className="sub-title flex mt-[16px] font-comic-sans-ms text-[#483D3D] text-center text-[20px] sm:text-[24px] font-bold leading-normal">
          {subTitle}
        </h4>
      )}
    </div>
  );
};

export default PageTitle;
