import PageTitle1 from '../../Assets/Images/PageTitle1.png';
import PageTitle2 from '../../Assets/Images/PageTitle2.png';
import PageLayout from '../../Components/PageLayout';

interface PageTitleProps {
  title: string;
  subTitle?: string;
}

const GameTitle: React.FC<PageTitleProps> = ({ title, subTitle }) => {
  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col justify-center items-center mt-[10px] sm:mt-10 mb-[20px]">
        <p
          className="font-comic-sans-ms text-center text-[25px] sm:text-[38px] font-normal leading-normal"
          style={{
            color: 'rgb(255, 255, 255)',
            fontWeight: 700,
            textShadow: `
                -2px -2px 0 rgba(0, 0, 0, 1),
                2px -2px 0 rgba(0, 0, 0, 1),
                -2px 2px 0 rgba(0, 0, 0, 1),
                2px 2px 0 rgba(0, 0, 0, 1)
              `,
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: 'black',
          }}
        >
          Free to play
        </p>

        <div className="flex justify-between items-center">
          <img
            className="flex w-[50px] h-[50px] sm:w-[105px] sm:h-[105px] md:w-[90px] md:h-[90px] lg:w-[75px] lg:h-[75px] xl:w-[60px] xl:h-[60px]"
            src={PageTitle1}
            alt="Left"
          />
          <div className="flex flex-col items-center justify-center label mx-[0px] sm:mx-[0px] md:mx-[20px] lg:mx-[30px]">
            <p
              className="font-comic-sans-ms text-center text-[35px] sm:text-[38px] leading-[48px] sm:leading-[62px]"
              style={{
                fontWeight: 900,
                textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                WebkitTextStrokeWidth: '3px',
                WebkitTextStrokeColor: 'black',
                backgroundImage: `linear-gradient(180deg, #fff0a4 39.62%, #f3b004 100%)`,
                color: `transparent`,
                WebkitBackgroundClip: `text`,
                backgroundClip: `text`,
                fontStyle: `normal`,
              }}
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
    </PageLayout>
  );
};

export default GameTitle;
