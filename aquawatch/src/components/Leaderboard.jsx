import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const { getLeaderboard, BADGES } = useApp();
  const leaderboard = getLeaderboard();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy size={32} />
          <h1 className="text-2xl font-bold">Community Leaderboard</h1>
        </div>
        <p className="text-yellow-100">
          Top reporters making a difference in water and sanitation!
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const rankConfig = {
            1: { icon: '🥇', height: 'h-48', bg: 'bg-gradient-to-b from-yellow-400 to-yellow-500' },
            2: { icon: '🥈', height: 'h-40', bg: 'bg-gradient-to-b from-gray-300 to-gray-400' },
            3: { icon: '🥉', height: 'h-32', bg: 'bg-gradient-to-b from-orange-400 to-orange-500' }
          };
          const config = rankConfig[rank];

          return (
            <div
              key={user.id}
              className={`${config.bg} text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-end ${config.height}`}
            >
              <div className="text-6xl mb-2">{config.icon}</div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.name}</p>
                <p className="text-xl font-semibold">{user.points} points</p>
                <div className="flex justify-center mt-2 space-x-1">
                  {user.badges?.slice(0, 3).map((badgeId, i) => {
                    const badge = BADGES[badgeId];
                    return badge ? (
                      <span key={i} className="text-2xl" title={badge.name}>
                        {badge.icon}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">All Reporters</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboard.map((user, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            
            return (
              <div
                key={user.id}
                className={`p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${
                  isTopThree ? 'bg-yellow-50' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  rank === 1 ? 'bg-yellow-400 text-white' :
                  rank === 2 ? 'bg-gray-300 text-white' :
                  rank === 3 ? 'bg-orange-400 text-white' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {rank <= 3 ? rank : rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    {user.badges?.includes('LIFESAVER') && (
                      <span className="text-xl">💉</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{user.reportsCount} reports submitted</p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{user.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
                
                <div className="flex space-x-1">
                  {user.badges?.map((badgeId, i) => {
                    const badge = BADGES[badgeId];
                    return badge ? (
                      <span 
                        key={i} 
                        className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                        title={`${badge.name}: ${badge.description}`}
                      >
                        {badge.icon}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Guide */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="text-primary-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Badges & Rewards</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(BADGES).map(([badgeId, badge]) => (
            <div key={badgeId} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
              <span className="text-4xl block mb-2">{badge.icon}</span>
              <p className="font-semibold text-gray-800">{badge.name}</p>
              <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
              <p className="text-xs text-primary-600 mt-2 font-medium">
                {badge.threshold} reports needed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
