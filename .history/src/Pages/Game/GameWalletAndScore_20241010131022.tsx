import React from 'react';
import PageLayout from '../../Components/PageLayout';
import { ReactComponent as Bulb } from '../../Assets/Icons/Bulb.svg';
import { useNavigate } from 'react-router-dom';
import FaqButton from '../../Assets/Images/FaqButton.svg';
import GameShapeRectangle from '../../Assets/Images/GameShapeRectangle.svg';
import Gem from '../../Assets/Images/Gem.png';

export default function GameWalletAndScore() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-[26px] mb-[60px]">
        {/* 왼쪽: 검색 + 점수 */}

        <div className="flex flex-col">
          {/* 검색 영역 */}
          <div className="flex items-center w-[685px] ml-[10px]">
            <input
              type="text"
              placeholder="Insert Your Wallet Address"
              className="flex flex-[7] h-[74px] px-[58px] font-concert-one text-[26px] color-[rgba(0, 0, 0, 0.25)] flex-growpy-2 border-[3px] border-solid border-black rounded-l-full rounded-r-none"
            />
            <button className="flex flex-[3] h-[74px] justify-center items-center m-0 bg-[#F1D544] border-[3px] border-solid border-black rounded-r-full rounded-l-none rounded-full border-l-0 font-concert-one text-center text-[32px]">
              Search
            </button>
          </div>

          {/* 점수 영역 */}
          <div
            className="flex justify-between items-center w-[709px] h-[100px] relative px-[60px] py-[32px] mt-[7px]"
            style={{
              backgroundImage: `url(${GameShapeRectangle})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex justify-start items-center">
              <img src={Gem} alt="Gem" className="h-full mr-[13px]" />
              <p className="font-concert-one text-left text-[32px]">My Score:</p>
            </div>
            <div>
              <span className="font-concert-one text-right text-[44px]">000,000</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: FAQ 버튼 */}
        <button
          onClick={handleButtonClick}
          className="game-faq-button w-[225px] h-[180px] mt-[10px] lg:mt-0"
          // style={{
          //   backgroundImage: `url(${FaqButton})`,
          //   backgroundSize: 'contain',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundPosition: 'center',
          // }}
        >
          <div className="flex flex-row lg:flex-col justify-center items-center">
            <Bulb className="mr-[5px] lg:mr-0" />
            <span className="font-concert-one text-[24px] leading-tight ">Check out</span>
            <span className="font-concert-one text-[37px] leading-tight">&nbsp;FAQ</span>
          </div>
        </button>
      </div>
    </PageLayout>
  );
}
