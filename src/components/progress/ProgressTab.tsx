import React from 'react';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';

interface ProgressTabProps {
  workoutData: any;
}

export default function ProgressTab({ workoutData }: ProgressTabProps) {
  const mockProgress = [
    { exercise: "Bench Press", lastWeek: "185 × 5", thisWeek: "190 × 5", change: "+5", trend: "up" },
    { exercise: "Squat", lastWeek: "225 × 5", thisWeek: "230 × 5", change: "+5", trend: "up" },
    { exercise: "Deadlift", lastWeek: "275 × 3", thisWeek: "280 × 3", change: "+5", trend: "up" },
    { exercise: "Overhead Press", lastWeek: "115 × 8", thisWeek: "115 × 10", change: "+2 reps", trend: "up" }
  ];

  const mockStats = {
    totalWorkouts: 24,
    weekStreak: 6,
    totalVolume: "45,230 lbs",
    avgRPE: 7.8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Weekly Progress</h2>
          <p className="text-gray-400">Track your strength journey</p>
        </div>

        {/* Achievement Banner */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Award className="w-8 h-8 text-yellow-400" />
            <h3 className="font-bold text-xl text-green-400">🎉 New Personal Records!</h3>
          </div>
          <div className="space-y-2">
            <p className="text-green-200">• New 1RM on Squat: 300 lbs!</p>
            <p className="text-green-200">• Volume PR this week: 12,450 lbs</p>
            <p className="text-green-200">• 6-week consistency streak!</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Workouts</span>
            </div>
            <div className="text-2xl font-bold">{mockStats.totalWorkouts}</div>
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Week Streak</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{mockStats.weekStreak}</div>
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Total Volume</span>
            </div>
            <div className="text-lg font-bold">{mockStats.totalVolume}</div>
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-400">Avg RPE</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{mockStats.avgRPE}</div>
          </div>
        </div>

        {/* Progress Comparison */}
        <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-700/50">
          <h3 className="font-bold text-xl mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
            Progress Comparison
          </h3>
          <div className="space-y-4">
            {mockProgress.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700/50 last:border-b-0">
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.exercise}</div>
                  <div className="text-sm text-gray-400">{item.lastWeek} → {item.thisWeek}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">{item.change}</div>
                  <div className="text-xs text-green-300">↗ Improving</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-700/50">
          <h3 className="font-bold text-xl mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-purple-400" />
            Goals Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Bench Press Goal</span>
                <span className="text-blue-400 font-semibold">190/250 lbs (76%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '76%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Squat Goal</span>
                <span className="text-green-400 font-semibold">280/300 lbs (93%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: '93%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}