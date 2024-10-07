import React from 'react';

import { ReactComponent as ChevronRight } from '../Assets/Icons/ChevronRight.svg';

interface FaqBoxProps {
  question: string;
  answer: string;
}

export default function FaqBox(props: FaqBoxProps) {
  const { question, answer } = props;
  return (
    <>
      <div className={`question flex items-center justify-between text-[20px] pb-[12px] pl-[36px] `}>
        <h3>{question}</h3>
        <i className="icon pr-[36px]">
          <ChevronRight />
        </i>
      </div>
      <div
        className="answer px-[31px] py-[21px] text-[#FFF] text-[16px] font-thin leading-[23px] mb-[14px]"
        style={{ background: 'rgba(162, 132, 94, 0.80)' }}
      >
        {answer}
      </div>
    </>
  );
}
