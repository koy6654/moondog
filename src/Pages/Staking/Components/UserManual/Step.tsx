import React, { ReactNode } from 'react';

// svg to component (jsx)
import { ReactComponent as ChevronRight } from '../../../../Assets/Icons/ChevronRight.svg';
// svg to image (for background)
import BoxArrowRight from '../../../../Assets/Icons/BoxArrowRight.svg';

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
      <div className="flex items-center relative mb-[15px] max-w-[1196px] h-[90px] bg-[#FFF] border-[3px] border-solid border-black rounded-[32px] font-concert-one text-black text-lg px-[88px]">
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
        <h4 className="title font-normal text-black text-[26px] tracking-[0] leading-[33px]">{title}</h4>
        <i className="icon" style={{ marginLeft: `${chevronRightMargin}px`, marginRight: `${chevronRightMargin}px` }}>
          <ChevronRight />
        </i>
        <div className="description absolute left-[412px] text-[16px] font-comic-sans-ms font-bold">{description}</div>
      </div>
    </div>
  );
}
