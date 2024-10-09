import React from 'react';
import PageLayout from '../../Components/PageLayout';

export default function GameArea() {
  return (
    <PageLayout>
      <div className="w-full max-w-[1100px] h-auto aspect-[1100/718] flex-shrink-0 rounded-[20px] bg-[#1A1A1A]">
        <iframe
          title="TheGoldMiner"
          src="/game-main/game/index.html"
          allowFullScreen
          className="w-full h-full"
          style={{ borderRadius: 'inherit' }} // 부모의 border-radius 적용
        ></iframe>
      </div>
    </PageLayout>
  );
}
