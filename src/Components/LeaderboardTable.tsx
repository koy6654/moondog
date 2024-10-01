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
    <div className="overflow-x-auto">
      <div className="max-w-full h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-4">ID</th>
              <th className="border border-gray-400 p-4">Name</th>
              <th className="border border-gray-400 p-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {topRankList.map((topRank, index) => (
              <tr key={topRank.address} className="hover:bg-gray-100">
                <td className="border border-gray-400 p-4">{index}</td>
                <td className="border border-gray-400 p-4">{topRank.address}</td>
                <td className="border border-gray-400 p-4">{topRank.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
