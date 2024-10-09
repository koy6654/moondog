import React, { useEffect, useState } from 'react';
import PageLayout from '../../Components/PageLayout';
import LeaderboardTable, { TopRankList } from '../../Components/LeaderboardTable';

import LeaderboardIcon from '../../Assets/Images/Leaderboard.png';
import Divider from '../../Components/Divider';
import Loading from '../../Components/Loading';
import { useRecoilState } from 'recoil';
import { loadingRecoil } from '../../State';

export default function GameLeaderboard() {
  const [topRankList, setTopRankList] = useState<TopRankList[]>([]);
  const [loading, setLoading] = useRecoilState(loadingRecoil);

  const getLeaderboardInfo = async () => {
    // TODO
    // const { data: list } = await axios.get<string>(
    //   `${process.env.REACT_APP_API_DOMAIN}/api/GetInfo?startPage=0&take=10`
    // );
    const list = {
      errCode: 0,
      message: 'message',
      totalCount: 3,
      scoreInfo: [
        {
          address: '0x121211',
          score: 500,
        },
        {
          address: '0x1234',
          score: 200,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
        {
          address: '0x12345',
          score: 100,
        },
      ],
    };

    setTopRankList(list.scoreInfo);
  };

  useEffect(() => {
    getLeaderboardInfo();
  }, []);

  return (
    <PageLayout>
      {/* Leaderboard */}
      <div className="w-[1000px] h-[526px] bg-[#FFFFFF] shadow-lg border-4 border-black p-8 mx-auto mb-[145px]">
        <div className="flex flex-col font-concert-one text-left text-base">
          <div className="flex flex-row justify-start items-center mb-4">
            <img src={LeaderboardIcon} alt="Leaderboard" className="w-[19px] h-full" />
            <span className="ml-2 text-[32px]">Leaderboard</span>
          </div>
          <Divider />
          <LeaderboardTable topRankList={topRankList} contentHeight={400} />
        </div>
      </div>

      {loading && <Loading />}
    </PageLayout>
  );
}
