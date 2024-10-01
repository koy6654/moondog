import './Components.css';
import React from 'react';

export interface TopRankList {
  address: string;
  score: number;
}

interface LeaderboardTableProps {
  topRankList: TopRankList[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ topRankList }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <div className="max-w-full h-60 overflow-y-auto leaderboard-scrollbar relative">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#EECCA0] rounded-[14px]">
              <th className="p-4">Rank</th>
              <th className="p-4">l</th>
              <th className="p-4">Wallet Address</th>
              <th className="p-4">l</th>
              <th className="p-4">Top Score</th>
            </tr>
          </thead>
          <tbody>
            {topRankList.map((topRank, index) => (
              <tr key={index}>
                <td className="border-b-4 border-[#A2845E] p-4">{index + 1}</td>
                <td className="border-b-4 border-[#A2845E] p-4"></td>
                <td className="border-b-4 border-[#A2845E] p-4">{topRank.address}</td>
                <td className="border-b-4 border-[#A2845E] p-4"></td>
                <td className="border-b-4 border-[#A2845E] p-4">{topRank.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
