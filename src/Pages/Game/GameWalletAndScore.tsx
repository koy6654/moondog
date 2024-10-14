import React, { useEffect, useState } from 'react';
import PageLayout from '../../Components/PageLayout';
import { ReactComponent as Bulb } from '../../Assets/Icons/Bulb.svg';
import { useNavigate } from 'react-router-dom';
import FaqButton from '../../Assets/Images/FaqButton.svg';
import GameShapeRectangle from '../../Assets/Images/GameShapeRectangle.svg';
import Gem from '../../Assets/Images/Gem.png';

export default function GameWalletAndScore() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/#section-faq');
  };

  const [score, setScore] = useState(0);
  useEffect(() => {
    // postMessage를 통해 게임 오버 상태를 받기 위한 이벤트 리스너
    const handleMessage = (event: MessageEvent) => {
      console.log(event);
      if (event.data && event.data.status === 'gameOver') {
        setScore(event.data.score);
      }
      if (event.data && event.data.status === 'gameStart') {
        setScore(0);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <PageLayout>
      {/* 해상도 낮을때: col, 해상도 높을때: row */}
      <div
        className="flex flex-col w-full justify-center items-center mt-[26px] mb-[32px] sm:mb-[57px]
        lg:flex-row
        lg:space-x-4
        lg:w-[79%] 
        xl:w-[64%]
        2xl:w-[790px]
      "
      >
        {/* 왼쪽: 검색 + 점수 */}

        <div className="flex flex-col w-full justify-center items-center">
          {/* 검색 영역 */}
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Insert Your Wallet Address"
              className="w-full flex flex-[7] h-[60px] sm:h-[74px] px-[15px] sm:px-[40px] font-concert-one text-[15px] sm:text-[26px] color-[rgba(0, 0, 0, 0.25)] py-2 border-[3px] border-solid border-black rounded-l-full rounded-r-none"
            />
            <button className="flex flex-[3] h-[60px] sm:h-[74px] justify-center items-center m-0 bg-[#F1D544] border-[3px] border-solid border-black rounded-r-full rounded-l-none rounded-full border-l-0 font-concert-one text-center text-[18px] sm:text-[32px]">
              Search
            </button>
          </div>

          {/* 점수 영역 */}
          <div className="game-score-container flex justify-between items-center w-full h-[66px] sm:h-[96px] relative px-[20px] sm:px-[60px] mt-[6px]">
            <div className="flex justify-start items-center">
              <img src={Gem} alt="Gem" className="h-full mr-[5px] sm:mr-[13px]" />
              <p className="font-concert-one text-left text-[22px] sm:text-[32px]">My Score:</p>
            </div>
            <div>
              <span className="font-concert-one text-right text-[24px] sm:text-[44px]">{score}</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: FAQ 버튼 */}
        <button
          onClick={handleButtonClick}
          className="game-faq-button w-[284px] h-[168px] mt-[10px] lg:mt-0"
          // style={{
          //   backgroundImage: `url(${FaqButton})`,
          //   backgroundSize: 'contain',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundPosition: 'center',
          // }}
        >
          <div className="flex flex-row lg:flex-col justify-center items-center">
            <Bulb className="mr-[5px] lg:mr-0" />
            <span className="font-concert-one text-[22px] sm:text-[24px] leading-tight ">Check out</span>
            <span className="font-concert-one text-[32px] sm:text-[37px] leading-tight">&nbsp;FAQ</span>
          </div>
        </button>
      </div>
    </PageLayout>
  );
}
