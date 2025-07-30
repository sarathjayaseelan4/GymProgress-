import React from 'react';
import { Calendar, BarChart3, Target, Settings } from 'lucide-react';

interface MainNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MainNav({ activeTab, onTabChange }: MainNavProps) {
  const tabs = [
    { id: 'workout', icon: Calendar, label: 'Workout' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
      <div className="flex">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 py-4 px-2 flex flex-col items-center transition-all duration-200 ${
              activeTab === id 
                ? 'text-blue-400 bg-blue-500/10' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 transition-transform ${
              activeTab === id ? 'scale-110' : 'hover:scale-105'
            }`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}