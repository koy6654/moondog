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
      <div className="flex">
        <img src={PageTitle1} alt="Left" />
        <div className="label">
          <p className="text-wrapper">{title}</p>
        </div>
        <img src={PageTitle2} alt="Right" />
      </div>
      {Boolean(subTitle) && (
        <h4 className="sub-title flex mt-[16px] font-comic-sans-ms text-[#483D3D] text-center text-[24px] font-bold leading-normal">
          {subTitle}
        </h4>
      )}
    </div>
  );
};

export default PageTitle;
