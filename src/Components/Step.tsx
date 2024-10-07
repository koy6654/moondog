import React, { ReactNode } from 'react';

// svg to component (jsx)
import { ReactComponent as ChevronRight } from '../Assets/Icons/ChevronRight.svg';
// svg to image (for background)
import BoxArrowRight from '../Assets/Icons/BoxArrowRight.svg';

interface StepProps {
  stepNumber: string;
  title: ReactNode;
  description: ReactNode;
  chevronRightMargin?: number;
}

export default function Step(props: StepProps) {
  const { stepNumber, title, description, chevronRightMargin = 0 } = props;
  return (
    <div className={`step-${stepNumber}`}>
      <div className="flex flex-col items-start md:flex-row md:items-center relative mb-[15px] max-w-[1196px] h-auto md:h-[90px] bg-[#FFF] border-[3px] border-solid border-black rounded-[32px] font-concert-one text-black text-lg pl-[88px] pr-[0px] md:pl-[88px]">
        <div
          className="absolute left-[-5%] flex justify-center items-center font-bold w-[111px] h-[55px]"
          style={{
            backgroundImage: `url(${BoxArrowRight})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
          }}
        >
          <span className="ml-[-10px] mt-[-5px]">Step {stepNumber}</span>
        </div>
        <div className="flex justify-start items-center">
          <h4 className="title font-normal text-black text-[26px] tracking-[0] leading-[33px]">{title}</h4>
          <i className="icon" style={{ marginLeft: `${chevronRightMargin}px`, marginRight: `${chevronRightMargin}px` }}>
            <ChevronRight />
          </i>
        </div>
        <div className="description text-[16px] font-comic-sans-ms font-bold relative left-0 right-0 md:absolute md:left-[340px] lg:left-[412px md:text-[16px]">
          {description}
        </div>
        {/* 추가 공간을 위한 여백 */}
        <div className="block md:hidden h-0.5"></div>
      </div>
    </div>
  );
}
