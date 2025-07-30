import React, { useState } from 'react';
import WorkoutDay from './WorkoutDay';
import { WORKOUT_SPLITS } from '../../data/workoutSplits';

interface WorkoutTabProps {
  selectedSplit: number;
  workoutData: any;
  setWorkoutData: (data: any) => void;
}

export default function WorkoutTab({ selectedSplit, workoutData, setWorkoutData }: WorkoutTabProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const currentSplit = WORKOUT_SPLITS[selectedSplit];

  const handleSaveWorkout = (data: any) => {
    setWorkoutData((prev: any) => ({
      ...prev,
      [currentDay]: { ...data, date: new Date().toISOString() }
    }));
    
    // Show success message
    const event = new CustomEvent('workout-saved');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <h2 className="text-2xl font-bold mb-4">Today's Workout</h2>
        <div className="grid grid-cols-2 gap-3">
          {currentSplit.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                currentDay === index 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-700'
              }`}
            >
              <div className="font-semibold text-lg">{day.name}</div>
              <div className="text-sm opacity-75">{day.focus}</div>
              <div className="text-xs mt-1 opacity-60">
                {day.muscles.slice(0, 2).join(', ')}
                {day.muscles.length > 2 && ` +${day.muscles.length - 2} more`}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <WorkoutDay
        day={currentSplit.days[currentDay]}
        workoutData={workoutData}
        onSaveWorkout={handleSaveWorkout}
      />
    </div>
  );
}