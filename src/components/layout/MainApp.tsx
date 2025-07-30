import React, { useState } from 'react';
import MainNav from './MainNav';
import WorkoutTab from '../workout/WorkoutTab';
import ProgressTab from '../progress/ProgressTab';
import GoalsTab from '../goals/GoalsTab';
import SettingsTab from '../settings/SettingsTab';
import { User } from '../../types';

interface MainAppProps {
  user: User;
  selectedSplit: number;
  workoutData: any;
  setWorkoutData: (data: any) => void;
  onLogout: () => void;
  onChangeSplit: () => void;
}

export default function MainApp({
  user,
  selectedSplit,
  workoutData,
  setWorkoutData,
  onLogout,
  onChangeSplit
}: MainAppProps) {
  const [activeTab, setActiveTab] = useState('workout');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'workout':
        return (
          <WorkoutTab
            selectedSplit={selectedSplit}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
          />
        );
      case 'progress':
        return <ProgressTab workoutData={workoutData} />;
      case 'goals':
        return <GoalsTab />;
      case 'settings':
        return (
          <SettingsTab
            user={user}
            onLogout={onLogout}
            onChangeSplit={onChangeSplit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 overflow-auto">
        {renderActiveTab()}
      </div>
      <MainNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}