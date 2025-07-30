import React, { useState } from 'react';
import { Target, Plus, Trophy, Calendar, TrendingUp } from 'lucide-react';

export default function GoalsTab() {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ exercise: '', target: '', deadline: '' });

  const mockGoals = [
    {
      id: 1,
      exercise: "Bench Press",
      current: 190,
      target: 250,
      unit: "lbs",
      deadline: "2024-06-01",
      progress: 76,
      type: "1RM"
    },
    {
      id: 2,
      exercise: "Squat",
      current: 280,
      target: 300,
      unit: "lbs",
      deadline: "2024-04-15",
      progress: 93,
      type: "1RM"
    },
    {
      id: 3,
      exercise: "Weekly Volume",
      current: 12450,
      target: 15000,
      unit: "lbs",
      deadline: "2024-03-31",
      progress: 83,
      type: "Volume"
    }
  ];

  const achievements = [
    { title: "First 200lb Bench", date: "2024-01-15", icon: "🏆" },
    { title: "6-Week Streak", date: "2024-02-01", icon: "🔥" },
    { title: "Volume Milestone", date: "2024-02-10", icon: "💪" }
  ];

  const handleAddGoal = () => {
    if (newGoal.exercise && newGoal.target && newGoal.deadline) {
      // In real app, save to database
      console.log('Adding goal:', newGoal);
      setNewGoal({ exercise: '', target: '', deadline: '' });
      setShowAddGoal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Goals & Achievements</h2>
          <p className="text-gray-400">Set targets and celebrate milestones</p>
        </div>

        {/* Add Goal Button */}
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Goal</span>
        </button>

        {/* Add Goal Form */}
        {showAddGoal && (
          <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-700/50 space-y-4">
            <h3 className="font-semibold text-lg">Create New Goal</h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Exercise</label>
              <select
                value={newGoal.exercise}
                onChange={(e) => setNewGoal(prev => ({ ...prev, exercise: e.target.value }))}
                className="w-full bg-gray-800 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select exercise</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Deadlift">Deadlift</option>
                <option value="Overhead Press">Overhead Press</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Weight (lbs)</label>
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                className="w-full bg-gray-800 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="250"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Date</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full bg-gray-800 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleAddGoal}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-medium transition-colors"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Goals */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-400" />
            Active Goals
          </h3>
          
          {mockGoals.map((goal) => (
            <div key={goal.id} className="bg-gray-900/70 rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{goal.exercise}</h4>
                  <p className="text-sm text-gray-400">{goal.type} Goal</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{goal.progress}%</div>
                  <div className="text-xs text-gray-400">Complete</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Current: {goal.current} {goal.unit}</span>
                  <span>Target: {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            Recent Achievements
          </h3>
          
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 border border-yellow-700/30">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <div className="font-semibold">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{new Date(achievement.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}