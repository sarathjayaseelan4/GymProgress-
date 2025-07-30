import React, { useState, useEffect } from 'react';
import LoginScreen from './auth/LoginScreen';
import SplitSelector from './workout/SplitSelector';
import MainApp from './layout/MainApp';
import { User, WorkoutSplit } from '../types';
import { WORKOUT_SPLITS } from '../data/workoutSplits';

export default function GymProgressApp() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSplit, setSelectedSplit] = useState<number | null>(null);
  const [workoutData, setWorkoutData] = useState({});

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gymProgress_user');
    const savedSplit = localStorage.getItem('gymProgress_split');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedSplit) {
      setSelectedSplit(parseInt(savedSplit));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('gymProgress_user', JSON.stringify(userData));
  };

  const handleSelectSplit = (days: number) => {
    setSelectedSplit(days);
    localStorage.setItem('gymProgress_split', days.toString());
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedSplit(null);
    localStorage.removeItem('gymProgress_user');
    localStorage.removeItem('gymProgress_split');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!selectedSplit) {
    return <SplitSelector onSelectSplit={handleSelectSplit} />;
  }

  return (
    <MainApp
      user={user}
      selectedSplit={selectedSplit}
      workoutData={workoutData}
      setWorkoutData={setWorkoutData}
      onLogout={handleLogout}
      onChangeSplit={() => setSelectedSplit(null)}
    />
  );
}