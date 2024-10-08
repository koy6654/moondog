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
      <div className="flex justify-between items-center">
        <img
          className="flex w-[50px] h-[50px] sm:w-[105px] sm:h-[105px] md:w-[90px] md:h-[90px] lg:w-[75px] lg:h-[75px] xl:w-[60px] xl:h-[60px]"
          src={PageTitle1}
          alt="Left"
        />
        <div className="label mx-[0px] sm:mx-[0px] md:mx-[20px] lg:mx-[30px]">
          <p
            className="text-wrapper text-[#ffffff] text-stroke-xm sm:text-stroke-sm md:text-stroke-md lg:text-stroke-lg 2xl:text-stroke-2xl"
            style={{ fontWeight: 100 }}
          >
            {title}
          </p>
        </div>
        <img
          className="flex w-[50px] h-[50px] sm:w-[105px] sm:h-[105px] md:w-[90px] md:h-[90px] lg:w-[75px] lg:h-[75px] xl:w-[60px] xl:h-[60px]"
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
