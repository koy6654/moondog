import PageLayout from '../../Components/PageLayout';

export default function GameArea() {
  return (
    <PageLayout>
      <div
        className="w-full h-auto 
      2xl:max-w-[1100px] 2xl:aspect-[1100/718]
      max-w-[900px] aspect-[900/587]

      flex-shrink-0 rounded-[20px] bg-[#1A1A1A]"
      >
        <iframe
          title="TheGoldMiner"
          src="/Assets/game/index.html"
          allowFullScreen
          className="w-full h-full"
          style={{ borderRadius: 'inherit' }} // 부모의 border-radius 적용
        ></iframe>
      </div>
    </PageLayout>
  );
}
