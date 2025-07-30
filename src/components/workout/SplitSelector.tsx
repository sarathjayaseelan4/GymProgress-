import React from 'react';
import { Calendar, Users, Target } from 'lucide-react';
import { WORKOUT_SPLITS } from '../../data/workoutSplits';

interface SplitSelectorProps {
  onSelectSplit: (days: number) => void;
}

export default function SplitSelector({ onSelectSplit }: SplitSelectorProps) {
  const getIcon = (days: number) => {
    if (days <= 2) return Calendar;
    if (days <= 4) return Users;
    return Target;
  };

  const getDescription = (days: number) => {
    if (days === 1) return "Perfect for beginners or busy schedules";
    if (days === 2) return "Balanced approach for steady progress";
    if (days === 3) return "Optimal for most fitness goals";
    if (days === 4) return "Advanced training with focused sessions";
    if (days === 5) return "Serious training for dedicated athletes";
    return "Elite level training commitment";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Choose Your Training Split</h2>
          <p className="text-gray-400 text-lg">How many days per week do you want to train?</p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(WORKOUT_SPLITS).map(([days, split]) => {
            const Icon = getIcon(parseInt(days));
            return (
              <button
                key={days}
                onClick={() => onSelectSplit(parseInt(days))}
                className="w-full bg-gray-900/50 hover:bg-gray-800/70 p-6 rounded-xl text-left transition-all duration-200 border border-gray-700/50 hover:border-blue-500/50 group backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <div className="font-bold text-xl">{days} Day{parseInt(days) > 1 ? 's' : ''}</div>
                    </div>
                    <div className="text-blue-300 font-medium mb-1">{split.name}</div>
                    <div className="text-sm text-gray-400">{getDescription(parseInt(days))}</div>
                  </div>
                  <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
          <p className="text-sm text-blue-200">
            💡 <strong>Tip:</strong> You can always change your split later in settings. Start with what feels manageable for your current schedule.
          </p>
        </div>
      </div>
    </div>
  );
}